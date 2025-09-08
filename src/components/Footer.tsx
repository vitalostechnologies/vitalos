import React from "react";
import { Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="bg-black text-gray-300 py-12 px-6 border-t border-gray-800 font-inter">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1">
        <div className="flex items-center space-x-2 mb-4">
          <img src="/vitalos_logo_white.png" alt="Vitalos" className="h-10 w-auto" />
        </div>
        <p className="text-sm">AI that keeps minds well at scale.</p>
        <div className="flex space-x-4 mt-4">
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[#50E3C2]">
            <Twitter />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#50E3C2]">
            <Linkedin />
          </a>
        </div>
      </div>

      <div className="col-span-1">
        <h4 className="font-bold text-white mb-4">Products</h4>
        <ul>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]">Web app</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]">iOS app</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]">Android app</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]">API</a></li>
        </ul>
      </div>

      <div className="col-span-1">
        <h4 className="font-bold text-white mb-4">Company</h4>
        <ul>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]" onClick={(e)=>e.preventDefault()}>About Us</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]" onClick={(e)=>e.preventDefault()}>Careers</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]" onClick={(e)=>e.preventDefault()}>Blog</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]" onClick={(e)=>e.preventDefault()}>Legal documents</a></li>
          <li className="mb-2"><a href="#" className="hover:text-[#50E3C2]" onClick={(e)=>e.preventDefault()}>Press</a></li>
        </ul>
      </div>

      <div className="col-span-1">
        <h4 className="font-bold text-white mb-4">Contact</h4>
        <p className="text-sm">
          
          UK Office
          <br />786 Shoreditch High St
          <br />London, UK E1 6JR
          <br /><br />
          <a href="mailto:hello@vitalos.co.uk" className="hover:text-[#50E3C2]">hello@vitalos.co.uk</a>
        </p>
      </div>
    </div>

    <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
      &copy; {new Date().getFullYear()} Vitalos Technologies. All rights reserved.
    </div>
  </footer>
);

export default Footer;
