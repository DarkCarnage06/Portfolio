"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { TechIcon } from "./TechIcon";

export const Hero: React.FC = () => {
  const { personal, hero } = portfolioContent;

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#070B1A]"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7C5CFF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Badge Pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <span>{personal.badge}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] mb-4">
              {personal.heroHeading1}{" "}
              <span className="text-[#7C6CFF]">{personal.name}</span>
              <br />
              <span className="text-white">{personal.heroHeading2}</span>
            </h1>

            {/* Subtitle Bio */}
            <p className="text-[#9AA3B8] text-base md:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              {personal.bio}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] hover:brightness-110 shadow-glow-btn transition-all duration-200 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumeUrl}
                download="Atharv_Randive_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0F24] border border-[#1E2644] hover:border-[#7C6CFF]/60 hover:bg-[#121838] transition-all duration-200 active:scale-95"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 text-[#9AA3B8]" />
              </a>
            </div>

            {/* Technologies Row */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#64748B] uppercase mb-4">
                {hero.technologiesLabel}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {hero.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="w-10 h-10 rounded-lg bg-[#0D1328] border border-[#1E2644] flex items-center justify-center hover:border-[#7C6CFF]/60 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                    title={tech.name}
                  >
                    <TechIcon name={tech.name} size={20} color={tech.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Portrait & Code Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center">
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

              {/* Hand-drawn curved doodle arrow pointing to portrait from bottom-left */}
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

              {/* Floating Code Card at right edge */}
              <div className="absolute -right-4 sm:-right-8 md:-right-10 top-1/2 -translate-y-1/3 z-30 w-[275px] sm:w-[300px] md:w-[320px] bg-[#0A0E23]/95 border border-[#1E2644] rounded-xl shadow-2xl backdrop-blur-md p-4 transition-transform duration-300 hover:scale-[1.02]">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#1E2644]/70">
                  <div className="flex items-center gap-1.5 text-xs text-[#9AA3B8] font-mono">
                    <span className="text-[#7C6CFF] font-semibold">&lt;/&gt;</span>
                    <span>Code</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                </div>

                {/* Syntax-Colored Code Body */}
                <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-[#9AA3B8] overflow-x-hidden select-none whitespace-pre">
                  <code>
                    <span className="text-[#7C6CFF]">const</span>{" "}
                    <span className="text-white">developer</span> = &#123;
                    <br />
                    {"  "}
                    <span className="text-[#93C5FD]">name</span>:{" "}
                    <span className="text-[#FBBF24]">&quot;Atharv&quot;</span>,
                    <br />
                    {"  "}
                    <span className="text-[#93C5FD]">skills</span>: [
                    <span className="text-[#FBBF24]">&quot;Python&quot;</span>,{" "}
                    <span className="text-[#FBBF24]">&quot;ML&quot;</span>,{" "}
                    <span className="text-[#FBBF24]">&quot;RAG&quot;</span>,{" "}
                    <span className="text-[#FBBF24]">&quot;Next.js&quot;</span>],
                    <br />
                    {"  "}
                    <span className="text-[#93C5FD]">passion</span>:{" "}
                    <span className="text-[#FBBF24]">
                      &quot;Building useful AI&quot;
                    </span>
                    ,
                    <br />
                    &#125;;
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
