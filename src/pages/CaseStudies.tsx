import React from "react";
import SectionHero from "../components/SectionHero";

const CaseStudiesPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Case Studies"
  subtitle="See how we’ve delivered real impact"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Placeholder for Case Studies content.</p>
    </div>
  </main>
);

export default CaseStudiesPage;
