import React, { useState } from "react";
import { Compass, MessageCircle, BarChart2, Users, Code, Globe, Star } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero"; // at top with other imports

import type { Page } from "./types";

type PageProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: Page) => setCurrentPage(page);

  return (
    <>
      <style>{`
        html, body, #root { height: 100%; margin: 0; }
        /* Gradient-only backdrop for perf */
      `}</style>

      <div className="min-h-screen bg-black text-white font-inter">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        {renderPage(currentPage, setCurrentPage)}
        <Footer />
      </div>
    </>
  );
};

export default App;

/* ---------- Page Router ---------- */
function renderPage(currentPage: Page, setCurrentPage: React.Dispatch<React.SetStateAction<Page>>): React.ReactNode {
  const props = { setCurrentPage };
  switch (currentPage) {
    case "solutions":
      return <SolutionsPage {...props} />;
    case "about":
      return <AboutUsPage {...props} />;
    case "history":
      return <HistoryPage {...props} />;
    case "technology":
      return <TechnologyPage {...props} />;
    case "team":
      return <TeamPage {...props} />;
    case "careers":
      return <CareersPage {...props} />;
    case "culture":
      return <CulturePage {...props} />;
    case "specialty":
      return <SpecialtyPage {...props} />;
    case "resources":
      return <ResourcesPage {...props} />;
    case "blog":
      return <BlogPage {...props} />;
    case "research":
      return <ResearchPage {...props} />;
    case "case-studies":
      return <CaseStudiesPage {...props} />;
    case "contact":
      return <ContactPage {...props} />;
    default:
      return <HomePage {...props} />;
  }
}

/* ---------- Pages ---------- */

const HomePage: React.FC<PageProps> = ({ setCurrentPage }) => (
  <main className="pt-20">
    
    <Hero
      title="AI that keeps minds well at scale."
      subtitle="Vitalos Technologies leverages AI to provide proactive and personalized mental wellness solutions, revolutionizing healthcare with data-driven insights."
      primaryCta={{ label: "Get Started", onClick: () => setCurrentPage("solutions") }}
      secondaryCta={{ label: "Explore Our Solutions", onClick: () => setCurrentPage("solutions") }}
    />

    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-400">
            To harness the power of artificial intelligence to create accessible, proactive, and personalized mental health solutions
            that improve lives on a global scale. We are committed to revolutionizing how we understand, prevent, and treat mental
            health challenges by empowering both individuals and healthcare providers with cutting-edge technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Insights</h3>
            <p className="text-sm text-gray-400">Our AI models analyze vast datasets to provide actionable insights for personalized care and treatment.</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Users className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Empowering Professionals</h3>
            <p className="text-sm text-gray-400">We give clinicians tools to enhance their practice, from predictive analytics to automated administrative tasks.</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Globe className="h-12 w-12 text-[#50E3C2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Global Accessibility</h3>
            <p className="text-sm text-gray-400">Our platform is designed to be accessible, breaking down barriers to quality mental health support worldwide.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Why Vitalos?</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Our commitment to leading AI expertise ensures best-in-class performance and a tangible impact on mental healthcare.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="group relative bg-gray-900 rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Code className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Algorithmic Excellence</h3>
            <p className="text-sm text-gray-400">We develop proprietary AI models trained on diverse clinical datasets for unparalleled accuracy and reliability.</p>
          </div>
          <div className="group relative bg-gray-900 rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <BarChart2 className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Scalable Infrastructure</h3>
            <p className="text-sm text-gray-400">Our platform is built on a robust, cloud-native infrastructure that can handle millions of users without sacrificing performance.</p>
          </div>
          <div className="group relative bg-gray-900 rounded-lg p-8 shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
            <Star className="h-12 w-12 text-[#50E3C2] mx-auto mb-4 transition-colors duration-300 group-hover:text-white" />
            <h3 className="text-xl font-semibold text-white mb-2">Continuous Innovation</h3>
            <p className="text-sm text-gray-400">We are constantly researching and developing new features to stay at the forefront of AI-powered healthcare.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const SolutionsPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <section className="text-center mb-12">
      <h1 className="text-5xl font-bold text-white mb-4">Vitalos Diagnostics: AI-Powered Insights for Mental Wellness</h1>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        Harness the power of machine learning and large-scale data analysis to gain unprecedented clarity into patient well-being,
        enabling proactive and personalized care.
      </p>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <Card icon={<Compass className="h-8 w-8 text-black" />} title="Predictive Analytics">
        Our models analyze patient data to identify individuals at risk of declining mental health before a crisis occurs. This enables proactive intervention and support.
      </Card>
      <Card icon={<MessageCircle className="h-8 w-8 text-black" />} title="Natural Language Processing">
        We process unstructured data from clinical notes and patient interactions to identify patterns and sentiment, providing a deeper understanding of emotional state.
      </Card>
      <Card icon={<BarChart2 className="h-8 w-8 text-black" />} title="Personalized Treatment Plans">
        Our system generates personalized recommendations for treatment strategies, including therapy types, medication, and lifestyle adjustments, tailored to each patient's unique profile.
      </Card>
    </section>

    <section className="bg-[#1a1a1a] rounded-lg p-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-3xl font-bold mb-2">Transform Your Practice Today</h2>
        <p className="text-gray-400">Discover how Vitalos Diagnostics can elevate your clinical insights and improve patient outcomes.</p>
      </div>
      <div className="md:w-1/3 flex justify-center md:justify-end">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="px-8 py-3 bg-[#50E3C2] text-black font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#50E3C2]/40"
        >
          Request a Demo
        </a>
      </div>
    </section>
  </main>
);

const AboutUsPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12 text-center">
    <h1 className="text-5xl font-bold mb-4">About Us</h1>
    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
      Vitalos Technologies is a privately held company dedicated to using artificial intelligence to solve some of the world's most pressing mental health challenges.
    </p>
  </main>
);

const HistoryPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Our History</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Founded in 2024, Vitalos Technologies began with a small team of AI researchers and clinicians who shared a common vision: to bridge the gap between technology and mental healthcare.</p>
      <p>From our humble beginnings, we have grown into a multidisciplinary team of engineers, data scientists, and healthcare professionals dedicated to building a platform that is not only powerful but also ethical and compassionate.</p>
    </div>
  </main>
);

const TechnologyPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Our Technology</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Our technology stack is built on cutting-edge AI and machine learning. We utilize proprietary neural networks trained on diverse and anonymized datasets to provide deep insights into mental wellness.</p>
      <p>The Vitalos platform uses a hybrid cloud infrastructure for scalability and data security, complying with major healthcare privacy regulations, and designed with ethical AI principles at its core.</p>
    </div>
  </main>
);

const TeamPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Our Team</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Vitalos Technologies is powered by a diverse team of experts from AI, data science, clinical psychology, and public health.</p>
      <p>We believe the best solutions are born from a mix of technical expertise, creative problem-solving, and a deep understanding of human needs.</p>
    </div>
  </main>
);

const CareersPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Careers at Vitalos</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Join our mission to revolutionize mental healthcare with AI. We’re always looking for passionate, talented people.</p>
      <p>Check our job listings for current opportunities in engineering, research, product management, and more.</p>
    </div>
  </main>
);

const CulturePage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Our Culture</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Our culture is built on empathy, collaboration, and a relentless pursuit of excellence.</p>
      <p>We foster open communication, continuous learning, and mutual respect, celebrating diversity for better outcomes.</p>
    </div>
  </main>
);

const SpecialtyPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Our Specialty: AI-Powered Emotional and Cognitive Sensing</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>We analyze linguistic patterns and biometric indicators to infer emotional and cognitive state, enabling proactive, personalized wellness support.</p>
      <p>We continuously evaluate fairness, drift, and clinical safety via human-in-the-loop reviews and post-deployment monitoring.</p>
    </div>
  </main>
);

const ResourcesPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12 text-center">
    <h1 className="text-5xl font-bold mb-4">Resources</h1>
    <p className="text-lg text-gray-400 max-w-3xl mx-auto">Explore our content to learn more about AI in mental health, our latest research, and success stories.</p>
  </main>
);

const BlogPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-12">Our Blog</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard title="The Future of AI in Mental Health" date="October 26, 2024">
        Exploring how artificial intelligence is shaping the next generation of mental wellness tools and therapies.
      </BlogCard>
      <BlogCard title="Personalizing Therapy with Machine Learning" date="September 15, 2024">
        How our platform tailors treatment plans to individual patient needs.
      </BlogCard>
      <BlogCard title="Building Trust in AI Healthcare" date="August 20, 2024">
        Our ethical approach to data privacy and patient security is at the heart of everything we do.
      </BlogCard>
    </div>
  </main>
);

const ResearchPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Research &amp; Publications</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Placeholder for Research &amp; Publications content.</p>
    </div>
  </main>
);

const CaseStudiesPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Case Studies</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Placeholder for Case Studies content.</p>
    </div>
  </main>
);

const ContactPage: React.FC<PageProps> = () => (
  <main className="pt-20 container mx-auto px-6 py-12">
    <h1 className="text-5xl font-bold text-center mb-8">Contact Us</h1>
    <div className="prose prose-invert text-gray-400 mx-auto max-w-2xl">
      <p>Placeholder for Contact Form or contact details.</p>
    </div>
  </main>
);

/* ---------- Small UI helpers ---------- */

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-xl">
      <div className="flex items-center justify-center h-16 w-16 bg-[#50E3C2] rounded-full mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{children}</p>
    </div>
  );
}

function BlogCard({ title, date, children }: { title: string; date: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-xl">
      <h3 className="text-xl font-bold text-[#50E3C2] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{children}</p>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
  );
}
