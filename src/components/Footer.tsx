import React from "react";
import { Twitter, Linkedin } from "lucide-react";
import type { Page } from "../types";

type FooterProps = {
  onNavigate: (page: Page) => void;
  currentPage?: Page;
};

const Footer: React.FC<FooterProps> = ({ onNavigate, currentPage }) => (
  <footer className="bg-black text-gray-300 py-12 px-6 border-t border-gray-800 font-inter">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Logo + tagline */}
      <div className="col-span-1">
        <div className="flex items-center space-x-2 mb-4">
          <img src="/vitalos_logo_white.png" alt="Vitalos" className="h-10 w-auto" />
        </div>
        <p className="text-sm">AI that keeps minds well at scale.</p>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://twitter.com/vitalos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-400 hover:text-[#50E3C2]"
          >
            <Twitter />
          </a>
          <a
            href="https://linkedin.com/company/vitalos-technologies"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-[#50E3C2]"
          >
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Solutions */}
      <FooterCol title="Solutions">
        <FooterBtn onClick={() => onNavigate("solutions")} active={currentPage === "solutions"}>
          Overview
        </FooterBtn>
        <FooterBtn onClick={() => onNavigate("solutions")} active={currentPage === "solutions"}>
          Get Started
        </FooterBtn>
      </FooterCol>

      {/* About Us */}
      <FooterCol title="About Us">
        <FooterBtn onClick={() => onNavigate("history")} active={currentPage === "history"}>History</FooterBtn>
        <FooterBtn onClick={() => onNavigate("technology")} active={currentPage === "technology"}>Technology</FooterBtn>
        <FooterBtn onClick={() => onNavigate("team")} active={currentPage === "team"}>Team</FooterBtn>
        <FooterBtn onClick={() => onNavigate("careers")} active={currentPage === "careers"}>Careers</FooterBtn>
        <FooterBtn onClick={() => onNavigate("culture")} active={currentPage === "culture"}>Culture</FooterBtn>
        <FooterBtn onClick={() => onNavigate("specialty")} active={currentPage === "specialty"}>Specialty</FooterBtn>
      </FooterCol>

      {/* Resources */}
      <FooterCol title="Resources">
        <FooterBtn onClick={() => onNavigate("blog")} active={currentPage === "blog"}>Blog</FooterBtn>
        <FooterBtn onClick={() => onNavigate("research")} active={currentPage === "research"}>Research &amp; Publications</FooterBtn>
        <FooterBtn onClick={() => onNavigate("case-studies")} active={currentPage === "case-studies"}>Case Studies</FooterBtn>
      </FooterCol>

      {/* Contact */}
      <div className="col-span-1">
        <h4 className="font-bold text-white mb-4">Contact</h4>
        <p className="text-sm">
          UK Office
          Suite 6570, Unit 3A
          <br />34-35 Hatton Garden
          <br />London, EC1N 8DX
          <br /> 02034323640
          
          
          <br /><a href="mailto:hello@vitalos.co.uk" className="hover:text-[#50E3C2]">
            hello@vitalos.co.uk
          </a>
        </p>
      </div>
    </div>

    <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
      &copy; {new Date().getFullYear()} Vitalos Technologies. All rights reserved.
    </div>
  </footer>
);

export default Footer;

/* — Helpers — */
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col-span-1">
      <h4 className="font-bold text-white mb-4">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterBtn({
  onClick,
  children,
  active,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`text-left transition-colors ${
          active ? "text-[#50E3C2]" : "hover:text-[#50E3C2] text-gray-300"
        }`}
      >
        {children}
      </button>
    </li>
  );
}
