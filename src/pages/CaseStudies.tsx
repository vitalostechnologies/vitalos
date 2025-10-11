import React from "react";
import SectionHero from "../components/SectionHero";

// Simple UI atoms
const Badge: React.FC<{ children: React.ReactNode; tone?: "green" | "gray" | "blue" }>=({ children, tone = "green" })=> (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold 
    ${tone === "green" ? "bg-[#50E3C2]/15 text-[#50E3C2]" : tone === "blue" ? "bg-blue-400/10 text-blue-300" : "bg-white/10 text-gray-200"}
  `}>
    {children}
  </span>
);

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }>=({ title, children, className = "" })=> (
  <div className={`bg-[#0b0b0b] rounded-2xl ring-1 ring-white/10 p-6 ${className}`}>
    {title ? <h3 className="text-xl font-semibold text-white mb-3">{title}</h3> : null}
    <div className="text-gray-300 leading-relaxed">{children}</div>
  </div>
);

const Kpi: React.FC<{ label: string; value: string; sub?: string }>=({ label, value, sub })=> (
  <div className="rounded-2xl bg-white text-black p-5 text-center">
    <div className="text-4xl font-extrabold leading-none">{value}</div>
    <div className="mt-1 text-sm">{label}</div>
    {sub ? <div className="mt-1 text-xs text-black/70">{sub}</div> : null}
  </div>
);

const Divider: React.FC = () => <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"/>;

const Table: React.FC<{ children: React.ReactNode }>=({ children })=> (
  <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
    <table className="min-w-full text-left text-sm">
      {children}
    </table>
  </div>
);

const Row: React.FC<{ children: React.ReactNode; head?: boolean }>=({ children, head })=> (
  <tr className={`${head ? "bg-white/5 text-gray-200" : "border-t border-white/10"}`}>
    {children}
  </tr>
);

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <th className={`px-4 py-3 font-semibold ${className}`}>{children}</th>
);

const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <td className={`px-4 py-3 text-gray-300 align-top ${className}`}>{children}</td>
);

// Page
const CaseStudiesPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 pb-16">
    <SectionHero
      title="NHS Mental Health AI — Simulated Pilot Case Study"
      subtitle="Evidence‑backed prototype using public NHS data and simulated workflows (no PHI)"
      heightClass="h-44 md:h-56"
      greenOpacity={0.25}
    />

    {/* One‑paragraph Summary */}
    <section className="max-w-4xl mx-auto space-y-3">
      <div className="flex flex-wrap gap-2">
        <Badge>DTAC‑aligned</Badge>
        <Badge tone="blue">No PHI</Badge>
        <Badge tone="gray">Public data baseline</Badge>
      </div>
      <p className="text-gray-300">
        <span className="font-semibold text-white">Product/Scope:</span> AI‑assisted mental‑health triage & risk prediction ·
        <span className="font-semibold text-white"> Partner:</span> NHS‑representative (simulated) ·
        <span className="font-semibold text-white"> My Role:</span> Lead/Freelance Software Engineer — architecture → delivery → demo launch ·
        <span className="font-semibold text-white"> Outcome:</span> Prototype suggests −37% median triage time, +22% assessment throughput; p95 latency 320 ms; DTAC/DPIA mapping complete.
      </p>
    </section>

    <Divider />

    {/* Snapshot (Before → After) */}
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Snapshot (Before → After)</h2>
      <Table>
        <thead>
          <Row head>
            <Th>Metric</Th>
            <Th className="whitespace-nowrap">Before</Th>
            <Th>After</Th>
            <Th>Delta</Th>
          </Row>
        </thead>
        <tbody>
          <Row>
            <Td>Median triage time</Td>
            <Td>7.9 days</Td>
            <Td>5.0 days</Td>
            <Td><span className="text-emerald-400 font-semibold">−37%</span></Td>
          </Row>
          <Row>
            <Td>Assessment throughput / week</Td>
            <Td>180</Td>
            <Td>220</Td>
            <Td className="text-emerald-400 font-semibold">+22%</Td>
          </Row>
          <Row>
            <Td>p95 app latency</Td>
            <Td>1.2s</Td>
            <Td>0.32s</Td>
            <Td className="text-emerald-400 font-semibold">−73%</Td>
          </Row>
          <Row>
            <Td>Cost per assessment</Td>
            <Td>£X</Td>
            <Td>£Y</Td>
            <Td>−Z%</Td>
          </Row>
          <Row>
            <Td>Clinician CSAT</Td>
            <Td>3.6/5</Td>
            <Td>4.4/5</Td>
            <Td className="text-emerald-400 font-semibold">+0.8</Td>
          </Row>
          <Row>
            <Td>Model PPV @ operating point</Td>
            <Td>—</Td>
            <Td>0.71</Td>
            <Td>—</Td>
          </Row>
        </tbody>
      </Table>
      <p className="text-xs text-gray-500 mt-2">All figures are simulated/aggregated for illustration. Use access‑controlled dashboards for raw evidence.</p>
    </section>

    <Divider />

    {/* Context & Objectives */}
    <section className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
      <Card title="Context">
        <ul className="list-disc pl-5 space-y-1">
          <li>Setting: NHS Talking Therapies (IAPT) / CMHT (simulated)</li>
          <li>Problem: long waits, late risk detection, admin burden</li>
        </ul>
      </Card>
      <Card title="Objectives">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Reduce triage time by ≥30%</li>
          <li>Improve assessment throughput ≥15%</li>
          <li>Deploy privacy‑first, DTAC‑aligned MVP in 8–12 weeks</li>
        </ol>
      </Card>
      <Card title="Stakeholders & Roles">
        <ul className="list-disc pl-5 space-y-1">
          <li>Clinical Lead (simulated): pathway design, safety review</li>
          <li>IG/Data Protection: DPIA, DPAs, data minimisation</li>
          <li>My role: architecture, delivery, MLOps, security</li>
        </ul>
      </Card>
    </section>

    <Divider />

    {/* Governance, Safety & Compliance */}
    <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
      <Card title="Governance, Safety & Compliance">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">DTAC mapping:</span> clinical safety, data protection, technical security, interoperability, usability/accessibility — evidence pointers prepared.</li>
          <li><span className="font-semibold">DPIA:</span> redacted summary available; data minimisation + pseudonymisation; purpose limitation.</li>
          <li><span className="font-semibold">Clinical safety:</span> DCB0129/0160 engagement (simulated); hazard log & safety case template.</li>
          <li><span className="font-semibold">Security:</span> OWASP ASVS controls; SSO/OIDC; principle of least privilege; audit trails.</li>
        </ul>
      </Card>
      <Card title="Data & Privacy">
        <ul className="list-disc pl-5 space-y-2">
          <li>Pseudonymisation in transit/at rest; RBAC; immutable audit logs.</li>
          <li>Retention policy & lawful basis mapping (simulated).</li>
          <li>WCAG 2.1 AA accessibility; consent/notice templates.</li>
        </ul>
      </Card>
    </section>

    <Divider />

    {/* Approach & Architecture */}
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Approach & Architecture</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="font-semibold text-white">Frontend</p>
          <p>React + TypeScript (Vite), WCAG 2.1 AA, privacy‑aware analytics.</p>
        </Card>
        <Card>
          <p className="font-semibold text-white">Backend</p>
          <p>Node.js (serverless on Vercel/AWS), REST + Graph, rate limits, idempotent APIs.</p>
        </Card>
        <Card>
          <p className="font-semibold text-white">Data/Interop</p>
          <p>FHIR/HL7 adapters; SNOMED CT coding; ETL for features & analytics.</p>
        </Card>
        <Card>
          <p className="font-semibold text-white">ML</p>
          <p>Gradient‑boosted + LLM features; calibration; threshold selection with clinicians; bias checks.</p>
        </Card>
      </div>
      <p className="text-xs text-gray-500 mt-3">Architecture diagram: add link to repo/notion or embed image here when available.</p>
    </section>

    <Divider />

    {/* Delivery Timeline */}
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Delivery Timeline (8–12 weeks)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <p><span className="font-semibold">Week 1–2:</span> Discovery, consent flows, DPIA inputs, baseline metrics.</p>
          <p><span className="font-semibold">Week 3–4:</span> Prototype; FHIR integration; seed data; safety review.</p>
          <p><span className="font-semibold">Week 5–6:</span> Pilot build; RBAC; audit; dashboards.</p>
        </Card>
        <Card>
          <p><span className="font-semibold">Week 7–8:</span> Calibration, shadow testing, training, playbooks.</p>
          <p><span className="font-semibold">Week 9–10:</span> Live canary (simulated); feedback loop.</p>
          <p><span className="font-semibold">Week 11–12:</span> Results review; hardening; scale‑out plan.</p>
        </Card>
      </div>
    </section>

    <Divider />

    {/* Results & Evidence */}
    <section className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-4">
      <Kpi label="Median triage time" value="−37%" sub="7.9d → 5.0d (simulated)"/>
      <Kpi label="Throughput / week" value="+22%" sub="180 → 220 (simulated)"/>
      <Kpi label="p95 latency" value="320 ms" sub="Serverless edge"/>
    </section>
    <div className="max-w-5xl mx-auto mt-4">
      <Card title="Evidence links (redacted/public‑safe)">
        <ul className="list-disc pl-5 space-y-1">
          <li>Dashboards: Grafana/APM (screenshots)</li>
          <li>PRs/commits: architecture changes, safety checks</li>
          <li>Meeting notes: calibration workshops, IG approvals (templates)</li>
          <li>Training materials & SOPs</li>
        </ul>
      </Card>
    </div>

    <Divider />

    {/* Quotes & Testimonials */}
    <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
      <Card>
        <p className="italic text-gray-200">“The prototype shows how we could shorten waits and make assessments more consistent without extra admin.”</p>
        <p className="mt-2 text-sm text-gray-400">— Clinical Lead (NHS, role redacted — simulated)</p>
      </Card>
      <Card>
        <p className="italic text-gray-200">“Fast, secure delivery with an impressive focus on safety and interoperability.”</p>
        <p className="mt-2 text-sm text-gray-400">— Founder/PM (simulated)</p>
      </Card>
    </section>

    <Divider />

    {/* Lessons & Next Steps */}
    <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
      <Card title="Lessons Learned">
        <ul className="list-disc pl-5 space-y-1">
          <li>Co‑design with clinicians simplifies change management.</li>
          <li>Shadow testing improves trust & calibration.</li>
          <li>Small, auditable feature flags ease rollout.</li>
        </ul>
      </Card>
      <Card title="Next Steps / Roadmap">
        <ul className="list-disc pl-5 space-y-1">
          <li>Expand to additional services; EPR interoperability.</li>
          <li>Prospective evaluation with agreed endpoints.</li>
          <li>Scale safety case; publish redacted DTAC pack overview.</li>
        </ul>
      </Card>
    </section>

    <Divider />

    {/* Ethics & Checklist + Metric Cookbook */}
    <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
      <Card title="Ethics & Privacy Checklist (Quick)">
        <ul className="list-none space-y-2">
          <li>☑ No PHI/PII in case study; screenshots redacted</li>
          <li>☑ Consent for quotes; DPIA/DTAC references safe to share</li>
          <li>☑ Aggregated, de‑identified metrics only</li>
          <li>☑ Access‑controlled links (no raw data dumps)</li>
        </ul>
      </Card>
      <Card title="Metric Cookbook (How to compute)">
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="font-semibold">Median triage time:</span> median(triage_completed_at − referral_received_at)</li>
          <li><span className="font-semibold">Throughput/week:</span> count(assessments) grouped by ISO week</li>
          <li><span className="font-semibold">p95 latency:</span> percentile(response_time_ms, 95) from logs/APM</li>
          <li><span className="font-semibold">PPV@τ:</span> TP/(TP+FP) on shadow‑labeled set</li>
          <li><span className="font-semibold">ECE:</span> |bin_acc − bin_conf| averaged over bins</li>
          <li><span className="font-semibold">Fairness:</span> report deltas (PPV/TPR) across groups</li>
        </ul>
      </Card>
    </section>

    <Divider />

    {/* LinkedIn Featured version */}
    <section className="max-w-5xl mx-auto">
      <Card title="LinkedIn Featured (Short)">
        <p className="text-gray-200"><span className="font-semibold">NHS pilot: Mental‑health AI triage</span> — As lead freelance engineer I delivered a privacy‑first, DTAC‑aligned simulated pilot across representative pathways. Results: <span className="font-semibold">−37%</span> median triage time, <span className="font-semibold">+22%</span> assessments/week, p95 latency <span className="font-semibold">320 ms</span>. Built with TypeScript/React/Node (serverless), FHIR adapters, audit trails, and model calibration & safety checks. (Screens & metrics below.)</p>
      </Card>
    </section>

  </main>
);

export default CaseStudiesPage;
