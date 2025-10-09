'use client';

import Sidebar from "@/components/Sidebar";
import PrivateHeader from "@/components/PrivateHeader/page";
import InfrastructureBanner from "./_newProjectComponent/page";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="w-full">
            {/* Header */}
            <header className="w-full mb-6">
              <h1 className="text-3xl font-bold pl-10 pt-10 text-white">
                Projects
              </h1>
            </header>

            {/* Main Content */}
            <main className="w-full flex-1 pt-0 p-10 box-border">
              <InfrastructureBanner />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}