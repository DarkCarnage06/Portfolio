"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTextCursor, setIsTextCursor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Position refs for zero-lag and smooth lerp
  const mousePos = useRef({ x: -100, y: -100 });
  const discPos = useRef({ x: -100, y: -100 });
  const arrowElRef = useRef<HTMLDivElement | null>(null);
  const discElRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check fine pointer support
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsFinePointer(finePointerQuery.matches);
    setReducedMotion(motionQuery.matches);
    setMounted(true);

    const handlePointerChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    finePointerQuery.addEventListener("change", handlePointerChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      finePointerQuery.removeEventListener("change", handlePointerChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Arrow position updates immediately (zero lag)
      if (arrowElRef.current) {
        arrowElRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovering state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = Boolean(
        target.closest("input:not([type='submit']):not([type='button']), textarea, [contenteditable='true'], .native-cursor")
      );
      setIsTextCursor(isText);

      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], .interactive-card, input[type='submit'], input[type='button'], summary")
      );
      setIsHovering(isInteractive);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);

      if (!reducedMotion && !isTextCursor) {
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 500);
      }
    };

    const onMouseUp = () => setIsMouseDown(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
    };

    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Animation loop for follower disc
    const loop = () => {
      if (reducedMotion) {
        // If reduced motion, snap disc without easing
        discPos.current.x = mousePos.current.x;
        discPos.current.y = mousePos.current.y;
      } else {
        // Lerp ~0.15 for smooth follower
        const dx = mousePos.current.x - discPos.current.x;
        const dy = mousePos.current.y - discPos.current.y;
        discPos.current.x += dx * 0.15;
        discPos.current.y += dy * 0.15;
      }

      if (discElRef.current) {
        // Offset disc by -14px, -14px so at rest it sits nicely behind the arrow shoulder
        discElRef.current.style.transform = `translate3d(${discPos.current.x - 14}px, ${discPos.current.y - 14}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mounted, isFinePointer, isVisible, reducedMotion, isTextCursor]);

  if (!mounted || !isFinePointer) {
    return null;
  }

  // Calculate arrow transformation state
  let arrowTransform = "scale(1) rotate(0deg)";
  if (isMouseDown) {
    arrowTransform = "scale(0.9) rotate(0deg)";
  } else if (isHovering) {
    arrowTransform = "scale(1.05) rotate(6deg)";
  }

  // Calculate disc follower transformation state
  let discScale = "scale(1)";
  let discOpacity = 0.65;
  if (isMouseDown) {
    discScale = "scale(1.25, 0.8)";
    discOpacity = 0.85;
  } else if (isHovering) {
    discScale = "scale(1.6)";
    discOpacity = 0.9;
  }

  return (
    <>
      {/* Hide native cursor on fine pointer, except for text inputs */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          html,
          body,
          a,
          button,
          [role="button"],
          .interactive-card {
            cursor: none !important;
          }
          input,
          textarea,
          [contenteditable="true"],
          .native-cursor,
          .native-cursor * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Trailing Light Blue Disc */}
      <div
        ref={discElRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] will-change-transform"
        style={{
          opacity: isVisible && !isTextCursor ? discOpacity : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{ transform: discScale }}
        >
          <Image
            src="/cursor/disc.svg"
            alt=""
            width={36}
            height={36}
            priority
            className="select-none drop-shadow-[0_0_10px_rgba(91,155,208,0.5)]"
          />
        </div>
      </div>

      {/* Main Arrow Pointer (hotspot at tip 0, 0) */}
      <div
        ref={arrowElRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
        style={{
          opacity: isVisible && !isTextCursor ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          className="origin-top-left transition-transform duration-150 ease-out"
          style={{ transform: arrowTransform }}
        >
          <Image
            src="/cursor/arrow.svg"
            alt=""
            width={40}
            height={40}
            priority
            className="select-none drop-shadow-[0_4px_12px_rgba(6,41,99,0.55)]"
          />
        </div>
      </div>

      {/* Click Ripples */}
      {!reducedMotion &&
        ripples.map((r) => (
          <div
            key={r.id}
            aria-hidden="true"
            className="pointer-events-none fixed z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5B9BD0] animate-cursor-ripple"
            style={{
              left: `${r.x}px`,
              top: `${r.y}px`,
            }}
          />
        ))}
    </>
  );
}
