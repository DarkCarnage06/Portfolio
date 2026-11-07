"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-[#5B6CFF] via-[#7C5CFF] to-[#9B6BFF] shadow-[0_0_10px_rgba(124,92,255,0.7)]"
      style={{ scaleX }}
    />
  );
}
