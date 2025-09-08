import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import {
  Compass,
  MessageCircle,
  BarChart2,
  Brain,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Clock,
  Users,
  AlertTriangle,
  FileText,
  BarChart3,
  Link2,
  Cpu,
  FlaskConical,
} from "lucide-react";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const SolutionsPage: React.FC = () => (
  <main className="pt-20 bg-black min-h-screen text-white">
    {/* Hero */}
    <Hero
      title="AI-Powered Mental Health Platform"
      subtitle="Vitalos unifies AI triage, personalised digital therapy, and waitlist support — aligned with NHS community mental health priorities."
      primaryCta={{ label: "Request a Demo", onClick: () => scrollToId("contact-cta") }}
      secondaryCta={{ label: "Explore Features", onClick: () => scrollToId("solutions-features") }}
    />

    {/* Why now */}
    <section className="container mx-auto px-6 pt-8 pb-4">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-lg text-gray-300">
          Demand for support is rising faster than capacity. Vitalos augments clinicians
          and empowers patients with responsible AI — delivering earlier, more personalised help,
          reducing admin, and improving outcomes.
        </p>
      </div>
    </section>

    {/* Core Capabilities */}
    <section id="solutions-features" className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          A single platform spanning assessment, support, and follow-up — designed for patients,
          clinicians, administrators, and caregivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card icon={<Stethoscope className="h-8 w-8 text-black" />} title="AI Intake & Triage">
          Adaptive conversational assessment classifies need and urgency, flags risk, and routes to the right care path.
        </Card>
        <Card icon={<Brain className="h-8 w-8 text-black" />} title="Personalised Digital Therapy">
          Dynamic CBT and guided self-care that adapts to progress, preferences, and clinical goals.
        </Card>
        <Card icon={<Clock className="h-8 w-8 text-black" />} title="Waitlist Support & Monitoring">
          24/7 check-ins, relapse indicators, and escalation alerts while patients await or transition between services.
        </Card>
        <Card icon={<Users className="h-8 w-8 text-black" />} title="Caregiver & Community Tools">
          Shareable tips, education, and structured support plans to include families and carers in recovery.
        </Card>
        <Card icon={<BarChart3 className="h-8 w-8 text-black" />} title="Clinician Augmentation">
          Auto-summaries, longitudinal trends, and session prep notes reduce admin and improve decision-making.
        </Card>
        <Card icon={<ShieldCheck className="h-8 w-8 text-black" />} title="Safety, Privacy, Trust">
          UK GDPR, role-based access, audit trails, and human-in-the-loop safeguards. Built for NHS information governance.
        </Card>
      </div>

      {/* Keep your original three feature themes visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card icon={<Compass className="h-8 w-8 text-black" />} title="Predictive Analytics">
          Identify rising-risk cohorts early to prioritise outreach and prevent crises.
        </Card>
        <Card icon={<MessageCircle className="h-8 w-8 text-black" />} title="Natural Language Understanding">
          Extract patterns from notes and conversations to enrich triage and therapy planning.
        </Card>
        <Card icon={<BarChart2 className="h-8 w-8 text-black" />} title="Personalised Plans">
          Tailored pathways across talking therapy, medication prompts, and lifestyle interventions.
        </Card>
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-[#0f0f0f]">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            From first contact to long-term support, Vitalos integrates smoothly with NHS pathways.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card icon={<MessageCircle className="h-8 w-8 text-black" />} title="1. Engage">
            Patients self-refer or are invited via link or NHS portal. Conversational intake builds rapport from the start.
          </Card>
          <Card icon={<Cpu className="h-8 w-8 text-black" />} title="2. Assess">
            AI triage scores severity, flags risk, and proposes initial care options for clinician review.
          </Card>
          <Card icon={<HeartPulse className="h-8 w-8 text-black" />} title="3. Support">
            Personalised digital therapy, routine check-ins, and smart nudges keep patients progressing between sessions.
          </Card>
          <Card icon={<BarChart3 className="h-8 w-8 text-black" />} title="4. Learn">
            Outcomes tracked over time feed analytics for service planning and continuous improvement.
          </Card>
        </div>
      </div>
    </section>

    {/* NHS-Ready */}
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">NHS-Ready by Design</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 mt-1" /> Clinical safety (human-in-the-loop), risk escalation workflows, and auditable decisions.</li>
            <li className="flex gap-3"><FileText className="h-5 w-5 mt-1" /> UK GDPR, DPIA templates, and data minimisation built into the platform.</li>
            <li className="flex gap-3"><Link2 className="h-5 w-5 mt-1" /> Interoperability: FHIR-friendly data models and export for EHR/NHS App integration.</li>
            <li className="flex gap-3"><AlertTriangle className="h-5 w-5 mt-1" /> Safeguarding: configurable thresholds for self-harm, crisis, or safeguarding alerts.</li>
            <li className="flex gap-3"><FlaskConical className="h-5 w-5 mt-1" /> Evidence pipeline: pilot-ready metrics (engagement, wait-time reduction, recovery rates).</li>
          </ul>
        </div>

        <div className="bg-[#111] rounded-xl p-8 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold mb-4">Stakeholder Outcomes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-white text-black p-4">
              <p className="text-sm">Patients</p>
              <p className="text-2xl font-bold">Faster access</p>
              <p className="text-sm mt-1">Personalised support while waiting; fewer crises.</p>
            </div>
            <div className="rounded-lg bg-white text-black p-4">
              <p className="text-sm">Clinicians</p>
              <p className="text-2xl font-bold">Less admin</p>
              <p className="text-sm mt-1">Better triage data; focused therapeutic time.</p>
            </div>
            <div className="rounded-lg bg-white text-black p-4">
              <p className="text-sm">Managers</p>
              <p className="text-2xl font-bold">Operational lift</p>
              <p className="text-sm mt-1">Insights for demand planning and service design.</p>
            </div>
            <div className="rounded-lg bg-white text-black p-4">
              <p className="text-sm">Caregivers</p>
              <p className="text-2xl font-bold">Included</p>
              <p className="text-sm mt-1">Guidance and shared care plans with consent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Metrics / Proof (placeholder figures for now) */}
    <section className="bg-[#0f0f0f]">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2">Impact at Scale</h2>
        <p className="text-gray-400 mb-10">Pilot-ready metrics we aim to deliver with NHS partners.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="rounded-xl bg-white text-black p-8">
            <p className="text-5xl font-extrabold leading-none">−15%</p>
            <p className="mt-2 text-sm">reduction in assessment wait times</p>
          </div>
          <div className="rounded-xl bg-white text-black p-8">
            <p className="text-5xl font-extrabold leading-none">−20%</p>
            <p className="mt-2 text-sm">fewer treatment drop-outs</p>
          </div>
          <div className="rounded-xl bg-white text-black p-8">
            <p className="text-5xl font-extrabold leading-none">+10hrs</p>
            <p className="mt-2 text-sm">clinician time saved per 100 referrals</p>
          </div>
        </div>
      </div>
    </section>

    {/* Integrations */}
    <section className="container mx-auto px-6 py-16">
      <div className="bg-[#111] rounded-xl p-8 ring-1 ring-white/10">
        <h3 className="text-xl font-semibold mb-3">Integrations</h3>
        <p className="text-gray-400 mb-6">Designed to fit existing workflows — from referral portals to record systems.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-80">
          <div className="flex items-center gap-2"><Link2 className="h-5 w-5" /> NHS App*</div>
          <div className="flex items-center gap-2"><Link2 className="h-5 w-5" /> EHR / FHIR*</div>
          <div className="flex items-center gap-2"><Link2 className="h-5 w-5" /> SSO / OAuth2*</div>
          <div className="flex items-center gap-2"><Link2 className="h-5 w-5" /> Secure Messaging*</div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          *Integration availability depends on partner systems and information governance approvals.
        </p>
      </div>
    </section>

    {/* CTA */}
    <section id="contact-cta" className="container mx-auto px-6 pb-24">
      <div className="bg-[#1a1a1a] rounded-lg p-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-3xl font-bold mb-2">Transform Your Service</h3>
          <p className="text-gray-400">
            See how Vitalos can reduce waits, enhance engagement, and scale support across your community.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="px-8 py-3 bg-[#50E3C2] text-black font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#50E3C2]/40"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </section>
  </main>
);

export default SolutionsPage;
