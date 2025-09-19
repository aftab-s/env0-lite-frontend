'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/context/DarkModeProvider';
import Input from '@/components/Input/page';
import { fetchUserRepos } from '@/services/query/useGithub';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

interface Repo {
  id: number;
  name: string;
  description: string | null;
}

export default function GithubRepository() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');

  const email = useSelector((state: RootState) => state.auth.email);

  const bannerText = darkMode ? '#9CA3AF' : '#111111';

  useEffect(() => {
    if (!email) return;

    const fetchRepos = async () => {
      try {
        const data = await fetchUserRepos(email);
        setRepos(data);
      } catch (err) {
        console.error('Failed to fetch repos', err);
      }
    };

    fetchRepos();
  }, [email]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRepoClick = (repo: Repo) => {
    // Redirect to github-config with repo name as query
    router.push(`/github-config?repo=${encodeURIComponent(repo.name)}`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full rounded-md mb-8 transition-colors duration-500">
        <p className="text-left text-sm" style={{ color: bannerText }}>
          What we'll access: repo contents, commits, branches, PRs
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full mb-6">
        <Input
          label=""
          placeholder="Search repos"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="placeholder-gray-400"
        />
      </div>

      {/* Repo List */}
      <div className="w-full flex flex-col gap-4">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="w-full rounded-md pl-8 py-3 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: darkMode ? '#1A1A1A' : '#FFF',
              border: darkMode ? '1px solid #2A2A2A' : '1px solid #D1D5DB',
            }}
            onClick={() => handleRepoClick(repo)}
          >
            <h2
              className="text-[14px] font-medium"
              style={{ color: darkMode ? '#FFFFFF' : '#111' }}
            >
              {repo.name}
            </h2>
            {repo.description && (
              <p
                className="text-[12px]"
                style={{ color: darkMode ? '#9CA3AF' : '#4B5563' }}
              >
                {repo.description}
              </p>
            )}
          </div>
        ))}

        {filteredRepos.length === 0 && (
          <p className="text-sm text-gray-500 px-1">No repositories found.</p>
        )}
      </div>
    </div>
  );
}
