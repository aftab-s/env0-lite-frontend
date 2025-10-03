"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/page";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const bgColor = "#000000";

  return (
    <div
      className="w-full h-full flex box-border overflow-hidden"
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
          background: #000000;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 10px;
        }

        /* Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #000000;
        }
      `}</style>
    </div>
  );
}