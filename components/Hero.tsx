"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioContent } from "@/data/content";
import { TechIcon } from "./TechIcon";
import ConstellationBackground from "./ConstellationBackground";
import RotatingRoles from "./RotatingRoles";
import TypingCodeCard from "./TypingCodeCard";
import MagneticButton from "./MagneticButton";

export const Hero: React.FC = () => {
  const { personal, hero } = portfolioContent;

  // Subtle parallax on hero graphics only (not text)
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [canParallax, setCanParallax] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setCanParallax(isFinePointer && !prefersReducedMotion && !isMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canParallax || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setParallax({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Headline words for word-by-word reveal
  const headlineLine1Words = ["Hi,", "I'm", personal.name];
  const headlineLine2Words = personal.heroHeading2.split(" ");

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#070B1A]"
    >
      {/* Subtle Animated Constellation Background */}
      <ConstellationBackground />

      {/* Floating Blurred Gradient Orbs (CSS Keyframes, will-change: transform) */}
      <div
        aria-hidden="true"
        className="animate-float-orb-1 pointer-events-none absolute top-12 left-1/4 h-[420px] w-[420px] rounded-full bg-[#5B6CFF]/12 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="animate-float-orb-2 pointer-events-none absolute top-1/3 right-1/4 h-[480px] w-[480px] rounded-full bg-[#7C5CFF]/15 blur-[160px] -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Staggered Entrance Animation) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* 1. Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-sm"
            >
              <span>{personal.badge}</span>
            </motion.div>

            {/* 2. Headline - Word-by-Word Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] mb-3">
              <span className="inline-block">
                {headlineLine1Words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + i * 0.08,
                      ease: "easeOut",
                    }}
                    className={`inline-block mr-2.5 ${
                      word === personal.name ? "text-[#7C6CFF]" : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-block text-white">
                {headlineLine2Words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.4 + i * 0.06,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-2.5"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Rotating Role Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Specializing in:
              </span>
              <RotatingRoles />
            </motion.div>

            {/* 3. Subtitle Bio */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              className="text-[#9AA3B8] text-base md:text-lg leading-relaxed max-w-xl mb-8 font-normal"
            >
              {personal.bio}
            </motion.p>

            {/* 4. Buttons Row with Magnetic Effect + Shine */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <MagneticButton href="#projects">
                <span className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] hover:brightness-110 shadow-glow-btn transition-all duration-200">
                  <span>View My Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </MagneticButton>

              <MagneticButton
                href={personal.resumeUrl}
                download="Atharv_Randive_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0F24] border border-[#1E2644] hover:border-[#7C6CFF]/60 hover:bg-[#121838] transition-all duration-200">
                  <span>Download CV</span>
                  <Download className="w-4 h-4 text-[#9AA3B8]" />
                </span>
              </MagneticButton>
            </motion.div>

            {/* 5. Technologies Row Popping In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="pt-2"
            >
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#64748B] uppercase mb-4">
                {hero.technologiesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {hero.technologies.map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 1.1 + idx * 0.05,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="w-10 h-10 rounded-lg bg-[#0D1328] border border-[#1E2644] flex items-center justify-center hover:border-[#7C6CFF]/60 hover:-translate-y-1 transition-all duration-200 shadow-sm"
                    title={tech.name}
                  >
                    <TechIcon name={tech.name} size={20} color={tech.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Portrait & Code Card with Graphics Parallax */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              animate={{
                x: parallax.x,
                y: parallax.y,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center"
            >
              {/* Dotted Grid Pattern (Top-right) */}
              <div className="absolute top-2 -right-2 md:top-4 md:right-0 z-0 pointer-events-none opacity-50">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {[0, 18, 36, 54, 70].map((x) =>
                    [0, 18, 36, 54, 70].map((y) => (
                      <circle key={`${x}-${y}`} cx={x + 1} cy={y + 1} r="1.5" fill="#4B5578" />
                    ))
                  )}
                </svg>
              </div>

              {/* Glowing Purple Gradient Circle */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-tr from-[#5848F6] via-[#754BF7] to-[#A25CF8] shadow-[0_0_80px_rgba(124,92,255,0.45)] flex items-end justify-center overflow-hidden z-10">
                {/* Developer Portrait */}
                <div className="relative w-full h-full flex items-end justify-center">
                  <Image
                    src={personal.avatar}
                    alt={personal.fullName}
                    width={480}
                    height={540}
                    priority
                    className="w-[96%] h-auto object-cover object-bottom select-none pointer-events-none drop-shadow-2xl translate-y-1"
                  />
                </div>
              </div>

              {/* Hand-drawn curved doodle arrow */}
              <div className="absolute bottom-6 -left-4 sm:bottom-8 sm:-left-6 md:bottom-10 md:-left-8 z-20 pointer-events-none text-white/50">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <path
                    d="M 10 48 C 14 36, 20 22, 44 20"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 36 14 L 45 20 L 37 27"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Floating Typing Code Card at right edge */}
              <div className="absolute -right-4 sm:-right-8 md:-right-10 top-1/2 -translate-y-1/3 z-30 w-[275px] sm:w-[300px] md:w-[320px]">
                <TypingCodeCard />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
