"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full h-full flex box-border bg-[#111111]">
      <div className="flex flex-col flex-1 bg-[#000000]">
        <header className="w-full mb-6">
          <h1 className="text-3xl font-bold pl-10 pt-10 text-white">
            Infrastructure Dashboard
          </h1>
        </header>

        <main className="w-full flex-1 pt-0">{children}</main>
      </div>
    </div>
  );
}