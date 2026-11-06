import React from "react";
import { portfolioContent } from "@/data/content";

export const Footer: React.FC = () => {
  const { footer } = portfolioContent;

  return (
    <footer className="border-t border-[#141C38] bg-[#070B1A] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
        <div>{footer.copyright}</div>
        <div className="flex items-center gap-1.5">
          <span>Made with</span>
          <span className="text-red-500 text-sm">❤</span>
          <span>by Atharv</span>
        </div>
      </div>
    </footer>
  );
};

