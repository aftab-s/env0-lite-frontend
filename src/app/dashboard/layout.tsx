// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";
import Sidebar from "@/components/common/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`w-full flex box-border transition-colors duration-500 ${
        darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]"
      }`}
    >
        <Sidebar />
        <div className={`flex flex-col flex-1 ${darkMode ? "bg-[#000000]" : "bg-[#F3F4F6]"} transition-colors duration-500`}>
            <header className="w-full mb-6">
                <h1
                className={`text-3xl font-bold transition-colors duration-500 pl-10 pt-10 ${
                    darkMode ? "text-white" : "text-gray-900"
                }`}
                >
                Infrastructure Dashboard
                </h1>
            </header>

        <main className="w-full flex-1 pt-0">{children}</main>
        </div>
    </div>
  );
}
