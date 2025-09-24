export default async function handler(_req: any, res: any) {
  const missing: string[] = [];
  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.INVESTOR_CODE_SECRET) missing.push("INVESTOR_CODE_SECRET");
  const ok = missing.length === 0;
  res.status(ok ? 200 : 500).json({
    ok,
    missing,
    envSeen: {
      INVESTOR_CODE_TTL_MIN: process.env.INVESTOR_CODE_TTL_MIN || "(default 15)",
      INVESTOR_NOTIF_TO: process.env.INVESTOR_NOTIF_TO || "(default investor@vitalos.co.uk)",
      INVESTOR_NOTIF_FROM: process.env.INVESTOR_NOTIF_FROM || "(default noreply)",
    },
  });
}
