'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { updateProjectCsp } from '@/services/csp/selectCsp';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsByOwner } from '@/redux/slice/Projects/projectListByOwnerSlice';
import type { AppDispatch } from '@/redux/store';
import Sidebar from '@/components/Sidebar/page';
import PrivateHeader from '@/components/PrivateHeader/page';

interface CloudProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
}

export default function CloudProviderPage() {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { projects } = useSelector((state: RootState) => state.projectList);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProjectsByOwner());
  }, [dispatch]);

  const cloudProviders: CloudProvider[] = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'Deploy to AWS cloud infrastructure',
      icon: '/cloudProvider/aws.svg',
      popular: true,
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Deploy to Google Cloud infrastructure',
      icon: '/cloudProvider/gcp.svg',
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      description: 'Deploy to Azure cloud infrastructure',
      icon: '/cloudProvider/azure.svg',
    },
  ];

  const handleProviderSelect = async (providerId: string) => {
    // Only allow selection for providers that are not 'gcp' or 'azure'
    if (providerId !== 'gcp' && providerId !== 'azure') {
      const newSelected = selectedProvider === providerId ? '' : providerId;
      setSelectedProvider(newSelected);
      if (providerId === 'aws' && newSelected === 'aws') {
        // For AWS, directly proceed
        if (projects.length > 0) {
          // const projectId = projects[0].projectId;
          setLoading(true);
          setError(null);
          try {
            console.log('Calling updateProjectCsp with projectId:', projectId, 'csp:', providerId);
            await updateProjectCsp(projectId, providerId);
            console.log('API call successful, redirecting to /aws-credentials');
            router.push(`/aws-credentials/${projectId}`);
          } catch (err: unknown) {
            let message = 'Failed to update CSP';
            if (err && typeof err === 'object' && 'response' in err && (err as { response?: { data?: { error?: string } } }).response?.data?.error) {
              message = (err as { response: { data: { error: string } } }).response.data.error;
            }
            console.error('API call failed:', message);
            setError(message);
          } finally {
            setLoading(false);
          }
        } else {
          console.log('No projects available');
        }
      }
    }
  };

  const handleContinue = async () => {
    console.log('handleContinue called, selectedProvider:', selectedProvider, 'projects.length:', projects.length);
    if (selectedProvider && projects.length > 0) {
      // const projectId = projects[0].projectId;
      console.log('Proceeding with projectId:', projectId, 'csp:', selectedProvider);
      setLoading(true);
      setError(null);
      try {
        console.log('Calling updateProjectCsp');
        await updateProjectCsp(projectId, selectedProvider);
        console.log('Success, redirecting');
        router.push(`/aws-credentials/${projectId}`);
      } catch (err: unknown) {
        let message = 'Failed to update CSP';
        if (err && typeof err === 'object' && 'response' in err && (err as { response?: { data?: { error?: string } } }).response?.data?.error) {
          message = (err as { response: { data: { error: string } } }).response.data.error;
        }
        console.error('Error:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Conditions not met: selectedProvider or no projects');
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <PrivateHeader />
        <div className="flex-1 overflow-y-auto">
        <div className="w-full h-full flex flex-col p-10 bg-[#000000]">
          <header className="w-full mt-5 mb-15 text-center">
            <h1 className="text-4xl font-bold text-[#CD9C20] mb-5">
              Choose your Cloud Provider
            </h1>
            <p className="text-base text-gray-400">
              Select the cloud platform where you want to deploy your infrastructure.
            </p>
            <p className="text-base text-gray-400">
              {" Don't worry, you can configure credentials and add more providers in your dashboard later. "}
            </p>
          </header>

          <main className="w-full flex-1 pt-0">
            <div className="w-full max-w-6xl mx-auto">
              {/* Cloud Provider Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {cloudProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`relative p-6 pt-10 rounded-lg border-2 bg-[#1A1A1A] ${
                      provider.id === 'gcp' || provider.id === 'azure'
                        ? 'cursor-not-allowed border-gray-700 hover:bg-gray-700'
                        : `cursor-pointer ${
                            selectedProvider === provider.id
                              ? 'border-[#CD9C20]'
                              : 'border-gray-700 hover:border-gray-600'
                          }`
                    }`}
                    onClick={() => handleProviderSelect(provider.id)}
                  >
                    {/* Coming Soon Overlay for GCP and Azure on Hover */}
                    {(provider.id === 'gcp' || provider.id === 'azure') && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm rounded-lg">
                        <div className="bg-gradient-to-r from-[#F5CB5C] to-[#CD9C20] text-black font-bold text-base px-6 py-2 rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-pulse">
                          Coming Soon
                        </div>
                      </div>
                    )}

                    {/* Provider Icon */}
                    <div className="flex justify-start mb-2 mt-2">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <Image
                          src={provider.icon}
                          alt={`${provider.name} logo`}
                          width={80}
                          height={35}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {provider.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {selectedProvider === provider.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-[#CD9C20] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Continue Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleContinue}
                  disabled={!selectedProvider || loading}
                  className={`px-15 py-3 rounded-lg font-medium text-sm flex items-center gap-2 ${
                    selectedProvider && !loading
                      ? 'bg-[#F5CB5C] hover:bg-[#CD9C20] text-black cursor-pointer'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {loading && <Loader className="animate-spin" size={16} />}
                  {loading ? 'Updating...' : 'Continue with the selection'}
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-15 py-3 rounded-lg font-medium transition-all duration-200 text-sm bg-[#CD9C20] hover:bg-[#b5871c] text-black cursor-pointer"
                >
                  Go to Dashboard
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </div>
          </main>
        </div>
      </div>
      </div>
    </div>
  );
}