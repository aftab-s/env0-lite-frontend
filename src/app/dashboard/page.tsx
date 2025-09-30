'use client';
import Sidebar from "@/components/Sidebar/page";
import { useDarkMode } from "@/context/DarkModeProvider";
import InfrastructureBanner from "./_newProjectComponent/page";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { darkMode } = useDarkMode();

  return (
      <div className="flex-1 p-10 pt-0 overflow-y-auto box-border">
        <InfrastructureBanner />
      </div>
  );
}
