import React, { useEffect, useState, useCallback } from "react";
import SectionHero from "../components/SectionHero";
import { AnimatePresence, motion, type Variants, type MotionProps } from "framer-motion";

/**
 * INVESTORS PAGE — EMAIL CODE GATE + SLIDES
 * -----------------------------------------
 * Flow:
 * 1) Form → /api/investor-access emails a 6-digit code
 * 2) Verify → /api/investor-verify checks it
 * 3) On success, store local access (30 days) and show slides
 */

const ACCESS_STORAGE_KEY = "vitalos-investors-access";
const ACCESS_TTL_DAYS = 30;

// ---------- Animations (typed) ----------
const slideFade = (dir: number): MotionProps => ({
  initial: { opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.98, transition: { duration: 0.35, ease: "easeIn" } },
});

const gridStagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ---------- Helpers ----------
function saveAccess() {
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify({ grantedAt: Date.now() }));
}
function hasValidAccess(): boolean {
  try {
    const raw = localStorage.getItem(ACCESS_STORAGE_KEY);
    if (!raw) return false;
    const { grantedAt } = JSON.parse(raw);
    const ageDays = (Date.now() - Number(grantedAt)) / (1000 * 60 * 60 * 24);
    return ageDays <= ACCESS_TTL_DAYS;
  } catch {
    return false;
  }
}
function clearAccess() {
  localStorage.removeItem(ACCESS_STORAGE_KEY);
}

// ---------- UI atoms ----------
const BigTile: React.FC<{ eyebrow: string; title: string; sub?: string }> = ({ eyebrow, title, sub }) => (
  <div className="w-full bg-gray-900 rounded-3xl ring-1 ring-white/10 p-8 md:p-12 text-center">
    <div className="text-[#50E3C2] uppercase tracking-wider text-sm md:text-base mb-3">{eyebrow}</div>
    <div className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{title}</div>
    {sub && <div className="text-gray-400 text-base md:text-lg mt-4">{sub}</div>}
  </div>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#0b0b0b] rounded-2xl p-6 md:p-8 ring-1 ring-white/10">
    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{title}</h3>
    <div className="text-gray-300 leading-relaxed text-base md:text-lg">{children}</div>
  </div>
);

// ---------- Gate ----------
function InvestorsGate({ onGranted }: { onGranted: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    org: "",
    role: "",
    agreeNda: false,
    consent: true,
    website: "", // honeypot
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  function onChange<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailOk = /.+@.+\..+/.test(form.email);
    if (!form.fullName || !emailOk || !form.org || !form.role) return setError("Please complete all required fields.");
    if (!form.agreeNda) return setError("You must accept the confidentiality statement.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/investor-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data?.error || "Could not send verification code.");
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onVerify() {
    setError(null);
    const c = code.trim();
    if (!c || c.length < 6) return setError("Enter the 6-digit code sent to your email.");
    setVerifying(true);
    try {
      const res = await fetch("/api/investor-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code: c }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data?.error || "Invalid or expired code.");
      setVerified(true);
      saveAccess();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function onResend() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/investor-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, agreeNda: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data?.error || "Could not resend code.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSkip = hasValidAccess();

  if (submitted) {
    return (
      <main className="pt-20 container mx-auto px-6 py-12">
        <SectionHero
          title="Thank you — check your email"
          subtitle="We’ve sent a 6-digit code to verify. Enter it below and continue."
          heightClass="h-44 md:h-56"
          greenOpacity={0.25}
        />
        <div className="max-w-2xl mx-auto mt-8 bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-white/10">
          <label className="block text-sm text-gray-400 mb-1">Verification code</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white tracking-[0.4em] text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
            placeholder="••••••"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {!verified ? (
              <>
                <button onClick={onVerify} className="px-5 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90 disabled:opacity-50" disabled={verifying}>
                  {verifying ? "Verifying…" : "Verify code"}
                </button>
                <button onClick={onResend} className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 disabled:opacity-50" disabled={submitting}>
                  Resend code
                </button>
                {canSkip && (
                  <button onClick={onGranted} className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5">
                    Continue (already granted)
                  </button>
                )}
              </>
            ) : (
              <button onClick={onGranted} className="px-6 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90">
                View Investors Page
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Request investor access"
        subtitle="Complete the short form; we’ll email you a 6-digit code to verify."
        heightClass="h-44 md:h-56"
        greenOpacity={0.25}
      />
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto mt-8 bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full name *</label>
            <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]" value={form.fullName} onChange={(e) => onChange("fullName", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Work email *</label>
            <input type="email" className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Organisation *</label>
            <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]" value={form.org} onChange={(e) => onChange("org", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role *</label>
            <input className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]" value={form.role} onChange={(e) => onChange("role", e.target.value)} />
          </div>
          {/* Honeypot */}
          <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" value={form.website} onChange={(e) => onChange("website", e.target.value)} />
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3 text-sm text-gray-300">
            <input type="checkbox" className="mt-1 h-4 w-4" checked={form.agreeNda} onChange={(e) => onChange("agreeNda", e.target.checked)} />
            <span> I acknowledge this page contains confidential information and agree not to share or redistribute without written consent.</span>
          </label>
          <label className="flex items-start gap-3 text-sm text-gray-400">
            <input type="checkbox" className="mt-1 h-4 w-4" checked={form.consent} onChange={(e) => onChange("consent", e.target.checked)} />
            <span> I’m happy for Vitalos to contact me about this request.</span>
          </label>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={submitting} className="px-5 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90 disabled:opacity-50">
            {submitting ? "Sending code…" : "Request Access"}
          </button>
          {hasValidAccess() && (
            <button type="button" onClick={onGranted} className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5">
              Continue (already granted)
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

// ---------- Slides ----------
const useArrowKeys = (onLeft: () => void, onRight: () => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onLeft();
      if (e.key === "ArrowRight") onRight();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onLeft, onRight]);
};

function SliderShell({
  slides,
  index,
  setIndex,
}: {
  slides: React.ReactNode[];
  index: number;
  setIndex: (i: number) => void;
}) {
  const next = useCallback(() => setIndex(Math.min(index + 1, slides.length - 1)), [index, slides.length, setIndex]);
  const prev = useCallback(() => setIndex(Math.max(index - 1, 0)), [index, setIndex]);

  useArrowKeys(prev, next);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400 text-sm">Slide {index + 1} / {slides.length}</div>
        <div className="flex gap-2">
          <button onClick={prev} className="px-4 py-2 rounded-lg border border-white/15 text-white hover:bg-white/5 disabled:opacity-40" disabled={index === 0}>
            ← Back
          </button>
          <button onClick={next} className="px-4 py-2 rounded-lg bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90 disabled:opacity-40" disabled={index === slides.length - 1}>
            Next →
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="popLayout">
          <motion.div key={index} {...slideFade(1)} className="min-h-[320px] md:min-h-[360px]">
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#50E3C2]" : "w-2 bg-white/20 hover:bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

function InvestorsSlides() {
  const [index, setIndex] = useState(0);

  // staggered entrance for the triple-tile slide
  const gridStagger: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } };

  const slides: React.ReactNode[] = [
    // Slide 1 — Focus + Model + Pipeline (single, big, even)
    <div className="px-1">
      <motion.div variants={gridStagger} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <BigTile eyebrow="Focus" title="Mental Health AI" sub="Predict • Triage • Copilot" />
        </motion.div>
        <motion.div variants={item}>
          <BigTile eyebrow="Model" title="B2B SaaS" sub="Per-seat &amp; per-population" />
        </motion.div>
        <motion.div variants={item}>
          <BigTile eyebrow="Pipeline" title="NHS &amp; partners" sub="Pilots + councils / HE / OH" />
        </motion.div>
      </motion.div>
    </div>,

    // Slide 2 — Problem + Mission
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Problem">
        Services are overwhelmed: long waits, risk spotted late, and high admin burden. Tools are either basic trackers or opaque models that don’t fit care pathways.
      </Card>
      <Card title="Mission">
        Make mental healthcare earlier, fairer, and scalable with clinical-grade AI that fits real-world pathways, is privacy-first, and interoperable by design.
      </Card>
    </div>,

    // Slide 3 — The Ask
    <div className="bg-gray-900 rounded-2xl p-6 md:p-8 ring-1 ring-white/10">
      <h3 className="text-2xl md:text-3xl font-bold text-white">The Ask</h3>
      <p className="text-gray-300 mt-3 text-lg">
        We are raising <span className="text-white font-semibold">£X.Xm</span> to fund 18–24 months of execution.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <BigTile eyebrow="Budget" title="40%" sub="Engineering — core product, safety, interop" />
        <BigTile eyebrow="Budget" title="25%" sub="Clinical &amp; Data — advisors, evaluations, governance" />
        <BigTile eyebrow="Budget" title="35%" sub="GTM — pilots, procurement, partners" />
      </div>
    </div>,

    // Slide 4 — Contact only
    <div className="max-w-3xl mx-auto">
      <Card title="Contact">
        <p>
          Email <a href="mailto:investors@vitalos.co.uk" className="text-[#50E3C2]">investors@vitalos.co.uk</a> or call 0203 432 3640.
        </p>
      </Card>
    </div>,
  ];

  return <SliderShell slides={slides} index={index} setIndex={setIndex} />;
}


// ---------- Content ----------
function InvestorsContent() {
  return (
    <main className="pt-20 container mx-auto px-6 pb-16">
      <SectionHero
        title="Invest in proactive mental healthcare"
        subtitle="Vitalos is building clinical-grade AI that makes care earlier, fairer, and scalable."
        heightClass="h-44 md:h-56"
        greenOpacity={0.25}
      />

      {/* Slides (big, even, animated) */}
      <InvestorsSlides />

      <p className="text-center text-xs text-gray-500 mt-10">© {new Date().getFullYear()} Vitalos Technologies</p>
    </main>
  );
}

// ---------- Page ----------
const InvestorsPage: React.FC = () => {
  const [granted, setGranted] = useState(false);
  useEffect(() => { setGranted(hasValidAccess()); }, []);
  if (!granted) return <InvestorsGate onGranted={() => setGranted(true)} />;
  return <InvestorsContent />;
};

export default InvestorsPage;
