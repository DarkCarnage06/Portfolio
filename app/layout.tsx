import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import "./editorial.css";
import Chatbot from "@/components/Chatbot";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Atharv Randive | AI/ML Developer",
  description:
    "Developer portfolio of Atharv Randive - B.Tech student in AI and ML building machine learning, RAG and computer vision systems.",
  keywords: [
    "Atharv Randive",
    "AI Developer",
    "ML Engineer",
    "Machine Learning",
    "RAG",
    "Full Stack",
    "Portfolio",
  ],
  authors: [{ name: "Atharv Randive" }],
  openGraph: {
    title: "Atharv Randive | AI/ML Developer",
    description: "I build AI that people can use.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${display.variable}`}>
      <body className="bg-[#070B1A] text-[#9AA3B8] font-sans antialiased min-h-screen">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
