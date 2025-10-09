'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import TextInput from '@/components/ui/TextInput';
import PasswordInput from '@/components/ui/PasswordInput';
import Sidebar from '@/components/common/Sidebar'; 
import PrivateHeader from '@/components/common/PrivateHeader';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { configureAwsProfileThunk } from '@/redux/slice/Creds/credsSlice';
import Swal from 'sweetalert2';

export default function AWSCredentialsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.creds);
  const { projects } = useSelector((state: RootState) => state.projectList);
  // Prefill project info if available
  const project = projects.find((p) => p.projectId === projectId);
  const [profileName, setProfileName] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [defaultRegion, setDefaultRegion] = useState('');
  // Determine if project is fully created (all steps done)
  const isProjectComplete = Boolean(project && project.csp && project.profile && project.repoUrl);

  const handleSaveCredentials = async () => {
    if (isProjectComplete) return;
    if (!profileName || !accessKeyId || !secretAccessKey) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    try {
      await dispatch(configureAwsProfileThunk({
        projectId: projectId!,
        data: {
          profileName,
          accessKeyId,
          secretAccessKey,
          region: defaultRegion || 'us-east-1',
        },
      })).unwrap();

      await Swal.fire({
        title: 'Success',
        text: 'AWS credentials configured successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      router.push(`/github-repo/${projectId}`);
    } catch {
      Swal.fire({
        title: 'Error',
        text: error || 'Failed to configure AWS credentials.'
      });
    }
  };

  return (
<div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="flex-1 overflow-y-auto">
        <div className="w-full pt-15 pb-15 bg-[#000000]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#CD9C20]">
              AWS Credentials
            </h1>
            <p className="text-lg text-gray-400">
              Configure your AWS credentials to enable infrastructure deployment and management.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Security Notice */}
            <div className="p-4 rounded-lg border mb-8 border-[#FAAD14]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 mt-0.5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">Security Notice</h3>
                  <p className="text-sm text-white">
                    Your credentials are encrypted and stored securely. We recommend using IAM users with minimal required permissions for Terraform operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="rounded-lg border p-8 bg-[#1A1A1A] border-[#232329]">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Enter AWS Credentials
              </h2>

              <div className="space-y-6">
                {/* Profile Name */}
                <div className="flex flex-col w-full">
                  <label className="text-white text-sm mb-2 flex items-center gap-1">
                    Profile Name
                    <span className="relative group cursor-pointer">
                      <Info className="w-4 h-4 text-yellow-500" />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 border border-[#CD9C20] whitespace-nowrap">
                        This should match the profile name in your Terraform code.
                      </span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., production, staging, development"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-[#09090B] border border-[#232329] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4A253]"
                  />
                </div>

                {/* AWS Access Key ID */}
                <TextInput
                  label="AWS Access Key ID"
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                  value={accessKeyId}
                  onChange={(e) => setAccessKeyId(e.target.value)}
                  type="text"
                />

                {/* AWS Secret Access Key */}
                <PasswordInput
                  label="AWS Secret Access Key"
                  value={secretAccessKey}
                  placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                  onChange={(e) => setSecretAccessKey(e.target.value)}
                />

                {/* Default Region */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Default Region
                  </label>
                  <select
                    value={defaultRegion}
                    onChange={(e) => setDefaultRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border outline-none bg-[#000000] border-[#232329] text-white"
                  >
                    <option value="">Select Region</option>
                    <option value="us-east-1">US East (N. Virginia) - us-east-1</option>
                    <option value="us-east-2">US East (Ohio) - us-east-2</option>
                    <option value="us-west-1">US West (N. California) - us-west-1</option>
                    <option value="us-west-2">US West (Oregon) - us-west-2</option>
                    <option value="eu-west-1">Europe (Ireland) - eu-west-1</option>
                    <option value="eu-west-2">Europe (London) - eu-west-2</option>
                    <option value="eu-central-1">Europe (Frankfurt) - eu-central-1</option>
                    <option value="ap-southeast-1">Asia Pacific (Singapore) - ap-southeast-1</option>
                    <option value="ap-southeast-2">Asia Pacific (Sydney) - ap-southeast-2</option>
                    <option value="ap-northeast-1">Asia Pacific (Tokyo) - ap-northeast-1</option>
                  </select>
                </div>
              </div>

              {/* Configuration Preview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Configuration Preview
                </h3>
                <div className="p-4 rounded-lg border space-y-2 bg-[#000000] border-[#232329]">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Profile:</span>
                    <span className={`text-sm ${profileName ? 'text-white' : 'text-gray-400'}`}>
                      {profileName || 'unnamed-profile'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Access Key:</span>
                    <span className={`text-sm ${accessKeyId ? 'text-white' : 'text-gray-400'}`}>
                      {accessKeyId || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Region:</span>
                    <span className={`text-sm ${defaultRegion ? 'text-white' : 'text-gray-400'}`}>
                      {defaultRegion || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleSaveCredentials}
                disabled={loading || isProjectComplete}
                className={`w-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                  loading || isProjectComplete
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-[#F5CB5C] hover:bg-yellow-500 text-black cursor-pointer'
                }`}
              >
                {isProjectComplete ? 'Credentials Already Set' : loading ? 'Saving...' : 'Save Credentials'}
              </button>
            {/* Project Info Preview */}
            {project && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Project Info
                </h3>
                <div className="p-4 rounded-lg border space-y-2 bg-[#000000] border-[#232329]">
                  <div className="flex gap-2">
                    <span className="text-sm text-[#cd9c20]">Project Name:</span>
                    <span className={`text-sm ${project.projectName ? 'text-white' : 'text-gray-400'}`}>
                      {project.projectName || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex gap-6 text-start">
                    <span className="text-sm text-[#cd9c20]">Description:</span>
                    <span className={`text-sm ${project.projectDescription ? 'text-white' : 'text-gray-400'}`}>
                      {project.projectDescription || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}