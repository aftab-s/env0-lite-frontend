'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/context/DarkModeProvider';
import Input from '@/components/Input/page';
import { fetchUserRepos } from '@/services/query/useGithub';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import Button from '@/components/PrimaryButton/page';
import { signIn, useSession } from 'next-auth/react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  owner: string;
}

export default function GithubRepository() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const { data: session } = useSession();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');

  // const email = useSelector((state: RootState) => state.auth.email);

  const textColor = darkMode ? "text-slate-300" : "text-gray-700";
  const bgColor = darkMode ? "bg-[#1F2228]" : "bg-white";
  const borderColor = darkMode ? "border-[#2A2E36]" : "border-[#E5E7EB]";

  useEffect(() => {
    // if (!email) return;
    
    const token = (session as any)?.user.githubAccessToken;
    
    if (!token) return;

    const fetchRepos = async () => {
      try {
        const data = await fetchUserRepos(token);
        setRepos(data);
      } catch (err) {
        console.error('Failed to fetch repos', err);
      }
    };

    fetchRepos();
  }, [session]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRepoClick = (repo: Repo) => {
    router.push(`/github-conf/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}`);
  };

  return (
    <div className="w-full flex flex-col flex-1 min-h-0 items-center">
      

      <div className='w-full px-6'>
        <div className={`w-full mb-6 rounded-lg px-2 py-3 text-[12px] border ${borderColor} ${bgColor} ${textColor} transition-colors duration-300`}>
          What we'll access: Read repository contents, Access commit history, Read branch information, View pull requests
        </div>

        <div className="w-full flex gap-6 flex-1 min-h-0">
          <div className="flex-1 flex flex-col justify-center border border-[#1F2228] rounded-lg p-6 items-center gap-4">
            <h2
              className={`text-lg font-semibold mb-2 text-center transition-colors duration-300 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Connect to GitHub
            </h2>
            <p className="text-sm text-[#6B7280] mb-4 text-center w-[90%]">
              Allow Terraform UI to access your repositories to start deploying projects.
            </p>
            <Button variant="social" onClick={()=>{signIn('github')}}>
            <img src="/login/Github.svg" alt="GitHub" className={`w-5 h-5 ${
                      darkMode
                        ? ""
                        : "invert"
                    }`} />
            Continue with GitHub
          </Button>
          </div>

          {/* RHS - Search + Repo List */}
          <div className="flex-1 flex flex-col min-h-0 border border-[#1F2228] rounded-lg p-4">
            {/* Search Bar */}
            <div className="w-full mb-4">
              <Input
                label=""
                placeholder="Search repos"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="placeholder-gray-400"
              />
            </div>

            {/* Repo Card */}
            <div className="flex-1 flex flex-col border border-[#1F2228] rounded-lg overflow-y-auto min-h-[45vh]">
              {filteredRepos.map((repo, idx) => (
                <div
                  key={idx}
                  className={`px-6 py-3 cursor-pointer ${darkMode ? "hover:bg-[#2A2E36]":"hover:bg-[#FFFFFF]"} transition-colors ${
                    idx !== filteredRepos.length ? 'border-b border-[#1F2228]' : ''
                  }`}
                  onClick={() => handleRepoClick(repo)}
                >
                  <h2
                    className="text-[14px] font-medium"
                    style={{ color: darkMode ? '#FFFFFF' : '#111' }}
                  >
                    {repo.name}
                  </h2>
                  {repo.owner && (
                    <p
                      className="text-[12px]"
                      style={{ color: darkMode ? '#9CA3AF' : '#4B5563' }}
                    >
                      {repo.owner}
                    </p>
                  )}
                </div>
              ))}

              {filteredRepos.length === 0 && (
                <p className="text-sm text-gray-500 px-6 py-3">No repositories found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
