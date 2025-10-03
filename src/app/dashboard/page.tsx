'use client';
import Sidebar from "@/components/Sidebar/page";
import InfrastructureBanner from "./_newProjectComponent/page";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-10 pt-0 overflow-y-auto box-border bg-[#111111]">
      <InfrastructureBanner />
    </div>
  );
}