// /api/investor-access.ts
import { Resend } from "resend";
import { createHmac } from "node:crypto"; // safer than default import

const CODE_TTL_MIN = parseInt(process.env.INVESTOR_CODE_TTL_MIN || "15", 10);
const TO_ADMIN = process.env.INVESTOR_NOTIF_TO || "investor@vitalos.co.uk";
const FROM_EMAIL = process.env.INVESTOR_NOTIF_FROM || "Vitalos <noreply@vitalos.co.uk>";
const DEV_ECHO = process.env.INVESTOR_DEV_ECHO_CODE === "1";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Validate env *before* constructing the client
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CODE_SECRET = process.env.INVESTOR_CODE_SECRET;
    if (!RESEND_API_KEY) return res.status(500).json({ error: "Server misconfigured: RESEND_API_KEY missing" });
    if (!CODE_SECRET)     return res.status(500).json({ error: "Server misconfigured: INVESTOR_CODE_SECRET missing" });

    // Lazy init avoids import-time crashes
    const resend = new Resend(RESEND_API_KEY);

    const { fullName, email, org, role, agreeNda, consent, website } =
      (req.body || {}) as Record<string, any>;

    // Basic validation
    if (website) return res.status(400).json({ error: "Bad request" }); // honeypot
    if (!fullName || !email || !org || !role) return res.status(400).json({ error: "Missing required fields" });
    if (!/.+@.+\..+/.test(email)) return res.status(400).json({ error: "Invalid email" });
    if (!agreeNda) return res.status(401).json({ error: "You must accept the confidentiality statement" });

    // Generate 6-digit code derived from email + time bucket
    const bucket = timeBucket(Date.now(), CODE_TTL_MIN);
    const code = generateCode(email, bucket, CODE_SECRET);

    // Email the code to the requester
    await resend.emails.send({
      to: email,
      from: FROM_EMAIL,
      subject: "Your Vitalos investor access code",
      text: `Hi ${fullName},

Use this code to view the Vitalos Investors page:

    ${code}

This code is valid for ${CODE_TTL_MIN} minutes.

If you didn’t request this, you can ignore this email.

— Vitalos Team`,
      html: `
        <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>Use this code to view the <strong>Vitalos Investors</strong> page:</p>
          <p style="font-size:24px;letter-spacing:4px;margin:16px 0"><strong>${code}</strong></p>
          <p>This code is valid for <strong>${CODE_TTL_MIN} minutes</strong>.</p>
          <p>If you didn’t request this, you can ignore this email.</p>
          <p>— Vitalos Team</p>
        </div>`,
    });

    // Admin notification
    const ip = (req.headers["x-forwarded-for"] as string) || (req.socket && req.socket.remoteAddress) || "";
    const ua = (req.headers["user-agent"] as string) || "";
    const lines = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Organisation: ${org}`,
      `Role: ${role}`,
      `Consented to contact: ${!!consent}`,
      `IP: ${ip}`,
      `UA: ${ua}`,
      `Time: ${new Date().toISOString()}`,
    ];
    await resend.emails.send({
      to: TO_ADMIN,
      from: FROM_EMAIL,
      subject: `Investor access request — ${fullName} (${org})`,
      text: lines.join("\n"),
      html:
        "<h3>New investor access request</h3><ul>" +
        lines.map((l) => `<li>${l.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</li>`).join("") +
        "</ul>",
    });

    // For local debugging, optionally return the code in JSON
    if (DEV_ECHO) return res.status(200).json({ ok: true, code });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("/api/investor-access error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function timeBucket(ts: number, minutes: number) {
  return Math.floor(ts / (minutes * 60 * 1000));
}
function generateCode(email: string, bucket: number, secret: string) {
  const h = createHmac("sha256", secret).update(`${email}:${bucket}`).digest();
  const codeInt = (h.readUInt32BE(0) & 0x7fffffff) % 1000000; // 0..999999
  return codeInt.toString().padStart(6, "0");
}
function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
