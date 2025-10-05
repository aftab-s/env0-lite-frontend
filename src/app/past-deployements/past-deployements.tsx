"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { fetchDeployments } from "@/redux/slice/Deployements/deploymentSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Deployment } from "@/types/deployment.types";

const statusStyles: Record<"Deployed" | "Failed" | "Pending", { bg: string; color: string }> = {
  Deployed: { bg: "#00B15C33", color: "#00B15C" },
  Failed: { bg: "#F8717133", color: "#F87171" },
  Pending: { bg: "#F5A62333", color: "#F5A623" },
};

const DeploymentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { list: deployments, loading, error } = useSelector((state: RootState) => state.deployments);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (deployments.length === 0) dispatch(fetchDeployments());
  }, [dispatch, deployments.length]);

  const filtered = deployments.filter((d) =>
    d.deploymentName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatus = (steps: Deployment["steps"]): "Deployed" | "Failed" | "Pending" => {
    if (!steps || steps.length === 0) return "Pending";
    const latestStep = steps[steps.length - 1];
    if (latestStep.stepStatus === "successful") return "Deployed";
    if (latestStep.stepStatus === "failed") return "Failed";
    return "Pending";
  };

  const handleClick = (id: string) => {
    router.push(`/terraform-progress/${id}`); // navigate to [id] page
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

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
          placeholder="Search deployments"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#27272A] rounded-md pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>

      {/* Deployment Cards */}
      <div className="flex flex-col gap-3 overflow-auto bg-transparent">
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-sm">No deployments found.</div>
        ) : (
          filtered.map((d) => {
            const status = getStatus(d.steps);
            const style = statusStyles[status];

            return (
              <div
                key={d._id}
                onClick={() => handleClick(d._id)}
                className="cursor-pointer flex flex-col border border-[#27272A] rounded-md p-4 hover:bg-[#1F1F23] transition gap-2 bg-[#111111]"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{d.deploymentName}</div>
                    <div className="text-xs text-gray-400">Deployment ID: {d.deploymentId}</div>
                  </div>
                  <div
                    className="px-2 py-1 rounded-md text-xs font-medium"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    {status}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-400 mt-2 bg-[#000000] p-3 rounded-sm">
                  <div>Assets: {d.steps.length}</div>
                  <div>Last Deployed: {new Date(d.startedAt).toLocaleString()}</div>
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
