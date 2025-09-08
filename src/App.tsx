import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { Page } from "./types";

// Pages
import HomePage from "./pages/Home";
import SolutionsPage from "./pages/Solutions";
import AboutUsPage from "./pages/About";
import HistoryPage from "./pages/History";
import TechnologyPage from "./pages/Technology";
import TeamPage from "./pages/Team";
import CareersPage from "./pages/Careers";
import CulturePage from "./pages/Culture";
import SpecialtyPage from "./pages/Specialty";
import ResourcesPage from "./pages/Resources";
import BlogPage from "./pages/Blog";
import ResearchPage from "./pages/Research";
import CaseStudiesPage from "./pages/CaseStudies";
import ContactPage from "./pages/Contact";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <>
      <style>{`html, body, #root { height: 100%; margin: 0; }`}</style>
      <div className="min-h-screen bg-black text-white font-inter">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage(currentPage, setCurrentPage)}
        <Footer />
      </div>
    </>
  );
};

export default App;

function renderPage(currentPage: Page, setCurrentPage: React.Dispatch<React.SetStateAction<Page>>) {
  const props = { setCurrentPage };
  switch (currentPage) {
    case "solutions": return <SolutionsPage />;
    case "about": return <AboutUsPage />;
    case "history": return <HistoryPage />;
    case "technology": return <TechnologyPage />;
    case "team": return <TeamPage />;
    case "careers": return <CareersPage />;
    case "culture": return <CulturePage />;
    case "specialty": return <SpecialtyPage />;
    case "resources": return <ResourcesPage />;
    case "blog": return <BlogPage />;
    case "research": return <ResearchPage />;
    case "case-studies": return <CaseStudiesPage />;
    case "contact": return <ContactPage />;
    default: return <HomePage {...props} />;
  }
}
