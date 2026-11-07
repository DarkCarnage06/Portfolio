"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, Trash2, Bot, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Atharv built?",
  "What are his skills?",
  "Tell me about his experience",
  "How can I contact him?",
];

// Helper to format simple markdown (bold, links, bullet points)
function renderFormattedText(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lIdx) => {
    // Bullet points
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

    // Process bold and markdown links [text](url)
    const parts = cleanLine.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    const formattedContent = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const linkTextMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkTextMatch) {
          const [, label, url] = linkTextMatch;
          return (
            <a
              key={pIdx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7C6CFF] underline underline-offset-2 hover:text-[#9B8CFF]"
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={lIdx} className="ml-4 list-disc text-sm text-[#9AA3B8] leading-relaxed">
          {formattedContent}
        </li>
      );
    }

    return (
      <p key={lIdx} className="text-sm text-[#9AA3B8] leading-relaxed min-h-[1.2rem]">
        {formattedContent}
      </p>
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Load conversation from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("atharv_portfolio_chat");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("atharv_portfolio_chat", JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle escape to close & focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", content: textToSend },
    ];
    setMessages(newMessages);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            role: "assistant",
            content: errorText || "Unable to retrieve response. Please try again later.",
          },
        ]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Initialize empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "assistant", content: "" },
      ]);
      setIsTyping(false);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        setIsLoading(false);
        return;
      }

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: "assistant",
          content: "Something went wrong while connecting to the assistant. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem("atharv_portfolio_chat");
    } catch {
      // Ignore
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close chat with Atharv's AI" : "Chat with Atharv's AI"}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] text-white shadow-[0_4px_24px_rgba(91,108,255,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Subtle pulse ring */}
          {!isOpen && (
            <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[#7C6CFF] opacity-35" />
          )}

          {isOpen ? (
            <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
          ) : (
            <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Chat Panel Modal / Drawer (Native cursor enabled inside) */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ask Atharv - Portfolio AI Assistant"
          className="native-cursor fixed bottom-24 right-4 z-50 flex h-[560px] max-h-[calc(100vh-120px)] w-[380px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-[#1E2644] bg-[#0D1328]/95 shadow-[0_16px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1E2644] bg-[#0A0F24]/90 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#7C6CFF]/40 bg-[#1A1B3A]">
                <Image
                  src="/images/profile.png"
                  alt="Atharv"
                  width={36}
                  height={36}
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0A0F24] bg-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  Ask about Atharv
                  <Sparkles className="h-3.5 w-3.5 text-[#7C6CFF]" />
                </h3>
                <p className="text-[11px] text-text-muted flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online AI Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="rounded-lg p-1.5 text-text-muted hover:bg-[#1E2644] hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="rounded-lg p-1.5 text-text-muted hover:bg-[#1E2644] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            aria-live="polite"
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1B3A] text-[#7C6CFF] border border-[#2C2F63]">
                  <Bot className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold text-white">Hi! I&apos;m Atharv&apos;s AI Assistant</h4>
                <p className="mt-1 text-xs text-text-muted max-w-[260px]">
                  Ask me anything about Atharv&apos;s projects, machine learning research, skills, or experience.
                </p>

                {/* Suggested Question Chips */}
                <div className="mt-5 flex flex-col gap-2 w-full">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6CFF]/80 text-left">
                    Suggested Questions
                  </span>
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="rounded-xl border border-[#1E2644] bg-[#0A0F24]/80 px-3 py-2 text-left text-xs text-slate-300 hover:border-[#5B6CFF]/60 hover:bg-[#151C3B] hover:text-white transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] text-white rounded-br-none"
                        : "border border-[#1E2644] bg-[#0A0F24] text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    ) : (
                      renderFormattedText(msg.content)
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl border border-[#1E2644] bg-[#0A0F24] px-3.5 py-2.5 text-xs text-text-muted w-fit rounded-bl-none">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7C6CFF]" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7C6CFF]" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7C6CFF]" style={{ animationDelay: "300ms" }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-[#1E2644] bg-[#0A0F24]/90 p-3"
          >
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Atharv..."
                maxLength={500}
                disabled={isLoading}
                className="w-full rounded-xl border border-[#1E2644] bg-[#0D1328] px-3.5 py-2.5 pr-10 text-xs text-white placeholder-text-muted focus:border-[#7C6CFF] focus:outline-none focus:ring-1 focus:ring-[#7C6CFF] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[#5B6CFF] to-[#7C5CFF] text-white transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-text-muted px-1">
              <span>Answers only about Atharv</span>
              <span>{input.length}/500</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
