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

Answer account-specific questions (status, counts) only from data the client provides; never invent a status or document count.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OpenRouter is not configured. Set OPENROUTER_API_KEY." });
    return;
  }

  const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";

  const { messages = [] } = req.body || {};
  const chatMessages = [
    { role: "system", content: CEDA_KNOWLEDGE_BASE },
    ...messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant" || m.role === "system"))
      .map((m) => ({ role: m.role, content: String(m.content || m.text || "") })),
  ];

  try {
    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.APP_ORIGIN || "https://ceda-innovation-portal.vercel.app",
        "X-Title": "CEDA Innovation Portal",
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        temperature: 0.4,
        max_tokens: 600,
      }),
    });

    const data = await orRes.json().catch(() => ({}));
    if (!orRes.ok) {
      res.status(orRes.status).json({
        error: data?.error?.message || `OpenRouter error ${orRes.status}`,
        details: data,
      });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    res.status(200).json({ reply, model });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Failed to reach OpenRouter." });
  }
}