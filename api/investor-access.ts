import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Server-side config (set in your Vercel env):
// - INVESTORS_REQUIRE_CODE=true|false (default true)
// - INVESTORS_ACCESS_CODE=your-secret-code (required if REQUIRE_CODE is true)
// - RESEND_API_KEY=... (https://resend.com)
// - INVESTOR_NOTIF_TO=investor@vitalos.co.uk (default)
// - INVESTOR_NOTIF_FROM="Vitalos <noreply@vitalos.co.uk>" (default)
// - INVESTOR_AUTOREPLY_SUBJECT="Thanks for your request — Vitalos Investors" (optional)

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const REQUIRE_CODE = (process.env.INVESTORS_REQUIRE_CODE ?? "true").toLowerCase() !== "false";
    const expectedCode = process.env.INVESTORS_ACCESS_CODE || "";

    if (REQUIRE_CODE && !expectedCode) {
      return res.status(500).json({ error: "Server misconfigured: INVESTORS_ACCESS_CODE missing" });
    }

    const { fullName, email, org, role, code, agreeNda, consent, website } = (req.body || {}) as Record<string, any>;

    // Simple validations
    if (website) {
      // Honeypot filled → likely bot
      return res.status(400).json({ error: "Bad request" });
    }
    if (!fullName || !email || !org || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/.+@.+\..+/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!agreeNda) {
      return res.status(401).json({ error: "You must accept the confidentiality statement" });
    }
    if (REQUIRE_CODE && code !== expectedCode) {
      return res.status(401).json({ error: "Invalid access code" });
    }

    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";
    const ua = req.headers["user-agent"] || "";

    const to = process.env.INVESTOR_NOTIF_TO || "investor@vitalos.co.uk";
    const from = process.env.INVESTOR_NOTIF_FROM || "Vitalos <noreply@vitalos.co.uk>";

    // Compose admin notification
    const subject = `Investor access request — ${fullName} (${org})`;
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
const text = lines.join("\n");
    const html = `<h3>New investor access request</h3><ul>${lines
      .map((l) => `<li>${l.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</li>`)
      .join("")}</ul>`;

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Server misconfigured: RESEND_API_KEY missing" });
    }

    // Send admin notification
    await resend.emails.send({ to, from, subject, text, html });

    // Send thank-you / auto-reply to requester
    const arSubject = process.env.INVESTOR_AUTOREPLY_SUBJECT || "Thanks for your request — Vitalos Investors";
    const arText = `Hi ${fullName},

Thanks for your interest in Vitalos. We've received your investor access request.

If you submitted this from your browser, you should now be able to view the Investors page on that device. Otherwise, we'll be in touch shortly.

Next steps:
• Open vitalos.co.uk and click “Investors”.
• Reply to this email if you have any questions.

— Vitalos Team`;
    const arHtml = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
        <p>Hi ${escapeHtml(fullName)},</p>
        <p>Thanks for your interest in <strong>Vitalos</strong>. We've received your investor access request.</p>
        <p>If you submitted this from your browser, you should now be able to view the <strong>Investors</strong> page on that device. Otherwise, we'll be in touch shortly.</p>
        <p><strong>Next steps</strong>:</p>
        <ul>
          <li>Open <a href="https://vitalos.co.uk" target="_blank">vitalos.co.uk</a> and click <em>Investors</em>.</li>
          <li>Reply to this email if you have any questions.</li>
        </ul>
        <p>— Vitalos Team</p>
      </div>`;

    await resend.emails.send({ to: email, from, subject: arSubject, text: arText, html: arHtml });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("/api/investor-access error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
