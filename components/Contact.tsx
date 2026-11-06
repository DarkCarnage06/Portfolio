"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Quote } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { portfolioContent } from "@/data/content";

export const Contact: React.FC = () => {
  const { contact } = portfolioContent;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#070B1A] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Left CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1B3A] border border-[#2C2F63] text-[#7C6CFF] text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <span>{contact.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
              {contact.heading}
            </h2>

            <p className="text-sm sm:text-base text-[#9AA3B8] leading-relaxed mb-8 max-w-md">
              {contact.paragraph}
            </p>

            <a
              href={contact.cta.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] hover:brightness-110 shadow-glow-btn transition-all duration-200 active:scale-95"
            >
              <span>{contact.cta.text}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Column 2: Quote Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#0D1328] border border-[#1E2644] rounded-xl p-6 relative flex flex-col justify-between shadow-xl h-full">
              {/* Quote Icon Tile */}
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#5B6CFF] to-[#7C5CFF] flex items-center justify-center text-white shadow-glow-btn mb-4">
                <Quote className="w-4 h-4 text-white fill-white" />
              </div>

              {/* Card Quote Content */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-2">
                  {contact.testimonial.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA3B8] leading-relaxed italic">
                  &ldquo;{contact.testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#1E2644]/60">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#1E2644] relative bg-[#1A1B3A]">
                  <Image
                    src={contact.testimonial.avatar}
                    alt={contact.testimonial.authorName}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    {contact.testimonial.authorName}
                  </h4>
                  <p className="text-[11px] text-[#9AA3B8]">
                    {contact.testimonial.authorRole}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Follow Me & Direct Contact */}
          <div className="lg:col-span-3 flex flex-col items-start pt-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#64748B] uppercase mb-4">
              {contact.followLabel}
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://github.com/DarkCarnage06"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0D1328] border border-[#1E2644] flex items-center justify-center text-[#9AA3B8] hover:text-white hover:border-[#7C6CFF] hover:bg-[#12193C] transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <FaGithub size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/atharv-a-0a73a0279"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0D1328] border border-[#1E2644] flex items-center justify-center text-[#9AA3B8] hover:text-white hover:border-[#7C6CFF] hover:bg-[#12193C] transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>

            {/* Email Row */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-[#9AA3B8] hover:text-white transition-colors group mt-2"
            >
              <Mail className="w-4 h-4 text-[#7C6CFF] group-hover:scale-110 transition-transform" />
              <span className="break-all">{contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

