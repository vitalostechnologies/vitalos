import React from "react";
import SectionHero from "../components/SectionHero";
import Card from "../components/Card";
import {
  Cpu,
  Server,
  Database,
  ShieldCheck,
  FileText,
  Link2,
  Activity,
  GitBranch,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TechnologyPage: React.FC = () => {
  const cards = [
    {
      icon: <Cpu className="h-8 w-8 text-black" />,
      title: "AI & Orchestration",
      desc: "LLM + ML ensemble with RAG, guardrails, and human-in-the-loop for safe clinical decisions.",
      hover: "from-purple-500/20 to-purple-700/30",
    },
    {
      icon: <Server className="h-8 w-8 text-black" />,
      title: "Microservices on Kubernetes",
      desc: "Containerised services, autoscaling, blue-green deploys, and UK data residency.",
      hover: "from-blue-500/20 to-blue-700/30",
    },
    {
      icon: <Database className="h-8 w-8 text-black" />,
      title: "Data Platform",
      desc: "Encrypted lake + warehouse, real-time streaming, ML feature store, and immutable audit logs.",
      hover: "from-green-500/20 to-green-700/30",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-black" />,
      title: "Security & Privacy",
      desc: "TLS/AES-256, RBAC, KMS/HSM, OWASP ASVS, and zero-trust networking.",
      hover: "from-red-500/20 to-red-700/30",
    },
    {
      icon: <FileText className="h-8 w-8 text-black" />,
      title: "Clinical Compliance",
      desc: "NHS DCB0129/0160, GDPR/DPIA, DSPT, ISO 27001, and data minimisation by design.",
      hover: "from-yellow-500/20 to-yellow-700/30",
    },
    {
      icon: <Link2 className="h-8 w-8 text-black" />,
      title: "Interoperability",
      desc: "FHIR R4, HL7, SNOMED/ICD-10, SMART on FHIR, OAuth2/OIDC.",
      hover: "from-pink-500/20 to-pink-700/30",
    },
    {
      icon: <Activity className="h-8 w-8 text-black" />,
      title: "Observability",
      desc: "OpenTelemetry logging, metrics, tracing, with dashboards and SLO alerts.",
      hover: "from-cyan-500/20 to-cyan-700/30",
    },
    {
      icon: <GitBranch className="h-8 w-8 text-black" />,
      title: "MLOps & CI/CD",
      desc: "Model registry, drift monitoring, GitHub Actions, Terraform IaC, reproducible builds.",
      hover: "from-indigo-500/20 to-indigo-700/30",
    },
    {
      icon: <Cloud className="h-8 w-8 text-black" />,
      title: "Edge & Cloud Flexibility",
      desc: "Hybrid on-prem or UK public cloud, offline-first clients, graceful degradation.",
      hover: "from-teal-500/20 to-teal-700/30",
    },
  ];

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Technology"
        subtitle="Innovative solutions powering our platform"
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      {/* Intro */}
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-lg text-gray-300 leading-relaxed">
          Vitalos is built on a modern, cloud-native architecture designed for NHS
          interoperability, clinical safety, and patient trust. Our stack combines
          state-of-the-art AI with proven enterprise infrastructure.
        </p>
      </div>

      {/* Tech Cards with Fade-in */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeIn}
            className={`group rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-br ${card.hover}`}
          >
            <Card icon={card.icon} title={card.title}>
              {card.desc}
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
};

export default TechnologyPage;
