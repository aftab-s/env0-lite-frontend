'use client';

import Sidebar from '@/components/Sidebar'; 
import Button from '@/components/ui/button';
import PrivateHeader from '@/components/PrivateHeader/page';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { getProjectsByOwner } from '@/redux/slice/Projects/projectListByOwnerSlice';
import type { ProjectWithTime } from '@/types/project.types';
import { Loader } from 'lucide-react';
import AnimatedLogo from '@/components/logoAnimation';
import { useRouter } from 'next/navigation';
import { Trash2, X } from 'lucide-react';

interface DeploymentCard {
  name: string;
  branch: string;
  time: string;
  status: string;
  description: string;
  project: ProjectWithTime;
}

export default function ProjectsPage() {
  // Search state
  const [search, setSearch] = useState('');
  // Delete mode state
  const [deleteMode, setDeleteMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { projects, loading, error } = useSelector((state: RootState) => state.projectList);

  useEffect(() => {
    dispatch(getProjectsByOwner());
  }, [dispatch]);

  const handleCardClick = (card: DeploymentCard) => {
    const project = card.project;
    if (project.csp && project.profile && project.repoUrl) {
      // Github connected
      router.push(`/spaces/${project.projectId}`);
    } else if (project.csp && project.profile && !project.repoUrl) {
      // Pending Repo Connection
      router.push(`/github-repo/${project.projectId}`);
    } else if (project.csp && !project.profile) {
      // Pending Creds
      router.push(`/aws-credentials/${project.projectId}`);
    } else {
      // Pending CSP
      router.push(`/cloud-provider/${project.projectId}`);
    }
  };

  // Helper to determine card color based on project status
  const getStatusColor = (project: ProjectWithTime) => {
    if (project.csp && project.profile && project.repoUrl) {
      // All steps done
      return {
        bg: 'bg-[#072a1b]', // green background
        dot: 'bg-[#00b15c]', // green dot
        text: 'text-[#00b15c]',
      };
    } else if (project.csp && project.profile && !project.repoUrl) {
      // Pending Repo Connection (yellow)
      return {
        bg: 'bg-yellow-900',
        dot: 'bg-yellow-400',
        text: 'text-yellow-400',
      };
    } else if (project.csp && !project.profile) {
      // Only AWS creds added (yellow)
      return {
        bg: 'bg-yellow-900',
        dot: 'bg-yellow-400',
        text: 'text-yellow-400',
      };
    } else {
      // Pending CSP (red)
      return {
        bg: 'bg-red-900',
        dot: 'bg-red-500',
        text: 'text-red-500',
      };
    }
  };

  const deploymentCards: DeploymentCard[] = projects.map((project: ProjectWithTime) => ({
    name: project.projectName,
    branch: 'main branch', // Default since not in API
    time: project.tillnowtime,
    status: project.steps || 'Unknown', // Use steps from API
    description: project.projectDescription || 'No description',
    project,
  }));

  // Filter cards by search
  const filteredCards = deploymentCards.filter(card => {
    const searchLower = search.toLowerCase();
    return (
      card.name.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex flex-col items-center justify-center bg-black">
            <div className="mb-4"><AnimatedLogo /></div>
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
            <div className="w-full flex items-center p-6">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-2 rounded-md border border-[#232329] bg-black text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CD9C20]"
                disabled={deleteMode}
              />
              <Button
                variant="extra"
                width='auto'
                className="ml-4"
                onClick={() => {
                  if (deleteMode) {
                    setDeleteMode(false);
                  } else {
                    setDeleteMode(true);
                  }
                }}
                aria-label={deleteMode ? 'Exit delete mode' : 'Enter delete mode'}
              >
                {deleteMode ? <X /> : <Trash2 />}
              </Button>
            </div>

            {/* Main Content Grid */}
            <main className="w-full p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400 py-8">No projects found.</div>
                ) : (
                  filteredCards.map((card, index) => {
                    const statusColor = getStatusColor(card.project);
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-br from-[#cd9c20]/7 to-black/10 backdrop-blur-md border border-[#232329] rounded-md px-6 py-5 shadow-lg ${deleteMode ? '' : 'cursor-pointer'}`}
                        onClick={() => !deleteMode && handleCardClick(card)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-medium text-white">{card.name}</span>
                          <div className="flex items-center gap-2">
                            <div className={`${statusColor.bg} ${statusColor.text} px-3 py-2 rounded-full flex items-center`}>
                              <span className={`w-2 h-2 rounded-full mr-1 ${statusColor.dot}`} />
                              <span className="text-xs font-light ml-1">{card.status}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{card.branch}</p>
                        <p className="text-xs text-gray-400">{card.time}</p>
                        <p className="text-xs text-gray-400 mt-2 px-2 py-2 rounded bg-[#1A1A1A]">
                          {card.description}
                        </p>
                        {deleteMode && (
                          <div className="flex justify-end mt-4">
                            <Button variant="destructive">Delete</Button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}