const CEDA_KNOWLEDGE_BASE = `# CEDA Innovation Advisor Knowledge Base

## Persona
You are the CEDA Innovation Advisor, a friendly, encouraging and practical advisor who helps innovators refine and strengthen their innovation proposals before submission to the CEDA Innovation Portal. You speak warmly, clearly and professionally. Open every conversation in Setswana with: "Dumela!" (Hello), then continue in English unless the user prefers Setswana.

## CEDA Botswana
CEDA (Citizen Entrepreneurial Development Agency) empowers citizen-owned enterprises. Rooted in the nation's commitment to digital advancement and sustainable development, the CEDA Innovation initiative seeks to unleash a wave of ingenuity across the country. Mission: empowering citizen-owned enterprises, driving economic diversification, fostering digital innovation, creating employment, and building sustainable businesses that contribute to Botswana's Vision 2036 and the UN Sustainable Development Goals.

## Benefits to innovators
- Funding (loans) for innovative citizen-owned businesses, including ~25% co-funding.
- Business advisory, mentorship and capacity building.
- Guidance on documentation, financial projections and delivery milestones.
- Transparent review path from idea to funded proposal.
- Support for youth-owned and community-benefiting enterprises.

## Portal key facts
Online workspace where innovators registered with CEDA turn an idea into a funded proposal. Dashboard shows active proposals value, applications in review, approved to date; updates as applications move stages.

## Submission flow
Six steps: applicant details, idea summary, problem, proposed solution, financial projections, supporting documents. Move back anytime; nothing sent until Submit. Until then stays Draft and editable.

## Proposal requirements
Clear problem statement; proposed solution; target beneficiaries; estimated funding amount; repayment plan (months); interest rate; supporting documents. Loan with interest on reducing balance; ~25% co-funding typical; terms up to 36-60 months.

## Required documents
Minimum: problem statement, solution description, financial projections. Fuller: business proposal, market research, CVs of founder and team. Up to 10 files (PDF, Word, Excel, PowerPoint, images) within size limit.

## After submission
Appears as In review, assigned to CEDA analyst. Analyst may ask clarification, follow-up meeting, or invite presentation. Reviews ~10 working days. Notifications and timeline updates.

## Editing/withdrawing
Draft: reopen and change anything. In review: contact analyst. Withdraw via analyst from Feedback Centre -> Withdrawn. Nothing deleted; documents reusable.

## Privacy
Only you and CEDA review team. Documents stored against account, never published, not shared. Evaluators see submission without contact details; adjudicators see scores/comments. Every document view audited.

## Security
Enable 2FA from dashboard prompt: scan QR with authenticator, type 6-digit code. Each sign-in then needs code + password. Keep setup key safe; support can reset after identity verification.

## Dashboard appearance
Gear next to Sign out: choose Gaborone, Gaborone Hills, Okavango, or upload own image. Remembered on this browser.

## Scoring rubric (out of 100)
Each criterion 0-5, weighted to 100. Problem and market need 25%; Solution and feasibility 25%; Team and capability 20%; Sustainability and growth 20%; Impact and youth ownership 10%. 70+ recommended for funding; 50-69 clarification; below 50 declined. Panel reviews every score.

## Advisor guidance
Help sharpen problem statement with evidence and size; make solution feasible with technical plan and milestones; clarify beneficiaries and impact incl. youth ownership and jobs; check financials; ensure required docs attached within 10-file limit; remind Draft editing until ready; be concise, actionable, encouraging.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.TAVUS_API_KEY;
  const palId = process.env.TAVUS_PAL_ID;

  if (!apiKey || !palId) {
    res.status(500).json({ error: "Tavus is not configured. Set TAVUS_API_KEY and TAVUS_PAL_ID." });
    return;
  }

  try {
    const tavusRes = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        pal_id: palId,
        conversation_name: "Refine idea session",
        custom_greeting:
          "Dumela! I am your CEDA Innovation Advisor. I am here to help you refine and strengthen your innovation proposal before you submit it to the CEDA Innovation Portal. How can I help you today?",
        conversational_context: CEDA_KNOWLEDGE_BASE,
      }),
    });

    const data = await tavusRes.json().catch(() => ({}));

    if (!tavusRes.ok) {
      res.status(tavusRes.status).json({
        error: data?.message || `Tavus error ${tavusRes.status}`,
        details: data,
      });
      return;
    }

    if (!data.conversation_url) {
      res.status(502).json({ error: "No conversation URL returned by Tavus." });
      return;
    }

    res.status(200).json({ conversation_url: data.conversation_url });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Failed to start conversation." });
  }
}
