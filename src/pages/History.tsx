import React from "react";
import SectionHero from "../components/SectionHero";

const HistoryPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
   <SectionHero
  title="History"
  subtitle="Our journey so far"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Founded in 2024, Vitalos began with a small team of AI researchers and clinicians…</p>
      <p>We’ve grown into a multidisciplinary team building ethical, compassionate technology.</p>
    </div>
  </main>
);

export default HistoryPage;
