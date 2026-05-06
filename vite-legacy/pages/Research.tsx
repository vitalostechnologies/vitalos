import React from "react";
import SectionHero from "../components/SectionHero";

const ResearchPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Research"
  subtitle="Exploring the future of health and technology"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Placeholder for Research &amp; Publications content.</p>
    </div>
  </main>
);

export default ResearchPage;
