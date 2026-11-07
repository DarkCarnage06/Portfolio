import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
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
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-[#070B1A] text-[#9AA3B8] font-sans antialiased min-h-screen">
        <ScrollProgressBar />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Chatbot />
      </body>
    </html>
  );
}
