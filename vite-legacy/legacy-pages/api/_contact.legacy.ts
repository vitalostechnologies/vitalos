// src/pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const required = (name: string, v?: string) => {
  if (!v || !String(v).trim()) throw new Error(`${name} is required`);
  return String(v).trim();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, message, website } = req.body || {};
    // honeypot — bots will fill this
    if (website && String(website).trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const _name = required("name", name);
    const _email = required("email", email);
    const _message = required("message", message);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST,
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      secure: String(process.env.ZOHO_SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;padding:12px">
        <h2 style="margin:0 0 8px">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(_email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(_message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: _email,
      subject: `Contact · ${_name}`,
      text: `Name: ${_name}\nEmail: ${_email}\n\n${_message}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}

function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
