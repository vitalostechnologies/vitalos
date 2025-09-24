import React, { useEffect, useState } from "react";
import SectionHero from "../components/SectionHero";
import { motion } from "framer-motion";

/**
 * INVESTORS PAGE — GATED (PRODUCTION READY)
 * -------------------------------------------------
 * This page is protected by a soft gate: visitors must submit the
 * access form (and optionally an access code). The client DOES NOT
 * verify the code; verification happens server-side at /api/investor-access.
 * On success, a short-lived token is stored in localStorage.
 *
 * Required server env (see /api/investor-access.ts):
 *  - INVESTORS_REQUIRE_CODE=true|false (default true)
 *  - INVESTORS_ACCESS_CODE=... (required if REQUIRE_CODE is true)
 *  - RESEND_API_KEY=... (to send email)
 *  - INVESTOR_NOTIF_TO=investor@vitalos.co.uk (default)
 *  - INVESTOR_NOTIF_FROM="Vitalos <noreply@vitalos.co.uk>" (default)
 *  - INVESTOR_AUTOREPLY_SUBJECT (optional)
 */

const ACCESS_STORAGE_KEY = "vitalos-investors-access";
const ACCESS_TTL_DAYS = 30; // how long access lasts

// ---------- Animations ----------
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } } as const;
const slideUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: "easeOut" } } as const;

// ---------- Helpers ----------
function now(): number { return Date.now(); }
function days(ms: number) { return ms / (1000 * 60 * 60 * 24); }
function loadAccess(): { grantedAt: number } | null {
  try { const raw = localStorage.getItem(ACCESS_STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function saveAccess() { localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify({ grantedAt: now() })); }
function clearAccess() { localStorage.removeItem(ACCESS_STORAGE_KEY); }
function hasValidAccess(): boolean {
  const data = loadAccess();
  if (!data) return false;
  const ageDays = days(now() - data.grantedAt);
  return ageDays <= ACCESS_TTL_DAYS;
}

// ---------- UI atoms ----------
const Stat: React.FC<{ label: string; value: string; note?: string }> = ({ label, value, note }) => (
  <motion.div {...slideUp} className="bg-gray-900 rounded-xl p-5 text-center ring-1 ring-white/10">
    <div className="text-3xl font-semibold text-white">{value}</div>
    <div className="text-sm text-gray-400 mt-1">{label}</div>
    {note && <div className="text-xs text-gray-500 mt-1">{note}</div>}
  </motion.div>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div {...slideUp} className="bg-[#0b0b0b] rounded-2xl p-6 ring-1 ring-white/10">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="text-gray-300 leading-relaxed">{children}</div>
  </motion.div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2 {...fade} className="text-2xl md:text-3xl font-bold text-white mb-4">{children}</motion.h2>
);

// ---------- Gate Form ----------
function InvestorsGate({ onGranted }: { onGranted: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    org: "",
    role: "",
    code: "",
    agreeNda: false,
    consent: true,
    website: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChange<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailOk = /.+@.+\..+/.test(form.email);
    if (!form.fullName || !emailOk || !form.org || !form.role) {
      setError("Please complete all required fields.");
      return;
    }
    if (!form.agreeNda) {
      setError("You must accept the confidentiality statement.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/investor-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Request was not accepted. Check your details and code.");
        return;
      }
      saveAccess();
      setSubmitted(true);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="pt-20 container mx-auto px-6 py-12">
        <SectionHero
          title="Thank you — request received"
          subtitle="We’ve emailed you a confirmation. You can now view the investors page on this device."
          heightClass="h-44 md:h-56"
          greenOpacity={0.25}
        />
        <motion.div {...slideUp} className="max-w-2xl mx-auto mt-8 bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-white/10 text-center">
          <p className="text-gray-300">Click below to continue.</p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={onGranted}
              className="px-6 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90"
            >
              View Investors Page
            </button>
            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5"
            >
              Back to top
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Request investor access"
        subtitle="Complete the short form. If you have a code, enter it below."
        heightClass="h-44 md:h-56"
        greenOpacity={0.25}
      />

      <motion.form {...slideUp} onSubmit={onSubmit} className="max-w-3xl mx-auto mt-8 bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full name *</label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Work email *</label>
            <input
              type="email"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Organisation *</label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
              value={form.org}
              onChange={(e) => onChange("org", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role *</label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
              value={form.role}
              onChange={(e) => onChange("role", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Access code (if provided)</label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#50E3C2] tracking-widest"
              placeholder="Enter code"
              value={form.code}
              onChange={(e) => onChange("code", e.target.value)}
            />
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={form.agreeNda}
              onChange={(e) => onChange("agreeNda", e.target.checked)}
            />
            <span> I acknowledge this page contains confidential information and agree not to share or redistribute without written consent.</span>
          </label>
          <label className="flex items-start gap-3 text-sm text-gray-400">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={form.consent}
              onChange={(e) => onChange("consent", e.target.checked)}
            />
            <span> I’m happy for Vitalos to contact me about this request.</span>
          </label>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Request Access"}
          </button>
          {hasValidAccess() && (
            <button
              type="button"
              onClick={onGranted}
              className="px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5"
            >
              Continue (already granted)
            </button>
          )}
        </div>
      </motion.form>
    </main>
  );
}

// ---------- Investors Content (revealed after gate) ----------
function InvestorsContent() {
  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      {/* Hero */}
      <SectionHero
        title="Invest in proactive mental healthcare"
        subtitle="Vitalos is building clinical-grade AI that makes care earlier, fairer, and scalable."
        heightClass="h-44 md:h-56"
        greenOpacity={0.25}
      />

      {/* Highlights */}
      <section className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Focus" value="Mental Health AI" note="Predict • Triage • Copilot" />
        <Stat label="Model" value="B2B SaaS" note="Per-seat & per-population" />
        <Stat label="Pipeline" value="NHS & partners" note="Pilots + councils/HE/OH" />
        <Stat label="Raise" value="£X.Xm" note="18–24 mo runway" />
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Card title="Problem">
          Services are overwhelmed: long waits, risk spotted late, and high admin burden. Tools are either basic trackers or opaque models that don’t fit care pathways.
        </Card>
        <Card title="Solution">
          Predictive screening from short check-ins, smart triage to the right pathway, and a clinician copilot with clear notes, risk cues, and suggested next steps.
        </Card>
        <Card title="Why now">
          Demand surge + workforce shortages + policy momentum for safe digital mental health. Privacy-first, interoperable AI is urgently needed.
        </Card>
      </div>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Product & tech">
          <ul className="list-disc ml-5 space-y-2 text-gray-300">
            <li>Screening: PHQ-9/GAD-7 + NLP on journals/check-ins (transparent signals).</li>
            <li>Triage: rationale & audit trails; escalation for crisis cues.</li>
            <li>Clinician copilot: EHR-ready notes, summaries, next steps.</li>
            <li>Privacy-by-design: RBAC, encryption, consent workflows.</li>
            <li>Interoperability: FHIR/HL7 adapters; partner-cloud deploys.</li>
          </ul>
        </Card>
        <Card title="Business model & pricing">
          <ul className="list-disc ml-5 space-y-2 text-gray-300">
            <li>Subscriptions: per-seat (clinicians) or per-population (site/org).</li>
            <li>Implementation & training packages; outcomes dashboard add-on.</li>
            <li>Annual contracts aligned to service budgets; multi-site discounts.</li>
          </ul>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Market">
          NHS Talking Therapies, university wellbeing, occupational health, local councils; expansion to EU/Commonwealth with partners.
        </Card>
        <Card title="Go-to-market">
          <ul className="list-disc ml-5 space-y-2">
            <li>Pilots with NHS/councils; publish outcomes (time-to-care, symptom change).</li>
            <li>Channels via EHR vendors & digital health integrators.</li>
            <li>Evidence-led content & clinical champions network.</li>
          </ul>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Traction (to date)">
          <ul className="list-disc ml-5 space-y-2">
            <li>Pilot discussions with [X] NHS orgs / [Y] universities / [Z] employers.</li>
            <li>Prototype showing screening, triage, and copilot flows.</li>
            <li>Advisors: [clinical], [data governance], [NHS procurement].</li>
          </ul>
        </Card>
        <Card title="Roadmap (12–18 mo)">
          <ul className="list-disc ml-5 space-y-2">
            <li>Q1–Q2: 3 pilots live; interim outcomes.</li>
            <li>Q3: Interop/DTAC alignment; framework listings.</li>
            <li>Q4: First multi-site contract; partner MoU.</li>
          </ul>
        </Card>
        <Card title="Team & edge">
          <ul className="list-disc ml-5 space-y-2">
            <li>Founding mix: engineering, clinical ops, sustainability-scale mindset.</li>
            <li>Moat: real-world datasets, pathway fit, and governance from day 1.</li>
          </ul>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto mt-10">
        <div className="bg-gray-900 rounded-2xl p-6 ring-1 ring-white/10">
          <Title>The Ask</Title>
          <p className="text-gray-300">
            We are raising <span className="text-white font-semibold">£X.Xm</span> to fund 18–24 months of execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Stat label="Engineering" value="40%" note="Core product, safety, interop" />
            <Stat label="Clinical & Data" value="25%" note="Advisors, evaluations, governance" />
            <Stat label="GTM" value="35%" note="Pilots, procurement, partners" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Data room">
          <p>Request access to deck, model, DTAC notes, and pilot plan.</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => alert("Hook this to your data-room link or email flow")}
              className="inline-flex items-center px-5 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90"
            >
              Request Access
            </button>
            <button
              onClick={() => { clearAccess(); window.location.reload(); }}
              className="inline-flex items-center px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5"
              title="Remove stored access token"
            >
              Revoke access
            </button>
          </div>
        </Card>
        <Card title="Book a call">
          <p>30-minute intro with the founders to walk through product & pilots.</p>
          <div className="mt-4">
            <a href="#" className="inline-flex items-center px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5">Schedule</a>
          </div>
        </Card>
        <Card title="Contact">
          <p>Email <a href="mailto:invest@vitalos.co.uk" className="text-[#50E3C2]">invest@vitalos.co.uk</a> or call 0203 432 3640.</p>
        </Card>
      </section>

      <p className="text-center text-xs text-gray-500 mt-10">© {new Date().getFullYear()} Vitalos Technologies</p>
    </main>
  );
}

// ---------- Page ----------
const InvestorsPage: React.FC = () => {
  const [granted, setGranted] = useState<boolean>(false);

  useEffect(() => {
    setGranted(hasValidAccess());
  }, []);

  if (!granted) return <InvestorsGate onGranted={() => setGranted(true)} />;
  return <InvestorsContent />;
};

export default InvestorsPage;
