'use client';

import { useDarkMode } from '@/context/DarkModeProvider';

interface DeploymentCard {
  name: string;
  branch: string;
  time: string;
  status: 'Deployed' | 'Deploying' | 'Failed';
  description:string;
}

export default function Spaces() {
  const { darkMode } = useDarkMode();

  const deploymentCards: DeploymentCard[] = [
    { name: 'terraform-aws-vpc', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'terraform-aws-vpc', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'azure-kubernetes-cluster', branch: 'develop branch', time: '2 hours ago', status: 'Failed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'gcp-cloud-functions', branch: 'main branch', time: '2 hours ago', status: 'Deploying', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'docker-microservices', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
    { name: 'website-v2', branch: 'main branch', time: '2 hours ago', status: 'Deployed', description: ' Lorem ipsum dolor sit amet consectetur. Vulputate.' },
  ];

  const titleColor = darkMode ? 'text-white' : 'text-black';
  const subtitleColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#09090B]' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const descriptionBg = darkMode ? 'bg-[#111111]' : 'bg-white';

  const deployedBg = darkMode ? 'bg-[#072a1b]' : 'bg-[#cef7e3]';
  const deployingBg = darkMode ? 'bg-[#382810]' : 'bg-[#ffe6cc]';
  const failedBg = darkMode ? 'bg-[#351518]' : 'bg-[#ffb3b3]';

  const deployedFont = darkMode ? 'text-[#00b15c]' : 'text-[#00b15c]';
  const deployingFont = darkMode ? 'text-[#f5a623]' : 'text-[#f5a623]';
  const failedFont = darkMode ? 'text-[#e5484d]' : 'text-[#e5484d]';

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-[#111111]' : 'bg-[#EFEFEF]'
      }`}
    >
      {/* Header */}
      <header className="w-full p-6">
        <h1 className={`text-3xl font-bold transition-colors duration-500 ${titleColor}`}>
        Spaces
        </h1>
      </header>

      {/* Search Bar */}
      <div className="w-full p-6">
        <input
          type="text"
          placeholder="Search"
          className={`w-full p-2 rounded-md border ${cardBorder} ${cardBg} text-sm ${subtitleColor} focus:outline-none focus:ring-1 focus:ring-[#CD9C20]`}
        />
      </div>

      {/* Main Content Grid */}
      <main className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deploymentCards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${cardBorder} ${cardBg} shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-base font-medium ${titleColor}`}>{card.name}</span>
                <div className={`flex items-center gap-2 `}>
                  {card.status === 'Deployed' && (
                    <div className={`${deployedBg} ${deployedFont} px-3 py-2 rounded-full flex items-center`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${deployedFont} bg-current`} />
                      <span className="text-xs font-light ml-1">{card.status}</span>
                    </div>
                  )}
                  {card.status === 'Deploying' && (
                    <div className={`${deployingBg} ${deployingFont} px-3 py-2 rounded-full flex items-center`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${deployingFont} bg-current`} />
                      <span className="text-xs font-light ml-1">{card.status}</span>
                    </div>
                  )}
                  {card.status === 'Failed' && (
                    <div className={`${failedBg} ${failedFont} px-3 py-2 rounded-full flex items-center`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${failedFont} bg-current`} />
                      <span className="text-xs font-light ml-1">{card.status}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-xs ${subtitleColor}`}>{card.branch}</p>
              <p className={`text-xs ${subtitleColor}`}>{card.time}</p>
              <p className={`text-xs ${subtitleColor} ${descriptionBg} mt-2px-2 py-2 rounded`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}