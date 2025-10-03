'use client';
import { use } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import Button from '@/components/PrimaryButton/PrimaryButton';
import RepoTree from '@/components/FolderTree/page';
import CommonDropdown from '@/components/Dropdown/page';
import { useEffect, useState } from 'react';
import { fetchBranch, fetchRepoTree } from '@/services/query/useGithub';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface TreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string; // path to folder if file
  children?: TreeNode[];
}

interface GithubConfPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function GithubConfigPage({ params }: GithubConfPageProps) {
  const { data: session } = useSession();
  const { owner, repo } = use(params);
  const email = useSelector((state: RootState) => state.auth.email);
  const router = useRouter();

  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [directory, setDirectory] = useState('/');
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [loadingTree, setLoadingTree] = useState(false);

  // Load branches
  useEffect(() => {
    async function loadBranches() {
      const pat = (session as any)?.user.githubAccessToken;
      if (!owner || !repo || !pat) return;
      setTree([]);
      try {
        const branchData = await fetchBranch({ owner, repo, pat });
        setBranches(branchData.map((b: { name: string }) => b.name) || []);
      } catch (err) {
        console.error('Failed to fetch branches:', err);
      }
    }

    loadBranches();
  }, [owner, repo, session]);

  // Load repo tree when branch is selected
  useEffect(() => {
    async function loadTree() {
      const pat = (session as any)?.user.githubAccessToken;
      if (!owner || !repo || !pat || !selectedBranch) return;

      setLoadingTree(true); // ✅ Start loader

      try {
        const repoTree = await fetchRepoTree({
          owner,
          repo,
          branch: selectedBranch,
          pat,
        });

        const mapTree = (nodes: any[]): TreeNode[] =>
          nodes.map((n) => ({
            id: n.id,
            name: n.name,
            type: n.type,
            path: n.type === 'file' ? n.path.split('/').slice(0, -1).join('/') : n.path,
            children: n.children ? mapTree(n.children) : undefined,
          }));

        setTree(mapTree(repoTree));
      } catch (err) {
        console.error('Failed to fetch repo tree:', err);
      } finally {
        setLoadingTree(false); // ✅ Stop loader
      }
    }

    loadTree();
  }, [selectedBranch]);

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Breadcrumb */}
      <div className="w-full flex gap-2 mb-1 text-[14px] font-medium">
        <span className="text-[#9CA3AF]">
          Repositories
        </span>
        <span className="text-white">
          {'>'} {repo || ''}
        </span>
      </div>

      {/* Header */}
      <h2 className="w-full text-xl font-medium my-2 text-[#D8DFEE]">
        Repository Configuration
      </h2>

      {/* Branch + Directory */}
      <div className="w-full flex gap-4">
        <div className="w-full my-4">
          <CommonDropdown
            label="Branch"
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branches.map((b) => ({ label: b, value: b }))}
            placeholder="Select Branch"
            helperText="Choose a branch to configure"
          />

          <TextInput
            label="Directory Path"
            placeholder="Enter path"
            value={directory}
            onChange={(e: any) => setDirectory(e.target.value)}
            className="flex-1 mt-3"
          />
        </div>

        {/* Repo Tree */}
        <div
          className="w-full p-4 rounded-md my-4 relative bg-[#1A1A1A] border border-[#2A2A2A]"
          style={{ height: '45vh', overflowY: 'auto' }}
        >
          {loadingTree && (
            <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
              {/* Bigger spinner */}
              <svg
                className="animate-spin h-12 w-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          )}
          <RepoTree nodes={tree} onSelect={(path) => setDirectory(path || '/')} />
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex mt-4 gap-4">
        <Button variant="secondary" className="rounded-[10px] font-bold" onClick={() => router.push("")}>
          Back
        </Button>
        <Button variant="tertiary" className="rounded-[10px] font-bold">
          Next
        </Button>
      </div>
    </div>
  );
}