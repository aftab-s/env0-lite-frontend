"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface Deployment {
  id: string;
  name: string;
  description: string;
  assets: number;
  lastDeployed: string;
  status: "Deployed" | "Failed" | "Pending";
}

const deploymentsData: Deployment[] = [
  {
    id: "1",
    name: "AWS Infrastructure",
    description: "Production deployment",
    assets: 25,
    lastDeployed: "2 hours ago",
    status: "Deployed",
  },
  {
    id: "2",
    name: "Azure Cluster",
    description: "Staging deployment",
    assets: 12,
    lastDeployed: "5 hours ago",
    status: "Pending",
  },
  {
    id: "3",
    name: "GCP Environment",
    description: "Testing deployment",
    assets: 7,
    lastDeployed: "1 day ago",
    status: "Failed",
  },
];

const statusStyles: Record<Deployment["status"], { bg: string; color: string }> = {
  Deployed: { bg: "#00B15C33", color: "#00B15C" },
  Failed: { bg: "#F8717133", color: "#F87171" },
  Pending: { bg: "#F5A62333", color: "#F5A623" },
};

const DeploymentsPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = deploymentsData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full text-white p-6 flex flex-col">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Deployments</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full  border border-[#27272A] rounded-md pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>

      {/* Deployment Cards */}
       <div className="flex flex-col gap-3 overflow-auto bg-transparent">
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-sm">No deployments found.</div>
        ) : (
          filtered.map((item) => {
            const style = statusStyles[item.status];
            return (
              <div
                key={item.id}
                className="flex flex-col border border-[#27272A] rounded-md p-4 hover:bg-[#1F1F23] transition gap-2 bg-[#111111]"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                  <div
                    className="px-2 py-1 rounded-md text-xs font-medium"
                    style={{
                      backgroundColor: style.bg,
                      color: style.color,
                    }}
                  >
                    {item.status}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-400 mt-2 bg-[#000000] p-3 rounded-sm">
                  <div>Assets: {item.assets}</div>
                  <div>Last Deployed: {item.lastDeployed}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DeploymentsPage;
