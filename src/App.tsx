// src/App.tsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader"; // 👈 overlay spinner
import type { Page } from "./types";

// Pages
import HomePage from "./pages/Home";
import SolutionsPage from "./pages/Solutions";
import AboutPage from "./pages/About";
import HistoryPage from "./pages/History";
import TechnologyPage from "./pages/Technology";
import TeamPage from "./pages/Team";
import CareersPage from "./pages/Careers";
import CulturePage from "./pages/Culture";
import SpecialtyPage from "./pages/Specialty";
import ResourcesPage from "./pages/Resources";
import BlogPage from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ResearchPage from "./pages/Research";
import CaseStudiesPage from "./pages/CaseStudies";
import ContactPage from "./pages/Contact";
import DemoPage from "./pages/Demo";
import InvestorsPage from "./pages/Investors";

// --- Simple path <-> page mapping (SPA with real URLs) ---
const pathToPage = (path: string): Page => {
  switch (path) {
    case "/solutions": return "solutions";
    case "/about": return "about";
    case "/history": return "history";
    case "/technology": return "technology";
    case "/team": return "team";
    case "/careers": return "careers";
    case "/culture": return "culture";
    case "/specialty": return "specialty";
    case "/resources": return "resources";
    case "/blog": return "blog";
    case "/research": return "research";
    case "/case-studies": return "case-studies";
    case "/contact": return "contact";
    case "/demo": return "demo";
    case "/investor": return "investors";
    default: return "home";
  }
};

const pageToPath = (p: Page): string => {
  switch (p) {
    case "solutions": return "/solutions";
    case "about": return "/about";
    case "history": return "/history";
    case "technology": return "/technology";
    case "team": return "/team";
    case "careers": return "/careers";
    case "culture": return "/culture";
    case "specialty": return "/specialty";
    case "resources": return "/resources";
    case "blog": return "/blog";
    case "research": return "/research";
    case "case-studies": return "/case-studies";
    case "contact": return "/contact";
    case "demo": return "/demo";
    case "investors": return "/investor";
    case "blog-post": return "/blog"; // keep posts under /blog for now
    default: return "/";
  }
};

const App: React.FC = () => {
  // Initial page from URL (supports refresh / deep-link)
  const [currentPage, setCurrentPage] = useState<Page>(() => pathToPage(window.location.pathname));
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // First mount: small preloader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // Keep URL in sync + scroll to top + brief loader on navigation
  useEffect(() => {
    const nextPath = pageToPath(currentPage);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: currentPage }, "", nextPath);
    }
    // Preloader flash + scroll reset
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [currentPage]);

  // Back/Forward support
  useEffect(() => {
    const onPop = () => {
      setCurrentPage(pathToPage(window.location.pathname));
      setSelectedPostSlug(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const renderPage = (): React.ReactNode => {
    switch (currentPage) {
      case "solutions": return <SolutionsPage />;
      case "about": return <AboutPage />;
      case "history": return <HistoryPage />;
      case "technology": return <TechnologyPage />;
      case "team": return <TeamPage />;
      case "careers": return <CareersPage />;
      case "culture": return <CulturePage />;
      case "specialty": return <SpecialtyPage />;
      case "resources": return <ResourcesPage />;
      case "blog":
        return (
          <BlogPage
            onOpenPost={(slug) => {
              setSelectedPostSlug(slug);
              setCurrentPage("blog-post");
            }}
          />
        );
      case "blog-post":
        return (
          <BlogPost
            slug={selectedPostSlug}
            onBack={() => setCurrentPage("blog")}
            onNavigate={(nextSlug) => setSelectedPostSlug(nextSlug)}
          />
        );
      case "research": return <ResearchPage />;
      case "case-studies": return <CaseStudiesPage />;
      case "contact": return <ContactPage />;
      case "demo": return <DemoPage />;
      case "investors": return <InvestorsPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Preloader visible={loading} />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default App;
