'use client';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/PrimaryButton/PrimaryButton';
import RepoTree from '@/components/FolderTree/page';
import { fetchRepoTree, fetchUserRepos, RepoTreeNode } from '@/services/query/useGithub';
import { useSession } from 'next-auth/react';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  owner: string;
  updated_at?: string;
};

export default function GithubRepository() {
  const { data: session } = useSession();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [tree, setTree] = useState<RepoTreeNode[]>([]);
  const [loadingTree, setLoadingTree] = useState(false);

  const cardBg = 'bg-[#18181B]';
  const cardBorder = 'border-[#333333]';
  const panelInnerBorder = 'border-[#292929]';
  const heading = 'text-[#FFFFFF]';
  const subheading = 'text-[#A1A1AA]';

  useEffect(() => {
    const token = (session?.user as { githubAccessToken?: string } | undefined)?.githubAccessToken;
    if (!token) return;
    const run = async () => {
      try {
        const data = await fetchUserRepos(token);
        setRepos(data as Repo[]);
      } catch (err) {
        console.error('Failed to fetch repos', err);
      }
    };
    run();
  }, [session]);

  useEffect(() => {
    const token = (session?.user as { githubAccessToken?: string } | undefined)?.githubAccessToken;
    if (!selectedRepo || !token) return;
    setLoadingTree(true);
    fetchRepoTree({ owner: selectedRepo.owner, repo: selectedRepo.name, pat: token })
      .then((data) => setTree(data))
      .catch((e) => console.error('Failed to fetch tree', e))
      .finally(() => setLoadingTree(false));
  }, [selectedRepo, session]);

  const filtered = useMemo(
    () => repos.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())),
    [repos, search]
  );

  const getBadge = (repo: Repo) => {
    if (/k8s|helm|yaml/i.test(`${repo.name} ${repo.description ?? ''}`)) return 'YAML';
    return 'HCL';
  };

  return (
    <div className="w-full flex flex-col flex-1 min-h-0">
      {/* Page header */}
      <div className="w-full text-center mb-8">
        <h1 className="text-[32px] font-bold" style={{ color: '#CD9C20', fontFamily: 'var(--font-montserrat)' }}>Connect GitHub Repository</h1>
        <p className={`text-sm mt-1 ${subheading}`}>
          Select the GitHub repository and branch that contains your Terraform configuration
        </p>
      </div>

      <div className="w-full max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
        {/* Left: Repository list */}
        <div className={`rounded-lg border ${cardBorder} ${cardBg} p-5 flex flex-col min-h-[60vh]`}>
          <div className="mb-4">
            <h3 className={`text-[18px] font-semibold ${heading}`}>Select Repository</h3>
            <p className={`text-[12px] ${subheading}`}>Select a repository from your repository list</p>
          </div>
          {/* Search with icon */}
          <div className="mb-4">
            <div className={`w-full flex items-center gap-2 bg-black border ${cardBorder} rounded-md px-3 py-2`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#A1A1AA]"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/></svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-black outline-none text-sm text-white placeholder-[#6B7280] w-full"
              />
            </div>
          </div>

          <div className={`flex-1 rounded-md overflow-y-auto`}> 
            {filtered.map((repo) => (
              <button
                key={repo.id}
                className={`w-full text-left px-4 py-4 border-b ${panelInnerBorder} transition-colors ${
                  'hover:bg-[#1F2228]'
                } ${selectedRepo?.id === repo.id ? 'bg-[#1F2228]' : ''}`}
                onClick={() => setSelectedRepo(repo)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`text-[14px] font-medium ${heading}`}>{repo.name}</div>
                    <div className={`text-[12px] mt-0.5 ${subheading}`}>{repo.description ?? ''}</div>
                    <div className={`text-[11px] mt-2 flex items-center gap-2 ${subheading}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#A1A1AA]"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/></svg>
                      Updated {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'recently'}
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-[#1F2937] text-[#D1D5DB]`}>
                    {getBadge(repo)}
                  </span>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className={`text-sm p-4 ${subheading}`}>No repositories found.</div>
            )}
          </div>
        </div>

        {/* Right: Repo tree */}
        <div className={`rounded-lg border ${cardBorder} ${cardBg} p-5 min-h-[60vh]`}>
          <div className="mb-4">
            <h3 className={`text-[18px] font-semibold ${heading}`}>Branches</h3>
            <p className={`text-[12px] ${subheading}`}>Select a repository to view branches</p>
          </div>

          <div className={`relative rounded-md p-3`} style={{height:'48vh', overflowY:'auto'}}>
            {loadingTree && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-gray-300" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
            )}
            <RepoTree nodes={tree} />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-10">
        <div className="w-[360px]">
          <Button>Continue to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}