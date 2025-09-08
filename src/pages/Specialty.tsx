import React from "react";
import SectionHero from "../components/SectionHero";

const SpecialtyPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Our Specialty"
  subtitle="AI-Powered Emotional and Cognitive Sensing"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>

    
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>We analyze linguistic and biometric signals to infer emotional and cognitive state.</p>
      <p>We continuously evaluate fairness, drift, and clinical safety with human-in-the-loop reviews.</p>
    </div>
  </main>
);

export default SpecialtyPage;
