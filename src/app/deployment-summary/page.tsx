'use client';

import { useDarkMode } from '@/context/DarkModeProvider';

interface DeployedResource {
  type: string;
  name: string;
  status: 'Created' | 'Updated' | 'Destroyed';
}

interface TerraformOutput {
  key: string;
  value: string;
}

export default function DeploymentSummaryLayout() {
  const { darkMode } = useDarkMode();

  const deploymentData = {
    status: 'Successful',
    duration: '2m 34s',
    completed: '2024-01-15 14:32:18 UTC',
    projectName: 'another-repo',
    platform: 'AWS',
    repository: 'github.com/user/another-repo',
    branch: 'main'
  };

  const deployedResources: DeployedResource[] = [
    { type: 'aws_instance', name: 'web-server', status: 'Created' },
    { type: 'aws_security_group', name: 'web-sg', status: 'Created' },
    { type: 'aws_key_pair', name: 'deployer-key', status: 'Created' }
  ];

  const terraformOutputs: TerraformOutput[] = [
    { key: 'instance_ip', value: '54.123.45.67' },
    { key: 'security_group_id', value: 'sg-012345678abcdef0' }
  ];

  const titleColor = darkMode ? 'text-white' : 'text-black';
  const subtitleColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const outputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-100';
  const statusBg = darkMode ? 'bg-[#0e3120]' : 'bg-[#cef7e3]';

  return (
    <div
      className={`w-full transition-colors duration-500 ${
        darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]"
      }`}
    >
      {/* Main Content */}
      <div
        className={`w-full transition-colors duration-500 p-10 ${
          darkMode ? "bg-[#000000]" : "bg-[#F3F4F6]"
        }`}
      >
        <header className="w-full mb-10">
          <h1 className={`text-3xl font-bold transition-colors duration-500 ${titleColor}`}>
            Deployment Summary
          </h1>
        </header>

        <main className="w-full">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
            {/* Left Column - Main Info */}
            <div className="space-y-8">
              {/* Status Section */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 ${statusBg} rounded-full`}>
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-500 text-sm font-medium">{deploymentData.status}</span>
                </div>
              </div>

              {/* Duration and Completion */}
              <div className="space-y-2">
                <p className={`text-sm ${subtitleColor}`}>
                  Duration: {deploymentData.duration}
                </p>
                <p className={`text-sm ${subtitleColor}`}>
                  Completed: {deploymentData.completed}
                </p>
              </div>

              {/* Overview Section */}
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${titleColor}`}>Overview</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={`text-sm ${subtitleColor}`}>Project Name:</span>
                    <span className={`text-sm ${titleColor}`}>{deploymentData.projectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${subtitleColor}`}>Platform:</span>
                    <span className={`text-sm ${titleColor}`}>{deploymentData.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${subtitleColor}`}>Repository:</span>
                    <span className={`text-sm ${titleColor}`}>{deploymentData.repository}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${subtitleColor}`}>Branch:</span>
                    <span className={`text-sm ${titleColor}`}>{deploymentData.branch}</span>
                  </div>
                </div>
              </div>

              {/* Terraform Outputs Section */}
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold ${titleColor}`}>Terraform Outputs</h2>
                
                <div className="space-y-4">
                  {terraformOutputs.map((output, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${outputBg} border ${cardBorder}`}
                    >
                      <div className={`text-sm font-medium ${titleColor} mb-1`}>
                        {output.key}
                      </div>
                      <div className={`text-sm font-mono ${subtitleColor}`}>
                        {output.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deployed Resources */}
            <div className="space-y-6">
              <h2 className={`text-xl font-semibold ${titleColor}`}>Deployed Resources</h2>
              
              <div className={`rounded-lg border ${cardBorder} overflow-hidden ${cardBg}`}>
                <table className="w-full">
                  <thead className={`border-b ${cardBorder}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${subtitleColor} uppercase tracking-wider`}>
                        Type
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${subtitleColor} uppercase tracking-wider`}>
                        Name
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${subtitleColor} uppercase tracking-wider`}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {deployedResources.map((resource, index) => (
                      <tr key={index}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${titleColor}`}>
                          {resource.type}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${titleColor}`}>
                          {resource.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-green-500 font-medium">{resource.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}