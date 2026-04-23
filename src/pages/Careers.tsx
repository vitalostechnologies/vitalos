import React from "react";
import SectionHero from "../components/SectionHero";

type Opening = {
  title: string;
  summary: string;
  aboutVitalos: string;
  purpose: string;
  responsibilities: string[];
  profile: string[];
};

const OPENINGS: Opening[] = [
  {
    title: "CTO / Founding Engineer",
    summary:
      "Own architecture, product build, security posture, and engineering execution from the ground up.",
    aboutVitalos:
      "Vitalos is building a trusted AI platform for mental healthcare, combining product ambition with strong expectations around privacy, clinical credibility, and real-world deployment.",
    purpose:
      "You will shape the technical foundation of Vitalos, move fast on product delivery, and make sure the platform is secure, scalable, and trustworthy from day one.",
    responsibilities: [
      "Define the architecture across product, data, infrastructure, and security.",
      "Lead engineering delivery and help turn early concepts into reliable product releases.",
      "Set standards for quality, privacy, observability, and technical decision-making.",
      "Work closely with product, clinical, and commercial teammates to prioritize the roadmap.",
    ],
    profile: [
      "Strong startup or early-stage product-building experience.",
      "Comfortable owning both hands-on implementation and technical leadership.",
      "Good judgment around security, scalability, and healthcare-grade reliability.",
    ],
  },
  {
    title: "AI/ML Engineer",
    summary:
      "Build triage, NLP, risk scoring, personalization, and evaluation pipelines for the platform.",
    aboutVitalos:
      "Vitalos is creating practical AI tools that help make mental healthcare earlier, safer, and more scalable for patients, clinicians, and healthcare partners.",
    purpose:
      "You will help create the intelligence layer behind the product, with a focus on safe, measurable, and clinically useful AI capabilities.",
    responsibilities: [
      "Design and improve NLP, classification, personalization, and risk-scoring systems.",
      "Build evaluation pipelines, testing workflows, and monitoring for model quality.",
      "Collaborate with engineering and clinical stakeholders to make outputs usable and safe.",
      "Support experimentation while keeping traceability and guardrails in place.",
    ],
    profile: [
      "Experience shipping applied ML or NLP systems into real products.",
      "Comfortable balancing model ambition with safety, explainability, and performance.",
      "Able to work pragmatically with imperfect data and evolving product requirements.",
    ],
  },
  {
    title: "Full-Stack Product Engineer",
    summary:
      "Ship product experiences for patients, clinicians, and administrators across the Vitalos platform.",
    aboutVitalos:
      "Vitalos is designing a high-trust product experience for mental healthcare, where usability, reliability, and clarity matter as much as technical capability.",
    purpose:
      "You will build the actual experience people use every day, helping turn platform capabilities into clear, reliable workflows.",
    responsibilities: [
      "Develop frontend and backend features across core product journeys.",
      "Work on user flows for patients, clinicians, admins, and partner teams.",
      "Improve usability, performance, and reliability across the product.",
      "Collaborate with design and product to iterate quickly from feedback.",
    ],
    profile: [
      "Strong experience building modern web applications end to end.",
      "Comfortable moving between UI details, APIs, and product thinking.",
      "Cares about accessibility, clarity, and speed of execution.",
    ],
  },
  {
    title: "Clinical Lead",
    summary:
      "Ensure the product is safe, evidence-based, and credible for mental health use in real-world settings.",
    aboutVitalos:
      "Vitalos is working at the intersection of AI and mental healthcare, where clinical credibility and real-world usefulness are central to building something people can trust.",
    purpose:
      "You will make sure Vitalos remains grounded in clinical reality and earns trust with providers, partners, and users.",
    responsibilities: [
      "Guide product decisions with clinical judgment and evidence-based practice.",
      "Review patient-facing and clinician-facing workflows for safety and appropriateness.",
      "Support development of protocols, escalation logic, and care pathway assumptions.",
      "Represent the clinical perspective in product, partnerships, and validation work.",
    ],
    profile: [
      "Background in mental health care, psychology, psychiatry, or related clinical leadership.",
      "Able to work cross-functionally with technical and product teams.",
      "Comfortable translating clinical standards into practical product guidance.",
    ],
  },
  {
    title: "Compliance / Data Protection / Clinical Safety Lead",
    summary:
      "Own GDPR, governance, auditability, DPIAs, clinical safety processes, and trust readiness for deployment.",
    aboutVitalos:
      "Vitalos is building for sensitive healthcare environments, where privacy, governance, and clinical safety are part of the product itself rather than afterthoughts.",
    purpose:
      "You will help Vitalos become deployable in serious healthcare environments by building the governance and safety foundations that customers expect.",
    responsibilities: [
      "Lead work around privacy, data protection, clinical safety, and governance readiness.",
      "Own DPIAs, policy inputs, documentation, risk tracking, and audit support.",
      "Partner with engineering to ensure controls are practical and built into the product.",
      "Help the company prepare for NHS-style reviews, procurement, and trust conversations.",
    ],
    profile: [
      "Experience with healthcare compliance, privacy, information governance, or clinical safety.",
      "Strong understanding of operationalizing trust, not just writing policy.",
      "Able to work with both technical teams and external stakeholders.",
    ],
  },
  {
    title: "Product Manager",
    summary:
      "Turn the vision into a focused roadmap and keep the team aligned on user needs and business priorities.",
    aboutVitalos:
      "Vitalos is an early-stage company building an AI-powered mental health platform, and strong product judgment is key to turning vision into meaningful adoption.",
    purpose:
      "You will help the company make sharp product decisions, reduce ambiguity, and focus effort where it matters most.",
    responsibilities: [
      "Own roadmap structure, prioritization, and product discovery across teams.",
      "Translate feedback from users, partners, and internal stakeholders into clear product work.",
      "Define what success looks like for features and keep execution aligned to outcomes.",
      "Support communication across engineering, clinical, design, and commercial functions.",
    ],
    profile: [
      "Experience in product management for early-stage or fast-moving teams.",
      "Strong judgment, communication, and prioritization skills.",
      "Comfortable working across both strategic direction and delivery detail.",
    ],
  },
  {
    title: "Business Development / Partnerships Lead",
    summary:
      "Drive partnerships, pilots, and commercial conversations with NHS, clinics, and healthcare organizations.",
    aboutVitalos:
      "Vitalos is building toward healthcare partnerships that require trust, patience, and strong commercial storytelling across complex stakeholder groups.",
    purpose:
      "You will help turn interest into real relationships, pilots, and revenue pathways for the company.",
    responsibilities: [
      "Build and manage conversations with providers, partners, and ecosystem stakeholders.",
      "Own outreach, partnership development, and early commercial process design.",
      "Help shape pilot opportunities and communicate the value of the platform clearly.",
      "Bring market insight back into product and company strategy.",
    ],
    profile: [
      "Experience in healthtech, partnerships, enterprise sales, or business development.",
      "Strong communicator who can build trust in complex stakeholder environments.",
      "Comfortable operating in long-cycle, relationship-driven markets.",
    ],
  },
  {
    title: "UX/UI Designer",
    summary:
      "Design clear, trusted, low-friction experiences that feel safe and supportive in a mental health context.",
    aboutVitalos:
      "Vitalos is building product experiences for sensitive, high-stakes contexts where trust, clarity, and emotional tone are central to good design.",
    purpose:
      "You will shape how the product feels in practice, making complex workflows simple and emotionally appropriate for sensitive use cases.",
    responsibilities: [
      "Design product flows, interfaces, and interaction patterns across the platform.",
      "Create experiences that feel trustworthy, calm, and easy to use.",
      "Work closely with product and engineering to refine ideas into shipped experiences.",
      "Support design systems, usability improvements, and user-centered iteration.",
    ],
    profile: [
      "Strong product design experience across web applications or complex workflows.",
      "Excellent visual judgment with a focus on clarity and trust.",
      "Comfortable designing for sensitive, high-stakes user journeys.",
    ],
  },
  {
    title: "Customer Success / Implementation Lead",
    summary:
      "Own onboarding, implementation, partner support, and rollout success for customers using Vitalos.",
    aboutVitalos:
      "Vitalos is built for real-world healthcare environments, where implementation quality and long-term partner success are essential to growth.",
    purpose:
      "You will make sure partnerships succeed after the deal, helping customers adopt the platform smoothly and get real value from it.",
    responsibilities: [
      "Lead onboarding and implementation planning for new customers and partners.",
      "Coordinate rollout support, feedback collection, and issue escalation.",
      "Build strong working relationships with customers and help them succeed over time.",
      "Translate implementation learning back into product and operational improvements.",
    ],
    profile: [
      "Experience in customer success, implementation, operations, or deployment roles.",
      "Strong organization and communication skills in cross-functional environments.",
      "Comfortable being the bridge between customers, product, and internal teams.",
    ],
  },
];

type CareersPageProps = {
  onApplicationSuccess?: () => void;
};

const MAX_CV_FILE_BYTES = 2 * 1024 * 1024;

async function fileToBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });

  const [, base64 = ""] = dataUrl.split(",", 2);
  return base64;
}

function RoleModal({
  role,
  onClose,
  onApplicationSuccess,
}: {
  role: Opening;
  onClose: () => void;
  onApplicationSuccess?: () => void;
}) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  React.useEffect(() => {
    setErrors({});
    setSubmitting(false);
  }, [role.title]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitting(true);

    const form = event.currentTarget;
    const fd = new FormData(form);
    const cvFile = fd.get("cvFile");
    const payload = {
      roleTitle: role.title,
      fullName: String(fd.get("fullName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      linkedin: String(fd.get("linkedin") || "").trim(),
      note: String(fd.get("note") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      cvFileName: "",
      cvMimeType: "",
      cvFileSize: 0,
      cvBase64: "",
    };

    const nextErrors: Record<string, string> = {};
    if (!payload.fullName) nextErrors.fullName = "Full name is required";
    if (!payload.email) nextErrors.email = "Email is required";
    if (payload.email && !/.+@.+\..+/.test(payload.email)) nextErrors.email = "Enter a valid email";
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      nextErrors.cvFile = "CV upload is required";
    } else {
      const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const lowerName = cvFile.name.toLowerCase();
      const hasAllowedExtension = allowedExtensions.some((extension) => lowerName.endsWith(extension));

      if (!hasAllowedExtension && !allowedMimeTypes.includes(cvFile.type)) {
        nextErrors.cvFile = "Upload a PDF, DOC, or DOCX file";
      } else if (cvFile.size > MAX_CV_FILE_BYTES) {
        nextErrors.cvFile = "CV must be 2MB or smaller";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitting(false);
      return;
    }

    try {
      if (cvFile instanceof File) {
        payload.cvFileName = cvFile.name;
        payload.cvMimeType = cvFile.type || "application/octet-stream";
        payload.cvFileSize = cvFile.size;
        payload.cvBase64 = await fileToBase64(cvFile);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors({
          form: typeof data?.error === "string" ? data.error : "Could not submit application.",
        });
        setSubmitting(false);
        return;
      }

      form.reset();
      setSubmitting(false);
      onClose();
      onApplicationSuccess?.();
    } catch {
      setErrors({ form: "Could not submit application." });
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-role-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111] p-6 md:p-8 ring-1 ring-white/10 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5"
          aria-label="Close role details"
        >
          X
        </button>

        <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">
          Remote
        </div>
        <h2 id="career-role-title" className="mt-4 text-3xl font-bold text-white">
          {role.title}
        </h2>
        <p className="mt-3 text-base leading-8 text-gray-400">{role.summary}</p>

        <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              About Vitalos
            </h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">{role.aboutVitalos}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              What You Will Own
            </h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">{role.purpose}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              Key Responsibilities
            </h3>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-gray-400">
              {role.responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              Ideal Profile
            </h3>
            <ul className="mt-2 space-y-2 text-sm leading-7 text-gray-400">
              {role.profile.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Apply for This Role
          </h3>
          <p className="mt-2 text-sm leading-7 text-gray-400">
            Submit a basic application below and we will collect it into our hiring workflow.
          </p>

          {errors.form ? (
            <div className="mt-4 rounded-xl border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
              {errors.form}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
                  placeholder="Your full name"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName ? <p className="mt-1 text-sm text-red-300">{errors.fullName}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email ? <p className="mt-1 text-sm text-red-300">{errors.email}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">Location</label>
                <input
                  name="location"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">LinkedIn</label>
                <input
                  name="linkedin"
                  type="url"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Upload CV</label>
              <input
                name="cvFile"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
              />
              <p className="mt-2 text-xs text-gray-500">Accepted: PDF, DOC, or DOCX up to 2MB.</p>
              {errors.cvFile ? <p className="mt-1 text-sm text-red-300">{errors.cvFile}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Why are you a fit?</label>
              <textarea
                name="note"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
                placeholder="Tell us a little about yourself and why you are interested."
              />
            </div>

            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Apply for This Role"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const CareersPage: React.FC<CareersPageProps> = ({ onApplicationSuccess }) => {
  const [selectedRole, setSelectedRole] = React.useState<Opening | null>(null);

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Careers"
        subtitle="Join our growing team"
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      <section className="mx-auto max-w-3xl text-center mb-14">
        <p className="text-lg text-gray-300 leading-relaxed">
          We are building an AI-powered mental health platform designed to support
          patients, clinicians, and healthcare systems with safer, more accessible
          care.
        </p>
        <p className="mt-4 text-gray-400 leading-relaxed">
          Every role below is remote. We are looking for thoughtful builders,
          operators, and specialists who want to shape a high-trust healthcare
          product from an early stage.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {OPENINGS.map((role) => (
          <article
            key={role.title}
            className="rounded-2xl bg-[#111] p-6 ring-1 ring-white/10 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white">{role.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">{role.summary}</p>

            <button
              type="button"
              onClick={() => setSelectedRole(role)}
              className="mt-5 inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Apply
            </button>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-2xl bg-[#111] p-8 text-center ring-1 ring-white/10">
        <h2 className="text-2xl font-bold text-white">Interested in joining?</h2>
        <p className="mt-3 mx-auto max-w-2xl text-gray-400 leading-relaxed">
          If one of these roles fits you, we would love to hear from you. Reach out
          and tell us how you can help build the future of mental healthcare with AI.
        </p>
        <a
          href="mailto:hello@vitalos.co.uk?subject=Careers%20at%20Vitalos"
          className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
        >
          Contact Us About Roles
        </a>
      </section>

      {selectedRole ? (
        <RoleModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onApplicationSuccess={onApplicationSuccess}
        />
      ) : null}
    </main>
  );
};

export default CareersPage;
