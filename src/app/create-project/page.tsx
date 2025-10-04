'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/TextInput/TextInput';
import { createProject } from '@/services/project/createProject';
import type { CreateProjectPayload } from '@/types/project.types';
import Swal from 'sweetalert2';
import PublicHeader from '@/components/PublicHeader/page';

export default function CreateProjectPage() {
  const router = useRouter();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errors, setErrors] = useState<{ projectName?: string; projectDescription?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: { projectName?: string; projectDescription?: string } = {};
    if (!projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [projectName, projectDescription]);

  const handleCreateProject = useCallback(async () => {
    if (!validateForm() || submitting) return;
    setSubmitting(true);
    const payload: CreateProjectPayload = { projectName, projectDescription };
    try {
      await createProject(payload);
      await Swal.fire({
        icon: 'success',
        title: 'Project created',
        text: 'Redirecting to dashboard...',
        timer: 1200,
        showConfirmButton: false,
      });
      router.push('/dashboard');
    } catch (e: unknown) {
      let msg = 'Failed to create project';
      if (e && typeof e === 'object' &&
        // @ts-expect-error axios shape
        e.response?.data?.error) {
        // @ts-expect-error axios shape
        msg = e.response.data.error as string;
      }
      Swal.fire({ icon: 'error', title: 'Error', text: msg, confirmButtonColor: '#CD9C20' });
    } finally {
      setSubmitting(false);
    }
  }, [projectName, projectDescription, submitting, router, validateForm]);

  return (
    <div className="flex flex-col w-full h-screen">
      <PublicHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="w-full bg-[#111111] flex flex-col items-center justify-start px-4 py-20">
          <div className="w-full flex flex-col items-center gap-6">
            {/* Main Title */}
            <h1 
              className="text-3xl font-bold text-center"
              style={{ color: '#CD9C20', fontFamily: 'var(--font-montserrat)' }}
            >
              Create New Project
            </h1>

            {/* Subtitle */}
            <p className="text-center text-sm text-gray-300 max-w-xl">
              Give your infrastructure project a name and description to get started.
            </p>

            {/* Form Container */}
            <div className="w-full max-w-4xl p-6 rounded-lg bg-[#18181B]">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-gray-300">Project Details</h1>
                {/* Project Name Field */}
                <Input
                  label="Project Name"
                  placeholder="e.g., Production Infrastructure, Dev Environment"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                {errors.projectName && (
                  <p className="text-red-500 text-xs -mt-2" role="alert">{errors.projectName}</p>
                )}

                {/* Project Description Field */}
                <Input
                  label="Project Description"
                  placeholder="Describe what this project will develop and manage"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                {errors.projectDescription && (
                  <p className="text-red-500 text-xs -mt-2" role="alert">{errors.projectDescription}</p>
                )}

                {/* Divider */}
                <hr className="my-4 border-t border-gray-700" />
              </div>
            </div>

            {/* Create Project Button */}
            <button
              onClick={handleCreateProject}
              disabled={submitting}
              className="w-full max-w-md px-8 py-2 rounded-[3px] text-black font-medium hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#CD9C20' }}
            >
              {submitting ? 'Working...' : 'Create Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}