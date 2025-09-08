import React, { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    // basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    try {
      // QUICK WIN: store locally for now
      const key = "vitalos_newsletter_emails";
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push({ email: email.trim(), ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(list));

      // TODO: replace with your API/Zoho/Resend endpoint:
      // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });

      setOk(true);
      setEmail("");
    } catch (e) {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (ok) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <h3 className="text-xl font-bold">You’re in 🎉</h3>
        <p className="text-white/80">We’ll keep you posted on new features and posts.</p>
        <button
          onClick={() => setOk(false)}
          className="mt-4 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-bold mb-2">Get updates from Vitalos</h3>
      <p className="text-white/70 mb-4">Product news, research notes, no spam.</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-2 outline-none focus:border-[#50E3C2]"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2 rounded-xl bg-[#50E3C2] text-black font-semibold disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Subscribe"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
      <p className="mt-3 text-xs text-white/50">
        By subscribing, you agree to receive occasional emails from Vitalos.
      </p>
    </form>
  );
};

export default Newsletter;
