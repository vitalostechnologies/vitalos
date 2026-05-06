import React from "react";
import SectionHero from "../components/SectionHero";
import { motion } from "framer-motion";
import { Rocket, FlaskConical, Hospital, Users, Sparkles } from "lucide-react";

const MILESTONES = [
  {
    year: "2024",
    title: "Foundation",
    description:
      "Vitalos Technologies was established with a clear mission: to harness the power of AI to address one of the UK’s most urgent challenges — mental health. We began with a small, passionate team of engineers and clinicians determined to bridge the gap between technology and compassionate care.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    year: "2025",
    title: "First Prototype",
    description:
      "We built and tested our first AI-powered mental wellness companion. Designed to support individuals during long NHS waiting times, the tool provided daily check-ins, guided self-care exercises, and automated reports that reduced the administrative burden on clinicians.",
    icon: <FlaskConical className="h-5 w-5" />,
  },
  {
    year: "2025",
    title: "NHS Alignment",
    description:
      "Our roadmap was shaped around the NHS Long Term Plan and the UK government’s digital transformation agenda. By aligning our platform with NHS priorities, we ensured that our technology could integrate seamlessly into real-world care pathways and complement existing community mental health services.",
    icon: <Hospital className="h-5 w-5" />,
  },
  {
    year: "2025",
    title: "Community Focus",
    description:
      "We expanded beyond hospital-centric solutions to create tools for everyday environments — from homes to workplaces to schools. By focusing on accessibility and inclusion, we aimed to support patients, families, and caregivers, while reducing the load on frontline clinicians.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    year: "Future",
    title: "Scaling Innovation",
    description:
      "Looking ahead, Vitalos is building toward a fully integrated, AI-driven mental health platform. Our goal is to deliver proactive, personalized care at scale, with global research partnerships, NHS pilots, and a vision of making AI a trusted, compassionate partner in healthcare.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HistoryPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
      title="History"
      subtitle="Our journey so far"
      heightClass="h-40 md:h-48"
      greenOpacity={0.25}
    />

    {/* Intro paragraph */}
    <div className="mx-auto max-w-2xl text-center mb-12">
      <p className="text-lg text-gray-300 leading-relaxed">
        From a small founding team to shaping NHS-aligned innovation, Vitalos has
        always been driven by a single belief: technology can be a compassionate
        partner in care. Our history reflects a commitment to solving real-world
        problems with AI, making mental health support more personal, accessible,
        and proactive.
      </p>
    </div>

    {/* Timeline */}
    <section className="relative mx-auto max-w-3xl py-12">
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="space-y-10"
      >
        {MILESTONES.map((m) => (
          <motion.li
            key={m.title}
            variants={fadeIn}
            className="relative flex items-start gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              {m.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400">{m.year}</p>
              <h3 className="text-lg font-semibold text-white">{m.title}</h3>
              <p className="mt-1 text-gray-300 leading-relaxed">
                {m.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  </main>
);

export default HistoryPage;
