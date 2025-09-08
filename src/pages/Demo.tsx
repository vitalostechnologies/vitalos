import React from "react";
import SectionHero from "../components/SectionHero";
import DemoChat from "../components/DemoChat";

const DemoPage: React.FC = () => {
  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Try the Wellness Demo"
        subtitle="A quick, safe preview of the Vitalos conversation experience"
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />
      <DemoChat />
    </main>
  );
};

export default DemoPage;
