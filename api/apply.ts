export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      roleTitle,
      fullName,
      email,
      location = "",
      linkedin = "",
      note = "",
      cvFileName = "",
      cvMimeType = "",
      cvFileSize = 0,
      cvBase64 = "",
      website = "",
    } = (req.body || {}) as Record<string, any>;

    if (website) return res.status(200).json({ ok: true });
    if (!roleTitle || !fullName || !email || !cvFileName || !cvBase64) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/.+@.+\..+/.test(String(email))) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (Number(cvFileSize) > 2 * 1024 * 1024) {
      return res.status(400).json({ error: "CV must be 2MB or smaller" });
    }

    const webhookUrl =
      process.env.GOOGLE_SHEETS_APPLICATION_WEBHOOK_URL ||
      process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({
        error: "Server misconfigured: GOOGLE_SHEETS_APPLICATION_WEBHOOK_URL missing",
      });
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      roleTitle: String(roleTitle).trim(),
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      location: String(location).trim(),
      linkedin: String(linkedin).trim(),
      note: String(note).trim(),
      cvFileName: String(cvFileName).trim(),
      cvMimeType: String(cvMimeType).trim(),
      cvFileSize: Number(cvFileSize) || 0,
      cvBase64: String(cvBase64),
      source: "vitalos-careers-form",
    };

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      const text = await webhookRes.text().catch(() => "");
      console.error("/api/apply webhook error", webhookRes.status, text);
      return res.status(502).json({ error: "Could not save application" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("/api/apply error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
