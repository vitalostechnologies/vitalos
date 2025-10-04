import React from "react";
import type { Page } from "../types";
import { BarChart2, Users, Globe, Code, Star } from "lucide-react";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";

type PageProps = { setCurrentPage: React.Dispatch<React.SetStateAction<Page>> };

const cardProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  whileHover: { y: -6, scale: 1.01 },
};

const HomePage: React.FC<PageProps> = ({ setCurrentPage }) => (
  <main className="pt-20">
    <Hero
  title="AI that keeps minds well at scale."
  subtitle="Vitalos delivers predictive screening, smart ... that make mental healthcare proactive, personalised, and safe."
  primaryCta={{ label: "Get Started", onClick: () => setCurrentPage("solutions") }}
  secondaryCta={{ label: "For investors", onClick: () => setCurrentPage("investors") }}
/>


    {/* Mission / Value prop */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-400">
            We use responsible AI to catch risk earlier, match people to the right support faster, and give clinicians superpowers—
            without adding to their workload. Designed to support, not replace, clinical judgement.
          </p>
        </div>

        {/* Three pillars drawn from the research: Predict • Support • Safeguard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <motion.div {...cardProps} className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Predict</h3>
            <p className="text-sm text-gray-400">
              Early-risk screening from short check-ins and journals. NLP signals + PHQ-9/GAD-7 style inputs produce transparent risk
              scores and trend lines, helping teams prioritise safely.
            </p>
          </motion.div>

          <motion.div {...cardProps} className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl">
            <Users className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Support</h3>
            <p className="text-sm text-gray-400">
              Smart triage to evidence-based pathways, psychoeducation nudges, and relapse-prevention plans. Crisis cues escalate to
              humans instantly, with clear handoffs.
            </p>
          </motion.div>

          <motion.div {...cardProps} className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl">
            <Globe className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Safeguard</h3>
            <p className="text-sm text-gray-400">
              Privacy-first architecture, audit trails, and bias monitoring. Built for interoperability (FHIR/HL7) so data flows to your
              EHR—securely and with consent.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage("demo")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90"
          >
            Try the Demo
          </button>
        </div>
      </div>
    </section>

    {/* Why Vitalos (backed by the “previous research” themes: clinician copilot, scalability, outcomes) */}
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Why Vitalos?</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Clinical-grade AI with real-world pragmatism: faster triage, lighter admin, and measurable outcomes across services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <motion.div {...cardProps} className="group bg-gray-900 rounded-lg p-8 shadow-xl">
            <Code className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Clinician Copilot</h3>
            <p className="text-sm text-gray-400">
              Summaries, risk cues, and suggested next steps compiled into clear notes—cutting paperwork and cognitive load while keeping
              humans in control.
            </p>
          </motion.div>

          <motion.div {...cardProps} className="group bg-gray-900 rounded-lg p-8 shadow-xl">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Scalable & Reliable</h3>
            <p className="text-sm text-gray-400">
              Cloud-native, privacy-by-design. Role-based access, encryption in transit/at rest, and observability for safe deployment at
              population scale.
            </p>
          </motion.div>

          <motion.div {...cardProps} className="group bg-gray-900 rounded-lg p-8 shadow-xl">
            <Star className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Outcomes That Matter</h3>
            <p className="text-sm text-gray-400">
              Track symptom change, adherence, and time-to-care. Service dashboards reveal bottlenecks and equity gaps to improve access.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Social proof / Testimonials */}
    <section className="bg-[#0a0a0a]">
      <Testimonials />
    </section>

    {/* Secondary CTA strip */}
    <section className="py-16 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-3">See Vitalos in action</h3>
          <p className="text-gray-400 mb-6">
            Explore the interactive demo to experience predictive screening, triage, and the clinician copilot workflow end-to-end.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage("demo")}
              className="px-6 py-3 rounded-xl bg-[#50E3C2] text-black font-semibold hover:bg-[#50E3C2]/90"
            >
              Launch Demo
            </button>
            <button
              onClick={() => setCurrentPage("solutions")}
              className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
