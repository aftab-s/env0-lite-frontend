'use client';

import { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeProvider';
import { Info } from 'lucide-react';
import TextInput from '@/components/TextInput/TextInput';
import PasswordInput from '@/components/PasswordInput/PasswordInput';

export default function AWSCredentialsPage() {
  const { darkMode } = useDarkMode();
  const [profileName, setProfileName] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [defaultRegion, setDefaultRegion] = useState('');

  const handleSaveCredentials = () => {
    console.log('Saving credentials...');
  };


  // Dynamic styling based on dark mode
  const bgColor = darkMode ? 'bg-[#000000]' : 'bg-[#EFEFEF]';
  const titleTextColor = darkMode ? 'text-[#CD9C20]' : 'text-black';
  const textColor = darkMode ? 'text-white' : 'text-black';
  const subtitleColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-[#000000]' : 'bg-gray-50';
  const inputBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const inputText = darkMode ? 'text-white' : 'text-black';
  const cardBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50';
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const noticeColor = darkMode ? 'text-white' : 'text-yellow-600';
  const noticeBorder = darkMode ? 'border-[#FAAD14]' : 'border-yellow-300';

  return (
    <div className={`w-full transition-colors duration-500 pt-15 pb-15 ${bgColor}`}>

      {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-500 ${titleTextColor}`}>
            AWS Credentials
          </h1>
          <p className={`text-lg transition-colors duration-500 ${subtitleColor}`}>
            Configure your AWS credentials to enable infrastructure deployment and management.
          </p>
        </div>


      <div className="max-w-2xl mx-auto ">

        {/* Security Notice */}
        <div className={`p-4 rounded-lg border mb-8 transition-colors duration-500 ${noticeBorder}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 mt-0.5 text-yellow-600`} />
            <div>
              <h3 className={`font-semibold mb-1 ${noticeColor}`}>Security Notice</h3>
              <p className={`text-sm ${noticeColor}`}>
                Your credentials are encrypted and stored securely. We recommend using IAM users with minimal required permissions for Terraform operations.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={`rounded-lg border p-8 transition-colors duration-500 ${cardBg} ${cardBorder}`}>
                  <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${textColor}`}>
                    Enter AWS Credentials
                  </h2>
        
                  <div className="space-y-6">
                    {/* Profile Name */}
                    <TextInput
                      label="Profile Name"
                      placeholder="e.g., production, staging, development"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      type="text"
                    />
        
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
                      <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${textColor}`}>
                        Default Region
                      </label>
                      <select
                        value={defaultRegion}
                        onChange={(e) => setDefaultRegion(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-500 outline-none ${inputBg} ${inputBorder} ${inputText}`}
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
                    <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${textColor}`}>
                      Configuration Preview
                    </h3>
                    <div className={`p-4 rounded-lg border space-y-2 transition-colors duration-500 ${inputBg} ${inputBorder}`}>
                      <div className="flex justify-between">
                        <span className={`text-sm transition-colors duration-500 ${subtitleColor}`}>Profile:</span>
                        <span className={`text-sm transition-colors duration-500 ${profileName ? textColor : subtitleColor}`}>
                          {profileName || 'unnamed-profile'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm transition-colors duration-500 ${subtitleColor}`}>Access Key:</span>
                        <span className={`text-sm transition-colors duration-500 ${accessKeyId ? textColor : subtitleColor}`}>
                          {accessKeyId || 'Not provided'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm transition-colors duration-500 ${subtitleColor}`}>Region:</span>
                        <span className={`text-sm transition-colors duration-500 ${defaultRegion ? textColor : subtitleColor}`}>
                          {defaultRegion || 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

        {/* Save Button */}
<div className="max-w-2xl mx-auto mt-6 text-center">
  <button
    onClick={handleSaveCredentials}
    className="w-100 bg-[#F5CB5C] hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
  >
    Save Credentials
  </button>
</div>

      </div>
    </div>
  );
}