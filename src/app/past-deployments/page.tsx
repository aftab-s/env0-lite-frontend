"use client";
import React from "react";
import Sidebar from '@/components/common/Sidebar';
import PrivateHeader from '@/components/common/PrivateHeader';
import DeploymentsPage from "./past-deployements";
import { useSearchParams } from "next/navigation";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("projectId") ?? null;
  return (
    <div className="h-screen w-screen bg-[#000000]">
      {/* Layout Row: Sidebar + Right Section */}
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="flex flex-col flex-1 h-full">
          {/* Header */}
          <PrivateHeader />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <DeploymentsPage projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
