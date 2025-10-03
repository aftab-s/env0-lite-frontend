'use client';
import { useSearchParams } from 'next/navigation';
import Input from '@/components/Input/page';
import Button from '@/components/PrimaryButton/page';
import RepoTree from '@/components/FolderTree/page';
import { useEffect, useState } from 'react';
import { fetchRepoTree } from '@/services/query/useGithub';

interface TreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

export default function GithubConfigPage() {
  const searchParams = useSearchParams();
  const repoName = searchParams.get('repo');

  const [branch, setBranch] = useState('');
  const [directory, setDirectory] = useState('');
  const [tree, setTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    async function loadTree() {
      try {
        const repoTree = await fetchRepoTree({email:'',owner:'',repo: '',branch: "main"});
        setTree(repoTree);
      } catch (err) {
        console.error("Failed to load repo tree:", err);
      }
    }

    loadTree();
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Breadcrumb */}
      <div className="w-full flex gap-2 mb-4 text-[14px] font-medium">
        <span className="text-[#9CA3AF]">Repositories</span>
        <span className="text-white">{'>'} {repoName || ''}</span>
      </div>

      {/* Header */}
      <h2 className="w-full text-3xl font-bold my-4 text-white">
        Repository Configuration
      </h2>

      {/* Inputs */}
      <div className="w-full flex gap-4 my-4">
        <Input
          label="Branch Selection"
          placeholder="Enter branch"
          value={branch}
          onChange={(e: any) => setBranch(e.target.value)}
          className="flex-1"
        />
        <Input
          label="Directory Path"
          placeholder="Enter path"
          value={directory}
          onChange={(e: any) => setDirectory(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Project Structure */}
      <div className="w-full">
        <span className="mb-2 text-white text-[14px] font-medium">
          Project Structure
        </span>
        <div
          className="w-full p-4 rounded-md my-4 bg-[#1A1A1A] border border-[#2A2A2A]"
          style={{ maxHeight: '40vh', overflowY: 'auto' }}
        >
          <RepoTree nodes={tree} />
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between mt-4 gap-4">
        <Button variant="secondary">Back</Button>
        <Button variant="tertiary">Next</Button>
      </div>
    </div>
  );
}