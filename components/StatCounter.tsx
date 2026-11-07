"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: string;
  className?: string;
}

export default function StatCounter({ value, className = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract number and suffix (e.g. "5+" -> num=5, suffix="+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [currentNum, setCurrentNum] = useState(0);

  useEffect(() => {
    if (!isInView || targetNum === 0) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * targetNum);
      setCurrentNum(val);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCurrentNum(targetNum);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, targetNum]);

  return (
    <span ref={ref} className={className}>
      {targetNum > 0 ? `${currentNum}${suffix}` : value}
    </span>
  );
}
