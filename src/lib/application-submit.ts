import { supabase } from "./supabase";

/**
 * Creates the application in Supabase, uploads its documents and stores the
 * team assigned on the submission step.
 *
 * The row is inserted as a draft first because the storage upload policy only
 * allows the owner to write while the application is editable. Once the files
 * and collaborators are in place the row is flipped to `submitted`.
 */

export interface SubmissionCollaborator {
  name: string;
  email: string;
}

export interface SubmitApplicationInput {
  title: string;
  sector: string;
  innovationType: string;
  maturityLevel: string;
  fundingRequested: number;
  expectedImpact: string;
  targetMarket: string;
  competitiveAdvantage: string;
  projectedReach: string;
  timelineToMarket: string;
  regulatoryRequirements: string;
  ipProtection: string;
  documents: File[];
  collaborators: SubmissionCollaborator[];
}

export interface SubmitApplicationResult {
  ok: boolean;
  id?: string;
  reference?: string;
  error?: string;
}

const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function safeFileName(name: string): string {
  const cleaned = name.trim().replace(/[^A-Za-z0-9._-]+/g, "-");
  return cleaned.replace(/^-+|-+$/g, "") || "document";
}

function contentTypeFor(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXTENSION[ext] ?? "application/octet-stream";
}

function nullable(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readableError(message: string): string {
  if (/row-level security/i.test(message)) {
    return "You do not have permission to submit this application. Please sign in again.";
  }
  return message;
}

export async function submitApplication(
  input: SubmitApplicationInput,
): Promise<SubmitApplicationResult> {
  if (!supabase) {
    return {
      ok: false,
      error:
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.",
    };
  }

  const client = supabase;

  const { data: userData, error: userError } = await client.auth.getUser();
  const userId = userData.user?.id;
  if (userError || !userId) {
    return { ok: false, error: "Your session has expired. Please sign in again and resubmit." };
  }

  const title = input.title.trim();
  if (!title) {
    return { ok: false, error: "Add an idea name on step 1 before submitting." };
  }

  const { data: application, error: insertError } = await client
    .from("applications")
    .insert({
      innovator_id: userId,
      title,
      sector: nullable(input.sector),
      innovation_type: nullable(input.innovationType),
      maturity_level: nullable(input.maturityLevel),
      funding_requested: input.fundingRequested > 0 ? input.fundingRequested : null,
      expected_impact: nullable(input.expectedImpact),
      target_market: nullable(input.targetMarket),
      competitive_advantage: nullable(input.competitiveAdvantage),
      projected_reach: nullable(input.projectedReach),
      timeline_to_market: nullable(input.timelineToMarket),
      regulatory_requirements: nullable(input.regulatoryRequirements),
      ip_protection: nullable(input.ipProtection),
      status: "draft",
    })
    .select("id, reference")
    .single();

  if (insertError || !application) {
    return {
      ok: false,
      error: `Could not create the application: ${readableError(insertError?.message ?? "unknown error")}`,
    };
  }

  const uploadedPaths: string[] = [];

  /* Undo a half-created submission so the applicant can retry cleanly. */
  const cleanUp = async () => {
    if (uploadedPaths.length > 0) {
      await client.storage.from("application-documents").remove(uploadedPaths);
    }
    await client.from("applications").delete().eq("id", application.id);
  };

  for (const file of input.documents) {
    const path = `${application.id}/${Date.now()}-${safeFileName(file.name)}`;
    const { error: uploadError } = await client.storage
      .from("application-documents")
      .upload(path, file, { contentType: contentTypeFor(file) });

    if (uploadError) {
      await cleanUp();
      return { ok: false, error: `Could not upload ${file.name}: ${uploadError.message}` };
    }
    uploadedPaths.push(path);

    const { error: documentError } = await client.from("application_documents").insert({
      application_id: application.id,
      uploaded_by: userId,
      file_name: file.name,
      storage_path: path,
      mime_type: contentTypeFor(file),
      size_bytes: file.size,
    });

    if (documentError) {
      await cleanUp();
      return {
        ok: false,
        error: `Could not save ${file.name}: ${readableError(documentError.message)}`,
      };
    }
  }

  const collaborators = input.collaborators
    .map((member) => ({
      application_id: application.id,
      email: member.email.trim().toLowerCase(),
      full_name: nullable(member.name),
      invited_by: userId,
    }))
    .filter((member) => member.email.length > 0);

  if (collaborators.length > 0) {
    const { error: collaboratorError } = await client
      .from("application_collaborators")
      .upsert(collaborators, { onConflict: "application_id,email", ignoreDuplicates: true });

    if (collaboratorError) {
      await cleanUp();
      return {
        ok: false,
        error: `Could not save the team: ${readableError(collaboratorError.message)}`,
      };
    }
  }

  const { error: submitError } = await client
    .from("applications")
    .update({ status: "submitted", submitted_at: new Date().toISOString() })
    .eq("id", application.id);

  if (submitError) {
    await cleanUp();
    return { ok: false, error: `Could not submit the application: ${readableError(submitError.message)}` };
  }

  return { ok: true, id: application.id, reference: application.reference };
}
