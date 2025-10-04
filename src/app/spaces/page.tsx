'use client';
import Sidebar from '@/components/Sidebar/page';
import PrivateHeader from '@/components/PrivateHeader/page';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const spaces = [
  { name: 'VPC Networking', subtitle: 'Secure, high-performance object storage', assets: 25, last: 'Last Deployed', time: '2 days ago', status: <ClockIcon className="w-6 h-6 text-[#FFD600]" /> },
  { name: 'RDS Database', subtitle: 'Managed relational database service', assets: 12, last: 'Last Updated', time: '3 hours ago', status: <CheckCircleIcon className="w-6 h-6 text-[#22C55E]" /> },
  { name: 'S3 Storage', subtitle: 'Secure, high-performance object storage', assets: 25, last: 'Last Deployed', time: '2 days ago', status: <CheckCircleIcon className="w-6 h-6 text-[#22C55E]" /> },
  { name: 'S3 Storage', subtitle: 'Secure, high-performance object storage', assets: 25, last: 'Last Deployed', time: '2 days ago', status: <CheckCircleIcon className="w-6 h-6 text-[#22C55E]" /> },
  { name: 'GCP Storage', subtitle: 'Cloud object storage for GCP', assets: 10, last: 'Last Deployed', time: '5 days ago', status: <ClockIcon className="w-6 h-6 text-[#FFD600]" /> },
  { name: 'Azure Blob', subtitle: 'Azure blob object storage', assets: 16, last: 'Last Deployed', time: '1 day ago', status: <CheckCircleIcon className="w-6 h-6 text-[#22C55E]" /> },
];

export default function SpacesPage() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="bg-[#111111] min-h-screen w-full relative px-14 pt-8">
          <h1 className="text-white text-4xl font-bold mb-6">Spaces</h1>
          <div className="flex items-center mb-7 gap-4">
            <input type="text" placeholder="terraform-aws-infrastructure • Main AWS infrastructure with VPC, EC2, and RDS • AWS • us-east-1"
            className="w-full bg-[#09090B] border border-[#27272A] rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none" />
            <button className="ml-auto font-semibold bg-[#FFD600] text-[#232329] px-3 py-2 rounded-md text-sm whitespace-nowrap">View Deployment</button>
            <button className="ml-auto p-2 rounded-md text-[#232329] bg-[#27272A]">
            <Cog6ToothIcon className="w-5 h-5 text-white" />
            </button>
          </div>
          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {spaces.map((space, i) => (
              <div key={i} className="bg-[#09090B] border border-[#232329] rounded-md px-6 py-5 shadow-lg">
                <div className="flex justify-between items-center pb-2">
                  <div className="text-white text-lg font-semibold">{space.name}</div>
                  <div className="rounded-full w-8 h-8 flex items-center justify-center">{space.status}</div>
                </div>
                <div className="text-[#A1A1AA] text-xs pb-3">{space.subtitle}</div>
                <div className="flex justify-between w-full p-2 items-center bg-[#111111]">
                  <span className="text-[#FFFFFF] text-xs ">Assets</span>
                  <span className="text-[#9CA3AF] text-xs ">{space.assets}</span>
                </div>
                <div className="flex justify-between w-full p-2 items-center bg-[#111111]">
                  <span className="text-[#FFFFFF] text-xs">{space.last}</span>
                  <span className="text-[#9CA3AF] text-xs">{space.time}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Floating Settings Modal */}
          {/* <div className="absolute top-32 right-8 w-[370px] bg-[#18181B] border border-[#232329] rounded-xl shadow p-6">
            <h2 className="text-[#F4F4F5] font-semibold text-lg mb-3">Settings</h2>
            <div className="text-[#A1A1AA] mb-2">Edit AWS Credentials</div>
            <label className="block text-[#A1A1AA] text-xs mb-1">Profile Name</label>
            <input className="bg-[#232329] border border-[#232329] rounded px-3 py-2 mb-3 w-full text-[#F4F4F5] font-medium text-sm" defaultValue="100%" />
            <label className="block text-[#A1A1AA] text-xs mb-1">AWS Access Key ID</label>
            <input className="bg-[#232329] border border-[#232329] rounded px-3 py-2 mb-3 w-full text-[#F4F4F5] font-medium text-sm" defaultValue="AKIAIOSFODNN7EXAMPLE" />
            <label className="block text-[#A1A1AA] text-xs mb-1">AWS Secret Access Key</label>
            <input className="bg-[#232329] border border-[#232329] rounded px-3 py-2 mb-1 w-full text-[#F4F4F5] font-medium text-sm" defaultValue="wJa1XtUnFEM1/K7MDENG/bPxRfiCYEXAMPLEKEY" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
