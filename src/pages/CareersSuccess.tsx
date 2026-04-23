import React from "react";
import SectionHero from "../components/SectionHero";
import type { Page } from "../types";

type CareersSuccessPageProps = {
  onNavigate: (page: Page) => void;
};

const CareersSuccessPage: React.FC<CareersSuccessPageProps> = ({ onNavigate }) => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
      title="Application Received"
      subtitle="Thank you for applying to Vitalos"
      heightClass="h-40 md:h-48"
      greenOpacity={0.25}
    />

    <section className="mx-auto max-w-2xl rounded-3xl bg-[#111] p-8 md:p-10 ring-1 ring-white/10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        We have received your application
      </h2>
      <p className="mt-4 text-gray-400 leading-8">
        Our team will review your submission and reach out if there is a strong fit.
        Thank you for your interest in helping build the future of mental healthcare with AI.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate("careers")}
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
        >
          Back to Careers
        </button>
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
        >
          Return Home
        </button>
      </div>
    </section>
  </main>
);

export default CareersSuccessPage;
