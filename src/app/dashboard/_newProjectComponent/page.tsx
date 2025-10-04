'use client';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeProvider';
import Button from '@/components/PrimaryButton/page';
import { useRouter } from 'next/navigation';

export default function InfrastructureBanner() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const bannerBg = darkMode ? '#1F2228' : '#FFFFFF';
  const bannerText = darkMode ? '#C8D2E0' : '#111111';
  const containerBorder = darkMode ? '#4B5563' : '#D1D5DB';
  const projectTitle = darkMode ? '#FFFFFF' : '#111111';
  const projectSubtitle = darkMode ? '#9CA3AF' : '#6B7280';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner */}
      <div
        className="w-full px-6 py-4 rounded-md mb-8 transition-colors duration-500"
        style={{ backgroundColor: bannerBg }}
      >
        <p
          className="text-left text-sm"
          style={{ color: bannerText }}
        >
          Ready to deploy more infrastructure? Connect a new repository or create a deployment from an existing one.
        </p>
      </div>

      {/* 50vh Container */}
      <div
        className="w-full h-[40vh] flex flex-col items-center justify-center rounded-md transition-colors duration-500 cursor-pointer hover:opacity-80"
        style={{ border: `1px solid ${containerBorder}` }}
        onClick={() => router.push('/create-project')}
      >
        <Image
          src="/Message.svg"
          alt="Deploy Illustration"
          width={40}
          height={40}
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <p
            className="text-center text-[15px] font-medium transition-colors duration-500"
            style={{ color: projectTitle }}
          >
            Create New Project
          </p>
          <p
            className="text-center text-[10px]"
            style={{ color: projectSubtitle }}
          >
            Start a new infrastructure deployment
          </p>
        </div>
      </div>
    </div>
  );
}