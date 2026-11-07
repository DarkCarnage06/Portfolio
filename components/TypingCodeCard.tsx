"use client";

import React, { useEffect, useState } from "react";

const CODE_LINES = [
  { text: 'const developer = {', indent: 0, color: "text-[#7C6CFF]" },
  { text: '  name: "Atharv",', indent: 1, highlight: '"Atharv"' },
  { text: '  skills: ["Python", "ML", "RAG", "Next.js"],', indent: 1 },
  { text: '  passion: "Building useful AI",', indent: 1, highlight: '"Building useful AI"' },
  { text: "};", indent: 0, color: "text-[#7C6CFF]" },
];

export default function TypingCodeCard() {
  const [visibleLines, setVisibleLines] = useState<number>(1);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 450);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="animate-code-bob rounded-xl border border-[#1E2644] bg-[#0D1328]/95 p-4 shadow-2xl backdrop-blur-md">
      {/* Header bar */}
      <div className="mb-3 flex items-center justify-between border-b border-[#1E2644]/70 pb-2">
        <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
          <span className="text-[#7C6CFF]">&lt;/&gt;</span> Code
        </span>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        </span>
      </div>

      {/* Code contents */}
      <pre className="font-mono text-[12px] leading-relaxed text-text-muted">
        {CODE_LINES.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} className="transition-opacity duration-300">
            {line.indent === 0 ? (
              <span className="text-[#7C6CFF]">{line.text}</span>
            ) : line.text.includes('"Atharv"') ? (
              <>
                <span className="text-slate-400">  name: </span>
                <span className="text-emerald-400">&quot;Atharv&quot;</span>,
              </>
            ) : line.text.includes("skills:") ? (
              <>
                <span className="text-slate-400">  skills: </span>
                <span className="text-[#9AA3B8]">[</span>
                <span className="text-amber-300">&quot;Python&quot;</span>,{" "}
                <span className="text-amber-300">&quot;ML&quot;</span>,{" "}
                <span className="text-amber-300">&quot;RAG&quot;</span>,{" "}
                <span className="text-amber-300">&quot;Next.js&quot;</span>
                <span className="text-[#9AA3B8]">]</span>,
              </>
            ) : line.text.includes("passion:") ? (
              <>
                <span className="text-slate-400">  passion: </span>
                <span className="text-purple-300">&quot;Building useful AI&quot;</span>,
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}
