// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";
import Sidebar from "@/components/Sidebar/page";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { darkMode } = useDarkMode();

  const bgColor = darkMode ? "#000000" : "#F3F4F6"; // outer div background

  return (
    <div
      className="w-full h-full flex box-border transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >

      <main className="w-full flex-1 pt-8 overflow-y-auto scrollbar-custom">
        {children}
      </main>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: ${bgColor}; /* track matches outer div */
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? "#4B5563" : "#9CA3AF"};
          border-radius: 10px;
        }

        /* Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? "#4B5563" : "#9CA3AF"} ${bgColor};
        }
      `}</style>
    </div>
  );
}
