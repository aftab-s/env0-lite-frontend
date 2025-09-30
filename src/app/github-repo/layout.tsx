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

  return (
    <div
      className={`w-full h-full flex box-border transition-colors duration-500 ${
        darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]"
      }`}
    >

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-colors duration-500 p-10 ${
          darkMode ? "bg-[#000000]" : "bg-[#F3F4F6]"
        }`}
      >
        <header className="w-full mb-3">
          <h1
            className={`text-3xl font-bold transition-colors duration-500 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Connect Your Github Repository
          </h1>
        </header>

        <main className="w-full flex-1 pt-0">{children}</main>
      </div>
    </div>
  );
}
