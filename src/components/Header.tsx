import React, { useState } from "react";
import type { Page } from "../types";
import { ChevronDown } from "lucide-react";

type HeaderProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

const ITEM_CLASS = "inline-flex items-center h-10 leading-none"; // keeps everything on the same baseline

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  // Desktop dropdowns
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  // Mobile nav + accordions
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // Close-delay timers
  const aboutCloseTimer = React.useRef<number | null>(null);
  const resourcesCloseTimer = React.useRef<number | null>(null);

  const openAbout = () => {
    if (aboutCloseTimer.current) window.clearTimeout(aboutCloseTimer.current);
    setIsAboutDropdownOpen(true);
  };
  const closeAbout = () => {
    aboutCloseTimer.current = window.setTimeout(() => setIsAboutDropdownOpen(false), 120);
  };
  const openResources = () => {
    if (resourcesCloseTimer.current) window.clearTimeout(resourcesCloseTimer.current);
    setIsResourcesDropdownOpen(true);
  };
  const closeResources = () => {
    resourcesCloseTimer.current = window.setTimeout(() => setIsResourcesDropdownOpen(false), 120);
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsAboutDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileResourcesOpen(false);
  };

  const NavLink: React.FC<{ page: Page; children: React.ReactNode; className?: string }> = ({
    page,
    children,
    className = "",
  }) => {
    const active = currentPage === page;
    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); handleNavClick(page); }}
        className={`${ITEM_CLASS} font-medium transition-colors duration-300 ${active ? "text-[#50E3C2]" : "text-white hover:text-[#50E3C2]"} ${className}`}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </a>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            aria-label="Go to Home"
            className={`${ITEM_CLASS}`}
          >
            <img src="/vitalos_logo_white.png" alt="Vitalos" className="h-10 w-auto" />
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink page="solutions">Solutions</NavLink>

          {/* About dropdown */}
          <div className="relative" onMouseEnter={openAbout} onMouseLeave={closeAbout}>
            <button
              className={`${ITEM_CLASS} gap-1 px-2 text-white hover:text-[#50E3C2] font-medium`}
              onClick={() => (isAboutDropdownOpen ? closeAbout() : openAbout())}
              aria-haspopup="menu"
              aria-expanded={isAboutDropdownOpen}
            >
              About Us
              <ChevronDown size={16} className={`transition-transform mt-px ${isAboutDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isAboutDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-lg shadow-xl bg-[#111] ring-1 ring-white/10 p-1 backdrop-blur-sm">
                <ul className="py-1 divide-y divide-white/10" role="menu" aria-orientation="vertical">
                  <li><NavItem onClick={() => handleNavClick("history")}>History</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("technology")}>Technology</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("team")}>Team</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("careers")}>Careers</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("culture")}>Culture</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("specialty")}>Specialty</NavItem></li>
                </ul>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="relative" onMouseEnter={openResources} onMouseLeave={closeResources}>
            <button
              className={`${ITEM_CLASS} gap-1 px-2 text-white hover:text-[#50E3C2] font-medium`}
              onClick={() => (isResourcesDropdownOpen ? closeResources() : openResources())}
              aria-haspopup="menu"
              aria-expanded={isResourcesDropdownOpen}
            >
              Resources
              <ChevronDown size={16} className={`transition-transform mt-px ${isResourcesDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isResourcesDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-lg shadow-xl bg-[#111] ring-1 ring-white/10 p-1 backdrop-blur-sm">
                <ul className="py-1 divide-y divide-white/10" role="menu" aria-orientation="vertical">
                  <li><NavItem onClick={() => handleNavClick("blog")}>Blog</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("research")}>Research &amp; Publications</NavItem></li>
                  <li><NavItem onClick={() => handleNavClick("case-studies")}>Case Studies</NavItem></li>
                </ul>
              </div>
            )}
          </div>

          <NavLink page="contact">Contact</NavLink>

          <button
            onClick={() => handleNavClick("solutions")}
            className="inline-flex items-center h-10 px-4 bg-[#50E3C2] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#50E3C2]/40"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`${ITEM_CLASS} text-white focus:outline-none`}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-black/90 backdrop-blur-md">
          <ul className="flex flex-col items-stretch py-4 space-y-2 px-6">
            <li>
              <NavLink className="block py-2" page="solutions">Solutions</NavLink>
            </li>

            {/* Mobile About */}
            <li>
              <button
                className="w-full flex items-center justify-between text-left text-white hover:text-[#50E3C2] py-2"
                onClick={() => setMobileAboutOpen((v) => !v)}
                aria-expanded={mobileAboutOpen}
                aria-controls="mobile-about-submenu"
              >
                <span>About Us</span>
                <ChevronDown size={16} className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <ul id="mobile-about-submenu" className="ml-4 mt-1 space-y-1">
                  <MobileSubItem onClick={() => handleNavClick("history")}>History</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("technology")}>Technology</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("team")}>Team</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("careers")}>Careers</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("culture")}>Culture</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("specialty")}>Specialty</MobileSubItem>
                </ul>
              )}
            </li>

            {/* Mobile Resources */}
            <li>
              <button
                className="w-full flex items-center justify-between text-left text-white hover:text-[#50E3C2] py-2"
                onClick={() => setMobileResourcesOpen((v) => !v)}
                aria-expanded={mobileResourcesOpen}
                aria-controls="mobile-resources-submenu"
              >
                <span>Resources</span>
                <ChevronDown size={16} className={`transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <ul id="mobile-resources-submenu" className="ml-4 mt-1 space-y-1">
                  <MobileSubItem onClick={() => handleNavClick("blog")}>Blog</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("research")}>Research &amp; Publications</MobileSubItem>
                  <MobileSubItem onClick={() => handleNavClick("case-studies")}>Case Studies</MobileSubItem>
                </ul>
              )}
            </li>

            <li>
              <NavLink className="block py-2" page="contact">Contact</NavLink>
            </li>

            <li className="pt-2">
              <button
                onClick={() => handleNavClick("solutions")}
                className="w-full inline-flex items-center h-10 px-4 bg-[#50E3C2] text-black font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

/* Helpers */
function NavItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="block px-4 py-3 text-[15px] leading-6 text-gray-200 hover:bg-white/5 hover:text-[#50E3C2] transition-colors rounded-md"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      role="menuitem"
    >
      {children}
    </a>
  );
}

function MobileSubItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <li>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-300 hover:text-[#50E3C2]"
        onClick={(e) => { e.preventDefault(); onClick(); }}
      >
        {children}
      </a>
    </li>
  );
}
