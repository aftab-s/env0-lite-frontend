'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { fetchRepositories } from '@/redux/slice/Github/repoListSlice';
import { updateProjectRepoThunk } from '@/redux/slice/Projects/projectListByOwnerSlice';
import { cloneRepoAndCreateSpaces } from '@/services/project/cloneRepo';
import Sidebar from '@/components/common/Sidebar';
import PrivateHeader from '@/components/common/PrivateHeader';
import ConfirmationModal from '@/components/Template/ConfirmationModal';
import Swal from 'sweetalert2';
import '@/components/customSwal/customGlass.css';
import type { ProjectWithTime } from '@/types/project.types';

interface UIRepository {
  key: string; // composite key (owner/name) for rendering
  name: string;
  owner: string | null;
  branches: string[];
}

export default function GithubRepositoryPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.repoList);
  const [search, setSearch] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<UIRepository | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectedProject, setConnectedProject] = useState<ProjectWithTime | null>(null);
  const [cloning, setCloning] = useState(false);

  const cardBg = 'bg-[#18181B]';
  const cardBorder = 'border-[#333333]';
  const panelInnerBorder = 'border-[#292929]';
  const heading = 'text-[#FFFFFF]';
  const subheading = 'text-[#A1A1AA]';

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch]);

  const transformed: UIRepository[] = useMemo(
    () => items.map(r => ({ key: `${r.owner || 'unknown'}/${r.name}`, ...r })),
    [items]
  );

  const filtered = useMemo(
    () =>
      transformed.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          (r.owner || '').toLowerCase().includes(search.toLowerCase())
      ),
    [transformed, search]
  );

  const getBadge = (repo: UIRepository) => {
    if (repo.branches.some(b => /k8s|helm|yaml/i.test(b))) return 'YAML';
    return 'Bagel Connector';
  };

  const branchList = selectedRepo?.branches || [];

  const handleContinue = async () => {
    if (!selectedRepo || !selectedBranch) return;

    setConnecting(true);
    setShowModal(true);

    try {
      const result = await dispatch(updateProjectRepoThunk({
        projectId: projectId!,
        payload: {
          repoUrl: `https://github.com/${selectedRepo.owner}/${selectedRepo.name}`,
          ownerName: selectedRepo.owner || '',
          branch: selectedBranch,
        },
      })).unwrap();

      setConnectedProject(result.project || null);
      setConnecting(false);
    } catch {
      setConnecting(false);
      setShowModal(false);
      Swal.fire({
        title: 'Error',
        text: 'Failed to connect repository.',
        customClass: {
          popup: 'customBagelGlass',
          title: 'customBagelTitle',
          htmlContainer: 'customBagelContent',
          confirmButton: 'customBagelButton',
          icon: 'customBagelIcon',
        },
      });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <PrivateHeader />
        <div className="flex-1 overflow-y-auto">
        <div className="w-full bg-[#000000]  h-full">
          <main className="w-full max-w-6xl mx-auto px-6 py-10">
            {/* Page header */}
            <div className="w-full text-center mb-6 flex-none">
              <h1
                className="text-[32px] font-bold"
                style={{ color: '#CD9C20', fontFamily: 'var(--font-montserrat)' }}
              >
                Connect GitHub Repository
              </h1>
              <p className={`text-sm mt-1 ${subheading}`}>
                Select the GitHub repository and branch that contains your Terraform configuration
              </p>
            </div>

            {/* Main two-column area */}
            <div className="bg-black w-full max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 overflow-hidden">
              {/* Left: Repository list */}
              <div
                className={`rounded-lg border ${cardBorder} ${cardBg} p-5 flex flex-col h-[450px] min-h-0`}
              >
                <div className="mb-4">
                  <h3 className={`text-[18px] font-semibold ${heading}`}>
                    Select Repository
                  </h3>
                  <p className={`text-[12px] ${subheading}`}>
                    Select a repository from your repository list
                  </p>
                </div>
                {/* Search */}
                <div className="mb-4">
                  <div
                    className={`w-full flex items-center gap-2 bg-black border ${cardBorder} rounded-md px-3 py-2`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#A1A1AA]"
                    >
                      <path
                        d="M21 21l-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                      className="bg-black outline-none text-sm text-white placeholder-[#6B7280] w-full"
                    />
                  </div>
                </div>
                <div className="flex-1 rounded-md overflow-y-auto min-h-0">
                  {loading && (
                    <div className={`text-sm p-4 ${subheading} flex items-center gap-2`}>
                      <Loader className="animate-spin h-4 w-4 text-[#A1A1AA]" />
                      Loading repositories
                    </div>
                  )}
                  {error && !loading && (
                    <div className="text-sm p-4 text-red-500">{error}</div>
                  )}
                  {!loading &&
                    !error &&
                    filtered.map((repo) => {
                      const active = selectedRepo?.key === repo.key;
                      return (
                        <button
                          key={repo.key}
                          className={`w-full text-left px-4 py-4 border-b ${panelInnerBorder} hover:bg-[#1F2228] ${
                            active ? 'bg-[#1F2228]' : ''
                          }`}
                          onClick={() => {
                            setSelectedRepo(repo);
                            setSelectedBranch('');
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div
                                className={`text-[14px] font-medium ${heading}`}
                              >
                                {repo.name}
                              </div>
                              <div className={`text-[11px] mt-1 ${subheading}`}>
                                Owner: {repo.owner || 'unknown'}
                              </div>
                              <div className={`text-[11px] mt-1 ${subheading}`}>
                                Branches: {repo.branches.length}
                              </div>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full bg-[#1F2937] text-[#D1D5DB]`}
                            >
                              {getBadge(repo)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  {!loading && !error && filtered.length === 0 && (
                    <div className={`text-sm p-4 ${subheading}`}>
                      No repositories found.
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Repo tree */}
              <div
                className={`rounded-lg border ${cardBorder} ${cardBg} p-5 h-[450px] flex flex-col min-h-0`}
              >
                <div className="mb-4">
                  <h3 className={`text-[18px] font-semibold ${heading}`}>
                    Branches
                  </h3>
                  {!selectedRepo && (
                    <p className={`text-[12px] ${subheading}`}>
                      Select a repository to view branches
                    </p>
                  )}
                  {selectedRepo && branchList.length === 0 && (
                    <p className={`text-[12px] ${subheading}`}>
                      No branches found for this repository.
                    </p>
                  )}
                </div>
                <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
                  {selectedRepo &&
                    branchList.map((br) => (
                      <button
                        key={br}
                        disabled={connecting}
                        onClick={() => {
                          setSelectedBranch(br);
                          handleContinue();
                        }}
                        className={`w-full text-left px-3 py-2 text-sm border-b border-[#444] ${
                          selectedBranch === br
                            ? 'bg-[#1F2228] border border-[#444]'
                            : 'hover:bg-[#1F2228]'
                        } ${heading} ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {connecting && selectedBranch === br ? (
                          <div className="flex items-center gap-2">
                            <Loader className="animate-spin h-4 w-4 text-[#CD9C20]" />
                            Connecting...
                          </div>
                        ) : (
                          br
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={async () => {
          if (!connectedProject) return;
          setCloning(true);
          try {
            await cloneRepoAndCreateSpaces(projectId!);
            router.push(`/spaces/${projectId}`);
          } catch {
            Swal.fire({
              title: 'Error',
              text: 'Failed to clone repository into container.',
              customClass: {
                popup: 'customBagelGlass',
                title: 'customBagelTitle',
                htmlContainer: 'customBagelContent',
                confirmButton: 'customBagelButton',
                icon: 'customBagelIcon',
              },
            });
          } finally {
            setCloning(false);
          }
        }}
        repositoryName={selectedRepo?.name || ''}
        branchName={selectedBranch}
        ownerName={selectedRepo?.owner || undefined}
        isLoading={connecting}
        isCloning={cloning}
        project={connectedProject}
      />
    </div>
  );
}