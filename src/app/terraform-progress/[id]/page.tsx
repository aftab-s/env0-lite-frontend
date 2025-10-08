"use client";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "@/components/Sidebar/page";
import PrivateHeader from "@/components/PrivateHeader/page";
import TerraformAccordions from "./terraformAccordion";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchDeployments } from "@/redux/slice/Deployements/deploymentSlice";

const DashboardPage: React.FC = () => {
  const params = useParams();
  let id: string | undefined;
  if (Array.isArray(params.id)) {
    id = params.id[0];
  } else {
    id = params.id;
  }

  const dispatch = useDispatch<AppDispatch>();
  const { list: deployments, loading, error } = useSelector(
    (state: RootState) => state.deployments
  );

  useEffect(() => {
    if (deployments.length === 0) {
      dispatch(fetchDeployments());
    }
  }, [dispatch, deployments.length]);

  // Find the deployment by ID
  const deployment = deployments.find((d) => d._id === id);
  const searchParams = useSearchParams();
  const spaceId = searchParams.get("spaceId") || "";
  console.log({ id, spaceId });

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

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
            <TerraformAccordions
              deployment={deployment ?? null}
              projectId={id}
              spaceId={spaceId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
