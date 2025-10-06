'use client';

import Sidebar from '@/components/Sidebar/page'; 
import Button from '@/components/ui/button';
import PrivateHeader from '@/components/PrivateHeader/page';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { getProjectsByOwner } from '@/redux/slice/Projects/projectListByOwnerSlice';
import type { ProjectWithTime } from '@/types/project.types';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeploymentCard {
  name: string;
  branch: string;
  time: string;
  status: string;
  description: string;
}

export default function SpacesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { projects, loading, error } = useSelector((state: RootState) => state.projectList);

  useEffect(() => {
    dispatch(getProjectsByOwner());
  }, [dispatch]);

  const deploymentCards: DeploymentCard[] = projects.map((project: ProjectWithTime) => ({
    name: project.projectName,
    branch: 'main branch', // Default since not in API
    time: project.tillnowtime,
    status: project.steps || 'Unknown', // Use steps from API
    description: project.projectDescription || 'No description',
  }));

  if (loading) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex flex-col items-center justify-center bg-black">
            <Loader className="animate-spin text-white mb-4" size={48} />
            <div className="text-white">Loading projects...</div>
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
          <div className="flex-1 flex items-center justify-center bg-black">
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
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="w-full">
            {/* Header */}
            <header className="w-full p-6 bg-black flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white ">
                Projects
              </h1>
              <Button variant="primary" width='w-45' onClick={() => router.push('/create-project')}>New Project</Button>
            </header>

            {/* Search Bar */}
            <div className="w-full p-6">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-md border border-[#232329] bg-black text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CD9C20]"
              />
            </div>

            {/* Main Content Grid */}
            <main className="w-full p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deploymentCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#cd9c20]/7 to-black/10 backdrop-blur-md border border-[#232329] rounded-md px-6 py-5 shadow-lg cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-medium text-white">{card.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#072a1b] text-[#00b15c] px-3 py-2 rounded-full flex items-center">
                          <span className="w-2 h-2 rounded-full mr-1 bg-[#00b15c]" />
                          <span className="text-xs font-light ml-1">{card.status}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{card.branch}</p>
                    <p className="text-xs text-gray-400">{card.time}</p>
                    <p className="text-xs text-gray-400 mt-2 px-2 py-2 rounded">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}