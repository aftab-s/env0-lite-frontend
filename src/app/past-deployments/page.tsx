"use client";
import React from "react";
import Sidebar from '@/components/Sidebar';
import PrivateHeader from '@/components/PrivateHeader/page';
import DeploymentsPage from "./past-deployements";

const DashboardPage: React.FC = () => {
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
            <DeploymentsPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
