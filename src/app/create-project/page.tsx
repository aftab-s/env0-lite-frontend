"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/context/DarkModeProvider';
import Input from '@/components/TextInput/TextInput';
import { createProject } from '@/services/project/createProject';
import type { CreateProjectPayload } from '@/types/project.types';
import { showSuccessAlert, showErrorAlert } from '@/utils/swal';

export default function CreateProjectPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errors, setErrors] = useState<{ projectName?: string; projectDescription?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const bgColor = darkMode ? 'bg-[#111111]' : 'bg-[#F2ECDD]';
  const subtitleColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const formBgColor = darkMode ? 'bg-[#18181B]' : 'bg-gray-50';
  const titleColor = '#CD9C20'; // Yellow/gold color from the design

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
      await showSuccessAlert('Project created', 'Redirecting to dashboard...', darkMode, {
        timer: 1200,
        showConfirmButton: false
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
      showErrorAlert('Error', msg, darkMode);
    } finally {
      setSubmitting(false);
    }
  }, [projectName, projectDescription, submitting, router, validateForm, darkMode]);

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-start px-4 py-20 transition-colors duration-500`}>
      <div className="w-full flex flex-col items-center gap-6">
        {/* Main Title */}
        <h1 
          className="text-3xl font-bold text-center fontFamily: 'var(--font-montserrat) font-bold'"
          style={{ color: titleColor }}
        >
          Create New Project
        </h1>

        {/* Subtitle */}
        <p className={`text-center text-sm ${subtitleColor} max-w-xl`}>
          Give your infrastructure project a name and description to get started.
        </p>

        {/* Form Container */}
        <div className={`w-full max-w-4xl p-6 prounded-lg ${formBgColor} transition-colors duration-500`}>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold" style={{ color: subtitleColor }}>Project Details</h1>
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
            <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
          </div>
        </div>

        {/* Create Project Button */}
        <button
          onClick={handleCreateProject}
          disabled={submitting}
          className="w-full max-w-md px-8 py-2 rounded-[3px] text-black font-medium transition-colors duration-300 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: titleColor }}
        >
          {submitting ? 'Working...' : 'Create Project'}
        </button>
      </div>
    </div>
  );
}