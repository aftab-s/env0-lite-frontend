"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Search, LayoutGrid, GalleryVertical } from "lucide-react";
import AnimatedLogo from "@/components/Template/logoAnimation";

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
  const [isGallery, setIsGallery] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (deployments.length === 0) dispatch(fetchDeployments());
  }, [dispatch, deployments.length]);

  const filtered = deployments.filter((d) =>
    d.deploymentName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pagedDeployments = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if search/filter changes and current page is out of range
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [search, filtered.length, totalPages, page]);

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full text-white p-6">
      <div className="mb-4"><AnimatedLogo /></div>
      <div>Loading deployments...</div>
    </div>
  );
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="w-full h-full text-white p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Deployments</h1>
        <div className="flex items-center gap-2">
          {/* Pagination controls (hidden in gallery mode) */}
          {!isGallery && (
            <>
              <button
                className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center disabled:opacity-40 hover:border-[#CD9C20] transition"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                {/* Using text chevrons to avoid importing more icons */}
                <span className="text-[#CD9C20]">&#x2039;</span>
              </button>
              <div className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center select-none text-white text-base font-semibold">
                {page}
              </div>
              <button
                className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center disabled:opacity-40 hover:border-[#CD9C20] transition"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <span className="text-[#CD9C20]">&#x203A;</span>
              </button>
            </>
          )}

        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
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
        <button
          className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center hover:border-[#CD9C20] transition"
          onClick={() => setIsGallery(prev => !prev)}
          aria-label="Toggle layout"
          title={isGallery ? 'Switch to grid' : 'Switch to gallery'}
        >
          {isGallery ? (
            <GalleryVertical className="w-5 h-5 text-white" />
          ) : (
            <LayoutGrid className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className={isGallery ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"}>
          {filtered.length === 0 ? (
            <div className="text-gray-400 text-sm">No deployments found.</div>
          ) : (
            (isGallery ? filtered : pagedDeployments).map((d) => {
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
                    <div>Last Deployed: {new Date(d.startedAt).toLocaleString()}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentsPage;
