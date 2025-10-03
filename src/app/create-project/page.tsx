'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/TextInput/TextInput';

export default function CreateProjectPage() {
  const router = useRouter();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errors, setErrors] = useState<{
    projectName?: string;
    projectDescription?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { projectName?: string; projectDescription?: string } = {};
    
    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // TODO: Implement save functionality
      console.log('Saving project:', { projectName, projectDescription });
    }
  };

  const handleCreateProject = () => {
    if (validateForm()) {
      // TODO: Implement create project functionality
      console.log('Creating project:', { projectName, projectDescription });
      // For now, redirect to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-start px-4 py-20">
      <div className="w-full flex flex-col items-center gap-6">
        {/* Main Title */}
        <h1 
          className="text-3xl font-bold text-center fontFamily: 'var(--font-montserrat) font-bold'"
          style={{ color: '#CD9C20' }}
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

            {/* Project Description Field */}
            <Input
              label="Project Description"
              placeholder="Describe what this project will develop and manage"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />

            {/* Divider */}
            <hr className="my-4 border-t border-gray-700" />

            {/* Save Button */}
            <div className="flex justify-start">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-[5px] text-black font-medium transition-colors duration-300 hover:opacity-80"
                style={{ backgroundColor: '#CD9C20' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Create Project Button */}
        <button
          onClick={handleCreateProject}
          className="w-full max-w-md px-8 py-2 rounded-[3px] text-black font-medium transition-colors duration-300 hover:opacity-80"
          style={{ backgroundColor: '#CD9C20' }}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}