import React from "react";
import SectionHero from "../components/SectionHero";

const CulturePage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <SectionHero
  title="Culture"
  subtitle="Discover what makes us unique"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Empathy, collaboration, and excellence. We celebrate diversity and continuous learning.</p>
    </div>
  </main>
);

export default CulturePage;
