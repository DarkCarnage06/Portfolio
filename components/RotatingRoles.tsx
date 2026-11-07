"use client";

import React, { useEffect, useState } from "react";

const ROLES = [
  "AI/ML Developer",
  "RAG Systems Builder",
  "Computer Vision Enthusiast",
  "Full-Stack Builder",
];

export default function RotatingRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        // Typing
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        // Pause at full word
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        // Erasing
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        // Move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center text-sm font-medium tracking-wide text-[#7C6CFF]">
      <span>{displayText}</span>
      <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-[#7C6CFF]" />
    </span>
  );
}
