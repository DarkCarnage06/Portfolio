"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioContent } from "@/data/content";
import TiltCard from "./TiltCard";

export const Projects: React.FC = () => {
  const { projects } = portfolioContent;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsPerView, setCardsPerView] = useState<number>(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.items.length - cardsPerView);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50 && currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
    setTouchStart(null);
  };

  return (
    <section
      id="projects"
      className="relative bg-[#090F24] overflow-hidden"
    >
      {/* Top Animated Gradient Line */}
      <div className="h-[1px] w-full animated-gradient-line" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span>{projects.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {projects.heading}
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden py-4">
            <div
              className="flex transition-transform duration-500 ease-out -mx-3"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {projects.items.map((project) => (
                <div
                  key={project.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <TiltCard className="interactive-card rounded-xl border border-[#1E2644] bg-[#0D1328]">
                    <div className="h-full flex flex-col justify-between">
                      {/* Top: Screenshot Area */}
                      <div className="relative w-full h-48 sm:h-52 bg-[#080D1F] overflow-hidden border-b border-[#1E2644]/60">
                        {/* Number in the top-left */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-xs font-mono font-medium text-white/80 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 shadow-sm">
                            {project.id}
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Bottom: Content */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-white group-hover:text-[#7C6CFF] transition-colors mb-2">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#9AA3B8] leading-relaxed line-clamp-2 mb-4">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-end pt-1">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C6CFF] hover:text-[#9485FF] transition-colors group/link"
                          >
                            <span>View Project</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF]"
                  : "w-2 bg-[#1E2644] hover:bg-[#2C355E]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom Animated Gradient Line */}
      <div className="h-[1px] w-full animated-gradient-line" />
    </section>
  );
};
