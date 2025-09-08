import React from "react";
import SectionHero from "../components/SectionHero";

const TechnologyPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Technology"
  subtitle="Innovative solutions powering our platform"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Proprietary neural networks on diverse, anonymized datasets for mental wellness insights.</p>
      <p>Hybrid cloud, privacy by design, and ethical AI principles at the core.</p>
    </div>
  </main>
);

export default TechnologyPage;
