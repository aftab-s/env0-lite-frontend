"use client";
import TextInput from "@/components/TextInput"; 
import Button from "@/components/PrimaryButton/PrimaryButton";
import { useState, useCallback, useEffect } from 'react';
import { saveGithubPAT } from '@/services/githubPAT/githubPat.service';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/PublicHeader';

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[97%] bg-[#09090B] flex items-center justify-start rounded-lg border gap-5 border-[#333333] p-4 mt-4">
      <h1 className="text-[#ffffff] font-regular w-8 h-8 flex items-center justify-center border border-[#333333] text-[14px] rounded-md">
        {number}
      </h1>
      <div className="text-[#ffffff] font-regular text-[14px] flex flex-col gap-2 w-full">
        {children}
      </div>
    </div>
  );
}

export default function GithubConnectPage() {
  const [pat, setPat] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Basic PAT validation: must start with ghp_ or github_pat_
  const PAT_REGEX = /^(ghp|github_pat)_[A-Za-z0-9_]+$/;
  const isValidPat = pat.trim() === '' ? true : PAT_REGEX.test(pat.trim());
  const canSubmit = pat.trim().length > 0 && isValidPat && !loading;

  const handleVerify = useCallback(async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      await saveGithubPAT(pat.trim());
      await Swal.fire({
        icon: 'success',
        title: 'Token saved',
        text: 'Your GitHub PAT has been stored securely.',
        confirmButtonColor: '#CD9C20',
      });
      router.push('/dashboard');
    } catch (e: unknown) {
      let msg = 'Failed to save token';
      if (
        e &&
        typeof e === 'object' &&
        // @ts-expect-error axios-like error shape
        e.response?.data?.error
      ) {
        // @ts-expect-error axios-like error shape
        msg = e.response.data.error as string;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        confirmButtonColor: '#CD9C20',
      });
    } finally {
      setLoading(false);
    }
  }, [canSubmit, pat, router]);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <div className="flex flex-col w-full h-screen">
      <PublicHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="w-full bg-[#000000] flex flex-col items-center pt-10">
          <h1 className="text-[#CD9C20] font-semibold text-[30px]">
            GitHub Personal Access Token
          </h1>
          <h1 className="text-[#ffffff] font-regular text-[14px]">
            We need a GitHub Personal Access Token to access your repositories and
            manage deployments.
          </h1>

          {/* Token Input Section */}
          <div className="w-[60%] min-h-[200px] bg-[#18181B] mt-9 flex flex-col items-center justify-center rounded-lg border border-[#333333] p-4">
            <h1 className="text-[#ffffff] font-semibold text-[16px]">
              GitHub Personal Access Token
            </h1>
            <h1 className="text-[#A1A1AA] font-regular text-[14px] mb-5">
              Your token is stored securely and encrypted. You will only be using it
              to access your repositories
            </h1>
            <TextInput
              placeholder="gph_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
            />
            {pat && !isValidPat && (
              <h4 className="text-red-500 text-[10px] w-full mt-1">
                Invalid token format. It must start with <span className="font-mono">ghp_</span> or <span className="font-mono">github_pat_</span>.
              </h4>
            )}
            <div className="w-[54%]">
              <Button onClick={handleVerify} disabled={!canSubmit}>
                {loading ? 'Saving...' : 'Verify Token'}
              </Button>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="w-[60%] bg-[#09090B] mt-9 flex flex-col items-center justify-center rounded-lg mb-10 border border-[#333333] p-4">
            <h1 className="text-[#ffffff] font-regular mb-2 text-[14px]">
              How to generate a Personal Access Token?
            </h1>
            <Step number={1}>
              Go to GitHub Settings → Developer settings → Personal access tokens →
              Tokens (classic)
            </Step>
            <Step number={2}>
              Click &quot;Generate new token&quot; → &quot;Generate new token
              (classic)&quot;
            </Step>
            <Step number={3}>
              <>
                <span>
                  Add a note (e.g., &quot;TerraForm Deploy&quot;) and select these
                  scopes:
                </span>
                <div className="bg-[#18181B] rounded-lg border border-[#333333] p-4 mt-2 w-[90%]">
                  {['repo', 'read:user', 'user:email'].map((scope) => (
                    <div
                      key={scope}
                      className="flex items-center justify-between text-[#ffffff] text-[14px] mb-2 last:mb-0"
                    >
                      <span>{scope}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#CD9C20] cursor-pointer"
                        defaultChecked={true}
                      />
                    </div>
                  ))}
                </div>
              </>
            </Step>
            <Step number={4}>Click &quot;Generate token&quot; and copy the token</Step>
          </div>
        </div>
      </div>
    </div>
  );
}