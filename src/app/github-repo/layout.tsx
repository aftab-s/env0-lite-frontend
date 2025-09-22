"use client";

import { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";
import Sidebar from "@/components/common/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { darkMode } = useDarkMode();
  const bannerText = darkMode ? '#9CA3AF' : '#111111';
  return (
    <div
      className={`w-full flex box-border transition-colors duration-500 min-h-screen ${
        darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]"
      }`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-colors duration-500 p-10 min-h-0 ${
          darkMode ? "bg-[#000000]" : "bg-[#F3F4F6]"
        }`}
      >
        <header className="w-full">
          <h1
            className={`text-3xl font-bold transition-colors duration-500 ${
              darkMode ? "text-[text-[#9CA3AF]']" : "text-black"
            }`}
          >
            Connect Your Github Repository
          </h1>
          {/* Top Banner */}
          <div className="w-full rounded-md mb-8 transition-colors duration-500 mt-4">
            <p className="text-left text-sm" style={{ color: bannerText }}>
              Connect your GitHub account to access your Terraform configurations and start deploying your infrastructure.
            </p>
          </div>
        </header>

        <main className="w-full flex-1 pt-0 min-h-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
