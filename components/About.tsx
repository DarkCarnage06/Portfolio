"use client";

import React from "react";
import { User, Code2, Calendar, Briefcase, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioContent } from "@/data/content";
import StatCounter from "./StatCounter";
import MagneticButton from "./MagneticButton";

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
    <section id="about" className="relative bg-[#090F24] overflow-hidden">
      {/* Top Thin Animated Gradient Line */}
      <div className="h-[1px] w-full animated-gradient-line" />

      {/* Faint Circuit/Neural Background Decoration (5-8% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="neuralNet" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 20 20 L 60 20 M 60 20 L 60 60 M 60 60 L 20 60 M 20 60 L 20 20 M 20 20 L 60 60"
              stroke="#7C6CFF"
              strokeWidth="0.75"
              fill="none"
            />
            <circle cx="20" cy="20" r="2.5" fill="#5B6CFF" />
            <circle cx="60" cy="20" r="2.5" fill="#7C5CFF" />
            <circle cx="60" cy="60" r="2.5" fill="#5B6CFF" />
            <circle cx="20" cy="60" r="2.5" fill="#7C5CFF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neuralNet)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10"
      >
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

            {/* Outlined Button with Magnetic Effect */}
            <MagneticButton href={about.cta.href}>
              <span className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0D1328] border border-[#1E2644] hover:border-[#7C6CFF]/60 hover:bg-[#12193C] transition-all duration-200">
                <span>{about.cta.text}</span>
                <User className="w-4 h-4 text-[#9AA3B8]" />
              </span>
            </MagneticButton>
          </div>

          {/* Right Column: 2x2 Stats Grid with thin cross divider */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 bg-[#0B1026]/70 border border-[#1A2346] rounded-2xl overflow-hidden divide-x divide-y divide-[#1A2346] shadow-xl backdrop-blur-sm">
              {about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 flex flex-col items-start hover:bg-[#0D1534]/60 transition-colors duration-200 group"
                >
                  {/* Gradient Icon Tile */}
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-tr from-[#5B6CFF] to-[#7C5CFF] flex items-center justify-center text-white shadow-glow-btn mb-4 group-hover:scale-105 transition-transform duration-200">
                    {renderIcon(stat.icon)}
                  </div>

                  {/* Value (Counting up from 0) */}
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    <StatCounter value={stat.value} />
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
      </motion.div>

      {/* Bottom Thin Animated Gradient Line */}
      <div className="h-[1px] w-full animated-gradient-line" />
    </section>
  );
};
