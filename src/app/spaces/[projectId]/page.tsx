'use client';
import Sidebar from '@/components/common/Sidebar';
import PrivateHeader from '@/components/common/PrivateHeader';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { getSpacesByProjectIdThunk } from '@/redux/slice/Projects/SpaceListSlice';
import { Loader } from 'lucide-react';

export default function SpacesPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const id = params.projectId as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { spaces, loading, error } = useSelector((state: RootState) => state.spaceList);

  useEffect(() => {
    if (projectId) {
      dispatch(getSpacesByProjectIdThunk(projectId));
    }
  }, [projectId, dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex flex-col items-center justify-center bg-[#0b0b0b]">
            <Loader className="animate-spin text-white mb-4" size={48} />
            <div className="text-white">Loading spaces...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex items-center justify-center bg-[#0b0b0b]">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="bg-[#0b0b0b] min-h-screen w-full relative px-14 pt-8">
          <h1 className="text-white text-4xl font-bold mb-6">Spaces</h1>
          <div className="flex items-center mb-7 gap-4">
            <input type="text" placeholder="terraform-aws-infrastructure • Main AWS infrastructure with VPC, EC2, and RDS • AWS • us-east-1"
            className="w-full bg-[#09090B] border border-[#27272A] rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none" />
            <Button variant="primary" width="w-45" className="ml-auto">View Deployment</Button>
            <Button variant="extraSetting" width="auto">
            <Cog6ToothIcon className="w-5 h-5 text-white" />
            </Button>
          </div>
          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {spaces.map((space) => (
              <div
                key={space.spaceId}
                className="bg-gradient-to-br from-[#cd9c20]/7 to-black/10 backdrop-blur-md border border-[#232329] rounded-md px-6 py-5 shadow-lg cursor-pointer hover:bg-[#232329]/30 transition"
                onClick={() => router.push(`/terraform-progress/${id}?spaceId=${space.spaceName}`)}
              >
                <div className="flex justify-between items-center pb-2">
                  <div className="text-white text-lg font-semibold">{space.spaceName}</div>
                  <div className="rounded-full w-8 h-8 flex items-center justify-center">
                    {space.status === 'deployed' ? (
                      <CheckCircleIcon className="w-6 h-6 text-[#22C55E]" />
                    ) : (
                      <ClockIcon className="w-6 h-6 text-[#FFD600]" />
                    )}
                  </div>
                </div>
                <div className="text-[#A1A1AA] text-xs pb-3">Managed by {space.userName}</div>
                <div className="flex justify-between w-full p-2 items-center bg-[#111111]">
                  <span className="text-[#FFFFFF] text-xs">{space.status === 'deployed' ? 'Last Run' : 'Not Deployed'}</span>
                  <span className="text-[#9CA3AF] text-xs">
                    {space.lastRun ? new Date(space.lastRun).toLocaleDateString() : 'Never'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
