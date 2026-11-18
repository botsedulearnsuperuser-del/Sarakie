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
