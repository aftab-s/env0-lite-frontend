'use client';
import Image from 'next/image';
import Button from '@/components/PrimaryButton/PrimaryButton';
import { useRouter } from 'next/navigation';

export default function InfrastructureBanner() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner */}
      <div
        className="w-full px-6 py-4 rounded-md mb-8"
        style={{ backgroundColor: '#1F2228' }}
      >
        <p
          className="text-left text-sm"
          style={{ color: '#C8D2E0' }}
        >
          Ready to deploy more infrastructure? Connect a new repository or create a deployment from an existing one.
        </p>
      </div>

      {/* 40vh Container */}
      <div
        className="w-full h-[40vh] flex flex-col items-center justify-center rounded-md cursor-pointer hover:opacity-80"
        style={{ border: '1px solid #4B5563' }}
        onClick={() => router.push('/create-project')}
      >
        <Image
          src="/Message.svg"
          alt="Deploy Illustration"
          width={40}
          height={40}
          className="hue-rotate-[25deg] invert-[0.5] sepia saturate-[5]"
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <p
            className="text-center text-[15px] font-medium"
            style={{ color: '#FFFFFF' }}
          >
            Create New Project
          </p>
          <p
            className="text-center text-[10px]"
            style={{ color: '#9CA3AF' }}
          >
            Start a new infrastructure deployment
          </p>
        </div>
      </div>
    </div>
  );
}