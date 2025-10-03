'use client';

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

  return (
    <div className="w-full bg-[#111111]">
      {/* Main Content */}
      <div className="w-full p-10 bg-[#000000]">
        <header className="w-full mb-10">
          <h1 className="text-3xl font-bold text-white">
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
                <div className="flex items-center gap-2 px-3 py-1 bg-[#0e3120] rounded-full">
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
                <p className="text-sm text-gray-400">
                  Duration: {deploymentData.duration}
                </p>
                <p className="text-sm text-gray-400">
                  Completed: {deploymentData.completed}
                </p>
              </div>

              {/* Overview Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Overview</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Project Name:</span>
                    <span className="text-sm text-white">{deploymentData.projectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Platform:</span>
                    <span className="text-sm text-white">{deploymentData.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Repository:</span>
                    <span className="text-sm text-white">{deploymentData.repository}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Branch:</span>
                    <span className="text-sm text-white">{deploymentData.branch}</span>
                  </div>
                </div>
              </div>

              {/* Terraform Outputs Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Terraform Outputs</h2>
                
                <div className="space-y-4">
                  {terraformOutputs.map((output, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-[#1A1A1A] border border-gray-700"
                    >
                      <div className="text-sm font-medium text-white mb-1">
                        {output.key}
                      </div>
                      <div className="text-sm font-mono text-gray-400">
                        {output.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deployed Resources */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Deployed Resources</h2>
              
              <div className="rounded-lg border border-gray-700 overflow-hidden bg-[#1A1A1A]">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {deployedResources.map((resource, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {resource.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
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