"use client";

import { ReactNode } from "react";

interface GithubRepoLayoutProps {
  children: ReactNode;
}

export default function GithubRepoLayout({ children }: GithubRepoLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#111111]">
      <main className="w-full max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}