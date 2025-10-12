"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "@/components/common/Sidebar";
import PrivateHeader from "@/components/common/PrivateHeader";
import TerraformAccordions from "./terraformAccordion";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchDeployments } from "@/redux/slice/Deployements/deploymentSlice";

const DashboardPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [spaceId, setSpaceId] = useState<string>("");

  const params = useParams(); // Move to top
  const searchParams = useSearchParams(); // Move to top

  const dispatch = useDispatch<AppDispatch>();
  const { list: deployments, loading, error } = useSelector(
    (state: RootState) => state.deployments
  );

  useEffect(() => {
    setIsClient(true);
    let idVal: string | undefined;
    if (Array.isArray(params.id)) {
      idVal = params.id[0];
    } else {
      idVal = params.id;
    }
    setId(idVal);

    setSpaceId(searchParams.get("spaceId") || "");
  }, [params, searchParams]); // Add dependencies

  useEffect(() => {
    if (deployments.length === 0) {
      dispatch(fetchDeployments());
    }
  }, [dispatch, deployments.length]);

  // Find the deployment by ID
  const deployment = deployments.find((d) => d._id === id);

  if (!isClient || !id) return null;
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
              projectId={deployment?.projectId || id || ""}
              spaceId={spaceId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
