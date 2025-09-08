import React from "react";
import type { Page } from "../types";
import { BarChart2, Users, Globe, Code, Star } from "lucide-react";
import Hero from "../components/Hero";

type PageProps = { setCurrentPage: React.Dispatch<React.SetStateAction<Page>> };

const HomePage: React.FC<PageProps> = ({ setCurrentPage }) => (
  <main className="pt-20">
    <Hero
      title="AI that keeps minds well at scale."
      subtitle="Vitalos Technologies leverages AI to provide proactive and personalized mental wellness solutions, revolutionizing healthcare with data-driven insights."
      primaryCta={{ label: "Get Started", onClick: () => setCurrentPage("solutions") }}
      // ⬇️ This opens the Demo page in your state router
      secondaryCta={{ label: "Try the Demo", onClick: () => setCurrentPage("demo") }}
    />

    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-400">
            To harness the power of artificial intelligence to create accessible, proactive, and personalized mental health solutions…
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Insights</h3>
            <p className="text-sm text-gray-400">Our AI models analyze vast datasets to provide actionable insights…</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Users className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Empowering Professionals</h3>
            <p className="text-sm text-gray-400">We give clinicians tools to enhance their practice…</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Globe className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Global Accessibility</h3>
            <p className="text-sm text-gray-400">Our platform is designed to be accessible…</p>
          </div>
        </div>

        {/* Optional callout to the demo, keeps it visible below the fold too */}
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

    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Why Vitalos?</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Our commitment to leading AI expertise ensures…</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="group bg-gray-900 rounded-lg p-8 shadow-xl transition-transform hover:-translate-y-2 duration-300">
            <Code className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Algorithmic Excellence</h3>
            <p className="text-sm text-gray-400">Proprietary AI models on diverse clinical datasets…</p>
          </div>
          <div className="group bg-gray-900 rounded-lg p-8 shadow-xl transition-transform hover:-translate-y-2 duration-300">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Scalable Infrastructure</h3>
            <p className="text-sm text-gray-400">Cloud-native platform for millions of users…</p>
          </div>
          <div className="group bg-gray-900 rounded-lg p-8 shadow-xl transition-transform hover:-translate-y-2 duration-300">
            <Star className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Continuous Innovation</h3>
            <p className="text-sm text-gray-400">Constant R&D to stay at the forefront…</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
