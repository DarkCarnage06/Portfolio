"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioContent } from "@/data/content";
import { TechIcon } from "./TechIcon";

export const Skills: React.FC = () => {
  const { skills } = portfolioContent;
  const [inView, setInView] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#070B1A] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span>{skills.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {skills.heading}
          </h2>
        </div>

        {/* 3-Column x 3-Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {skills.items.map((skill) => (
            <div key={skill.name} className="flex flex-col justify-center">
              {/* Top row: Icon + Name on left, Percentage on right */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <TechIcon name={skill.icon} size={18} color={skill.iconColor} />
                  </div>
                  <span className="text-sm font-medium text-white tracking-wide">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#9AA3B8] font-mono">
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress Bar Track & Fill */}
              <div className="w-full h-[5px] bg-[#141C38] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: inView ? `${skill.percentage}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
