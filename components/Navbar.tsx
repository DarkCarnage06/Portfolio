"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Code2 } from "lucide-react";
import { portfolioContent } from "@/data/content";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else if (scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = portfolioContent.navigation.links;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B1A]/90 backdrop-blur-md border-b border-[#141C38] shadow-lg shadow-black/20"
          : "bg-[#070B1A]/80 backdrop-blur-sm border-b border-[#141C38]/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group text-white font-semibold text-lg tracking-tight"
        >
          <span className="text-[#7C6CFF] flex items-center">
            <Code2 className="w-5 h-5 text-[#7C6CFF]" strokeWidth={2.5} />
          </span>
          <span className="text-white group-hover:text-white/90 transition-colors">
            {portfolioContent.navigation.logo}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive =
              activeSection === sectionId ||
              (link.label === "Experience" && activeSection === "about");

            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium transition-colors py-2 ${
                  isActive ? "text-white" : "text-[#9AA3B8] hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href={portfolioContent.navigation.cta.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] hover:brightness-110 shadow-glow-btn transition-all duration-200 active:scale-95"
          >
            <span>{portfolioContent.navigation.cta.text}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={portfolioContent.navigation.cta.href}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF]"
          >
            <span>Hire</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#9AA3B8] hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C6CFF]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F24] border-b border-[#141C38] px-6 py-5 space-y-3">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#7C6CFF] font-semibold" : "text-[#9AA3B8] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

