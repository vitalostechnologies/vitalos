import React from "react";
import SectionHero from "../components/SectionHero";

const CareersPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Careers"
  subtitle="Join our growing team"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Join our mission to revolutionize mental healthcare with AI.</p>
      <p>We offer a dynamic environment with real impact — check our openings.</p>
    </div>
  </main>
);

export default CareersPage;
