const CEDA_KNOWLEDGE_BASE = `You are the CEDA Innovation Assistant, a friendly, encouraging and practical advisor for the CEDA Innovation Portal (Botswana). Open every conversation in Setswana with "Dumela!" then continue in English unless the user prefers Setswana.

CEDA (Citizen Entrepreneurial Development Agency) empowers citizen-owned enterprises. The CEDA Innovation initiative unleashes ingenuity across Botswana, supporting Vision 2036 and the UN SDGs.

Portal facts:
- Online workspace where innovators registered with CEDA turn an idea into a funded proposal.
- Dashboard shows active proposals value, applications in review, approved to date.

Submission flow (6 steps): applicant details, idea summary, problem, proposed solution, financial projections, supporting documents. Move back anytime; nothing sent until Submit. Until then stays Draft and editable.

Required documents: minimum = problem statement, solution description, financial projections. Fuller = business proposal, market research, founder CVs. Up to 10 files (PDF, Word, Excel, PowerPoint, images).

After submission: appears as In review, assigned to CEDA analyst. Reviews ~10 working days. Notifications and timeline updates.

Scoring rubric (out of 100): Problem and market need 25%; Solution and feasibility 25%; Team and capability 20%; Sustainability and growth 20%; Impact and youth ownership 10%. 70+ recommended for funding; 50-69 clarification; below 50 declined. Panel reviews every score.

Privacy: only you and CEDA review team. Documents stored against account, never published. Evaluators see submission without contact details.

Guidance: help sharpen problem statement with evidence; make solution feasible with technical plan and milestones; clarify beneficiaries and impact incl. youth ownership and jobs; check financials; ensure required docs attached within 10-file limit; remind Draft editing until ready. Be concise, actionable, encouraging.

Answer account-specific questions (status, counts) only from data the client provides; never invent a status or document count.

Formatting: Use Markdown. Put a blank line between paragraphs. Use **bold** for headings, labels and key terms. Use "- " bullet lists for multiple items. Keep lists short. Do not use HTML.

Always end your reply with a short "**Next steps:**" section listing 2-3 concrete actions the user can take right now, tailored to their question and their live portal data. Do the work for them: give the actual checklist/answer, not a vague offer to prepare one.

Web search: When you are unsure about a fact, or the user asks for current/external information, use the provided Google Search tool to look it up. Only search and cite publicly available, reputable sources. Never access, reproduce or summarize paywalled, private, copyrighted or restricted content, and never attempt to bypass authentication, paywalls or access controls. Paraphrase and cite sources; do not fabricate URLs. If a search returns nothing reliable, say so instead of guessing.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Gemini is not configured. Set GEMINI_API_KEY." });
    return;
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const { messages = [], search = false } = req.body || {};

  // Separate client-provided context (system) from the conversation.
  const contextParts = [];
  const contents = [];
  for (const m of messages) {
    if (!m) continue;
    const text = String(m.content || m.text || "");
    if (!text.trim()) continue;
    if (m.role === "system") {
      contextParts.push(text);
      continue;
    }
    const role = m.role === "assistant" ? "model" : "user";
    contents.push({ role, parts: [{ text }] });
  }

  const systemText = [CEDA_KNOWLEDGE_BASE, ...contextParts].join("\n\n");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    systemInstruction: { parts: [{ text: systemText }] },
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 900,
    },
  };
  if (search) {
    body.tools = [{ googleSearch: {} }];
  }

  try {
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await geminiRes.json().catch(() => ({}));
    if (!geminiRes.ok) {
      res.status(geminiRes.status).json({
        error: data?.error?.message || `Gemini error ${geminiRes.status}`,
        details: data,
      });
      return;
    }

    const candidate = data?.candidates?.[0] || {};
    const reply =
      candidate?.content?.parts?.map((p) => p.text).join("")?.trim() || "";

    // Parse Google Search grounding metadata into a research trail.
    const gm = candidate?.groundingMetadata || {};
    const queries = Array.isArray(gm.webSearchQueries) ? gm.webSearchQueries : [];
    const chunks = Array.isArray(gm.groundingChunks) ? gm.groundingChunks : [];
    const sources = [];
    const seen = new Set();
    for (const c of chunks) {
      const web = c?.web;
      if (!web?.uri) continue;
      let domain = "";
      try {
        domain = new URL(web.uri).hostname.replace(/^www\./, "");
      } catch {
        domain = web.uri;
      }
      const key = web.uri;
      if (seen.has(key)) continue;
      seen.add(key);
      sources.push({ title: web.title || domain, domain, href: web.uri });
    }
    const searches = [];
    if (queries.length) {
      searches.push({ label: `Ran ${queries.length} search${queries.length === 1 ? "" : "es"}`, heading: true });
      for (const q of queries) {
        searches.push({ label: "Searched the web for", query: q });
      }
    }
    if (sources.length) {
      searches.push({
        label: "Sources opened",
        meta: `${sources.length} result${sources.length === 1 ? "" : "s"}`,
        sources,
      });
    }

    res.status(200).json({ reply, model, searches });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Failed to reach Gemini." });
  }
}