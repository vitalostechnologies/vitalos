import React from "react";
import Card from "../components/Card";
import { Compass, MessageCircle, BarChart2 } from "lucide-react";
import Hero from "../components/Hero"; // ✅ reuse your existing hero

const SolutionsPage: React.FC = () => (
  <main className="pt-20 bg-black min-h-screen text-white">
    {/* Hero */}
    <Hero
      title="AI-Powered Diagnostics for Mental Wellness"
      subtitle="Vitalos Diagnostics leverages predictive analytics, natural language processing, and personalized treatment planning to empower healthcare professionals and improve patient outcomes."
      primaryCta={{
        label: "Request a Demo",
        onClick: () => alert("Demo requested!"),
      }}
      secondaryCta={{
        label: "Explore Features",
        onClick: () => {
          const features = document.getElementById("solutions-features");
          if (features) features.scrollIntoView({ behavior: "smooth" });
        },
      }}
    />

    {/* Features */}
    <section id="solutions-features" className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Harness the power of machine learning and large-scale data analysis to gain unprecedented clarity
          into patient well-being, enabling proactive and personalized care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card icon={<Compass className="h-8 w-8 text-black" />} title="Predictive Analytics">
          Identify individuals at risk before a crisis occurs for proactive intervention.
        </Card>
        <Card icon={<MessageCircle className="h-8 w-8 text-black" />} title="Natural Language Processing">
          Extract patterns from clinical notes and interactions for deeper understanding.
        </Card>
        <Card icon={<BarChart2 className="h-8 w-8 text-black" />} title="Personalized Treatment Plans">
          Tailored recommendations across therapy, medication, and lifestyle adjustments.
        </Card>
      </div>

      <section className="bg-[#1a1a1a] rounded-lg p-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-3xl font-bold mb-2">Transform Your Practice Today</h3>
          <p className="text-gray-400">Discover how Vitalos Diagnostics can elevate clinical insights and outcomes.</p>
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
      </section>
    </section>
  </main>
);

export default SolutionsPage;
