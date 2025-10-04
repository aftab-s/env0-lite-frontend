"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/common/Sidebar";
import { useDarkMode } from "@/context/DarkModeProvider";

interface TerraformAwsLayoutProps {
  children: ReactNode;
}

export default function TerraformAwsLayout({ children }: TerraformAwsLayoutProps) {
  const { darkMode } = useDarkMode();

  const bgColor = darkMode ? "#000000" : "#F3F4F6";

  return (
    <div
      className="w-full flex box-border transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <Sidebar />

      <main className="w-full flex-1 pt-8 overflow-y-auto scrollbar-custom">
        {children}
      </main>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: ${bgColor};
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? "#4B5563" : "#9CA3AF"};
          border-radius: 10px;
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? "#4B5563" : "#9CA3AF"} ${bgColor};
        }
      `}</style>
    </div>
  );
}


