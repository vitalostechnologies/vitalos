import React from "react";
import SectionHero from "../components/SectionHero";

const ResourcesPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12 text-center">
   <SectionHero
  title="About Us"
  subtitle="Learn more about our mission and values"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <p className="text-lg text-gray-400 max-w-3xl mx-auto">Explore AI in mental health, our latest research, and success stories.</p>
  </main>
);

export default ResourcesPage;
