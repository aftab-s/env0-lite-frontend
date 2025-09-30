"use client";

import { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";

interface GithubRepoLayoutProps {
  children: ReactNode;
}

export default function GithubRepoLayout({ children }: GithubRepoLayoutProps) {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        darkMode ? "bg-[#111111]" : "bg-[#F3F4F6]"
      }`}
    >
      <main className="w-full max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
