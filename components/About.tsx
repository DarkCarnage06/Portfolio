"use client";

import React from "react";
import { User, Code2, Calendar, Briefcase, Trophy } from "lucide-react";
import { portfolioContent } from "@/data/content";

export const About: React.FC = () => {
  const { about } = portfolioContent;

  const renderIcon = (type: string) => {
    const iconClass = "w-5 h-5 text-white";
    switch (type) {
      case "code":
        return <Code2 className={iconClass} strokeWidth={2.2} />;
      case "calendar":
        return <Calendar className={iconClass} strokeWidth={2.2} />;
      case "briefcase":
        return <Briefcase className={iconClass} strokeWidth={2.2} />;
      case "trophy":
        return <Trophy className={iconClass} strokeWidth={2.2} />;
      default:
        return <Code2 className={iconClass} strokeWidth={2.2} />;
    }
  };

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[#090F24] border-y border-[#141C38] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Badge Pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <span>{about.badge}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              {about.heading}
            </h2>

            {/* Paragraph */}
            <p className="text-[#9AA3B8] text-base leading-relaxed mb-8">
              {about.paragraph}
            </p>

            {/* Outlined Button */}
            <a
              href={about.cta.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0D1328] border border-[#1E2644] hover:border-[#7C6CFF]/60 hover:bg-[#12193C] transition-all duration-200 active:scale-95"
            >
              <span>{about.cta.text}</span>
              <User className="w-4 h-4 text-[#9AA3B8]" />
            </a>
          </div>

          {/* Right Column: 2x2 Stats Grid with thin cross divider */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 bg-[#0B1026]/60 border border-[#1A2346] rounded-2xl overflow-hidden divide-x divide-y divide-[#1A2346] shadow-xl">
              {about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 flex flex-col items-start hover:bg-[#0D1534]/50 transition-colors duration-200"
                >
                  {/* Gradient Icon Tile */}
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-tr from-[#5B6CFF] to-[#7C5CFF] flex items-center justify-center text-white shadow-glow-btn mb-4">
                    {renderIcon(stat.icon)}
                  </div>

                  {/* Value */}
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    {stat.value}
                  </span>

                  {/* Label */}
                  <span className="text-xs sm:text-sm text-[#9AA3B8] font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

