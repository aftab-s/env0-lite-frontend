'use client';
import Sidebar from "@/components/common/Sidebar";
import { useDarkMode } from "@/context/DarkModeProvider";
import InfrastructureBanner from "./_newProjectComponent/page";

export default function DashboardPage() {
  const { darkMode } = useDarkMode();

  const bgColor = darkMode ? "#000000" : "#F3F4F6"; // dark black / light gray

  return (
      <div className="flex-1 p-10 pt-0 overflow-y-auto box-border">
        <InfrastructureBanner />
      </div>
  );
}
