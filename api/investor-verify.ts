// /api/investor-verify.ts
import { createHmac } from "node:crypto";

const CODE_TTL_MIN = parseInt(process.env.INVESTOR_CODE_TTL_MIN || "15", 10);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const CODE_SECRET = process.env.INVESTOR_CODE_SECRET;
    if (!CODE_SECRET) {
      return res.status(500).json({ error: "Server misconfigured: INVESTOR_CODE_SECRET missing" });
    }

    const { email, code } = (req.body || {}) as { email?: string; code?: string };
    if (!email || !/.+@.+\..+/.test(email) || !code) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const now = Date.now();
    const buckets = [
      timeBucket(now, CODE_TTL_MIN),
      timeBucket(now - CODE_TTL_MIN * 60 * 1000, CODE_TTL_MIN), // grace window
    ];
    const ok = buckets.some((b) => generateCode(email, b, CODE_SECRET) === String(code).trim());
    if (!ok) return res.status(401).json({ error: "Invalid or expired code" });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("/api/investor-verify error", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function timeBucket(ts: number, minutes: number) {
  return Math.floor(ts / (minutes * 60 * 1000));
}
function generateCode(email: string, bucket: number, secret: string) {
  const h = createHmac("sha256", secret).update(`${email}:${bucket}`).digest();
  const codeInt = (h.readUInt32BE(0) & 0x7fffffff) % 1000000;
  return codeInt.toString().padStart(6, "0");
}
