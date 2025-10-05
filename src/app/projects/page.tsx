'use client';

import Sidebar from '@/components/Sidebar/page'; 
import PrivateHeader from '@/components/PrivateHeader/page';

interface DeploymentCard {
  name: string;
  branch: string;
  time: string;
  status: 'Deployed' | 'Deploying' | 'Failed';
  description: string;
}

export default function SpacesPage() {
  const deploymentCards: DeploymentCard[] = [
    { name: 'terraform-aws-vpc', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'terraform-aws-vpc', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'azure-kubernetes-cluster', branch: 'develop branch', time: '2 hours ago', status: 'Failed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'gcp-cloud-functions', branch: 'main branch', time: '2 hours ago', status: 'Deploying', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'docker-microservices', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'website-v2', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
  ];

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="w-full">
            {/* Header */}
            <header className="w-full p-6 bg-black">
              <h1 className="text-3xl font-bold text-white">
                Projects
              </h1>
            </header>

            {/* Search Bar */}
            <div className="w-full p-6">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-md border border-[#232329] bg-black text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CD9C20]"
              />
            </div>

            {/* Main Content Grid */}
            <main className="w-full p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deploymentCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#cd9c20]/7 to-black/10 backdrop-blur-md border border-[#232329] rounded-md px-6 py-5 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-medium text-white">{card.name}</span>
                      <div className="flex items-center gap-2">
                        {card.status === 'Deployed' && (
                          <div className="bg-[#072a1b] text-[#00b15c] px-3 py-2 rounded-full flex items-center">
                            <span className="w-2 h-2 rounded-full mr-1 bg-[#00b15c]" />
                            <span className="text-xs font-light ml-1">{card.status}</span>
                          </div>
                        )}
                        {card.status === 'Deploying' && (
                          <div className="bg-[#382810] text-[#f5a623] px-3 py-2 rounded-full flex items-center">
                            <span className="w-2 h-2 rounded-full mr-1 bg-[#f5a623]" />
                            <span className="text-xs font-light ml-1">{card.status}</span>
                          </div>
                        )}
                        {card.status === 'Failed' && (
                          <div className="bg-[#351518] text-[#e5484d] px-3 py-2 rounded-full flex items-center">
                            <span className="w-2 h-2 rounded-full mr-1 bg-[#e5484d]" />
                            <span className="text-xs font-light ml-1">{card.status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{card.branch}</p>
                    <p className="text-xs text-gray-400">{card.time}</p>
                    <p className="text-xs text-gray-400 mt-2 px-2 py-2 rounded">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}