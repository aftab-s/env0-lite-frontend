'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { updateProjectCsp } from '@/services/csp/selectCsp';
import Swal from 'sweetalert2';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsByOwner } from '@/redux/slice/Projects/projectListByOwnerSlice';
import type { AppDispatch } from '@/redux/store';
import Sidebar from '@/components/common/Sidebar';
import PrivateHeader from '@/components/common/PrivateHeader';

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
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

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

  const handleProviderSelect = (providerId: string) => {
    // Only allow selection for providers that are not 'gcp' or 'azure'
    if (providerId === 'gcp' || providerId === 'azure') return;
    // Always set selectedProvider and then proceed
    setSelectedProvider(providerId);
    if (providerId === 'aws' && projects.length > 0) {
      // Use an IIFE to avoid async issues with setState
      (async () => {
        try {
          Swal.fire({
            title: 'Adding Provider to your Bagel',
            html: '<div class="flex justify-center items-center"><svg class="animate-spin h-15 w-8 text-yellow-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></div>',
            icon: undefined,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          await updateProjectCsp(projectId, providerId);
          await new Promise(res => setTimeout(res, 2000));
          Swal.close();
          router.push(`/aws-credentials/${projectId}`);
        } catch (err: unknown) {
          let message = 'Failed to update CSP';
          if (err && typeof err === 'object' && 'response' in err && (err as { response?: { data?: { error?: string } } }).response?.data?.error) {
            message = (err as { response: { data: { error: string } } }).response.data.error;
          }
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Failed to add provider',
            text: message,
            confirmButtonColor: '#CD9C20',
          });
        }
      })();
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
              {" Don't worry, you can configure credentials and add more providers in your project later. "}
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
                        ? 'cursor-not-allowed border-[#232329] hover:bg-gray-700'
                        : `cursor-pointer ${
                            selectedProvider === provider.id
                              ? 'border-[#CD9C20]'
                              : 'border-[#232329] hover:border-[#ffcd4f]'
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
            </div>
          </main>
        </div>
      </div>
      </div>
    </div>
  );
}