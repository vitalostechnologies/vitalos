import React from "react";
import SectionHero from "../components/SectionHero";

const TeamPage: React.FC = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
   <SectionHero
  title="Team"
  subtitle="Meet the people driving our vision"
  heightClass="h-40 md:h-48"
  greenOpacity={0.25}
/>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Diverse experts across AI, data science, clinical psychology, and public health.</p>
      <p>We value open communication, creativity, and deep understanding of human needs.</p>
    </div>
  </main>
);

export default TeamPage;
