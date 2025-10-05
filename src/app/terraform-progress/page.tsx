"use client";
import React from "react";
import Sidebar from '@/components/Sidebar/page';
import PrivateHeader from '@/components/PrivateHeader/page';
import TerraformAccordions from "./terraformAccordion";

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      {/* Layout Row: Sidebar + Right Section */}
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="flex flex-col flex-1 h-full">
          {/* Header */}
          <PrivateHeader />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto bg-[#09090B]">
            <TerraformAccordions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
