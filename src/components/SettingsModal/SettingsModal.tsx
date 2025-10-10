'use client';
import { useState } from 'react';
import { X, SlidersHorizontal, Shield, User, Github } from 'lucide-react'; // Added Github icony
import GeneralSettings from '@/components/Logic/Settings/GeneralSettings';
import SecuritySettings from '@/components/Logic/Settings/SecuritySettings';
import AccountSettings from '@/components/Logic/Settings/AccountSettings';
import GithubPatSettings from '@/components/Logic/Settings/GithubPatSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'General' | 'Security' | 'Account' | 'Github PAT'; // Added 'Github PAT'

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [patToken, setPatToken] = useState('');


  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <GeneralSettings
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
          />
        );
      case 'Security':
        return (
          <SecuritySettings
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />
        );
      case 'Account':
        return <AccountSettings />;
      case 'Github PAT':
        return (
          <GithubPatSettings
            patToken={patToken}
            setPatToken={setPatToken}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-[900px] h-[600px] bg-[#0A0A0A] rounded-2xl shadow-2xl overflow-hidden flex border border-gray-800">
        {/* Settings Sidebar */}
        <div className="w-[280px] bg-black border-r border-gray-800 flex flex-col">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-gray-400 rounded-full shrink-0"
                >
                  <path
                    fill="currentColor"
                    d="M12 11q.825 0 1.413-.588Q14 9.825 14 9t-.587-1.413Q12.825 7 12 7q-.825 0-1.412.587Q10 8.175 10 9q0 .825.588 1.412Q11.175 11 12 11Zm0 2q-1.65 0-2.825-1.175Q8 10.65 8 9q0-1.65 1.175-2.825Q10.35 5 12 5q1.65 0 2.825 1.175Q16 7.35 16 9q0 1.65-1.175 2.825Q13.65 13 12 13Zm0 11q-2.475 0-4.662-.938q-2.188-.937-3.825-2.574Q1.875 18.85.938 16.663Q0 14.475 0 12t.938-4.663q.937-2.187 2.575-3.825Q5.15 1.875 7.338.938Q9.525 0 12 0t4.663.938q2.187.937 3.825 2.574q1.637 1.638 2.574 3.825Q24 9.525 24 12t-.938 4.663q-.937 2.187-2.574 3.825q-1.638 1.637-3.825 2.574Q14.475 24 12 24Zm0-2q1.8 0 3.375-.575T18.25 19.8q-.825-.925-2.425-1.612q-1.6-.688-3.825-.688t-3.825.688q-1.6.687-2.425 1.612q1.3 1.05 2.875 1.625T12 22Zm-7.7-3.6q1.2-1.3 3.225-2.1q2.025-.8 4.475-.8q2.45 0 4.463.8q2.012.8 3.212 2.1q1.1-1.325 1.713-2.95Q22 13.825 22 12q0-2.075-.788-3.887q-.787-1.813-2.15-3.175q-1.362-1.363-3.175-2.151Q14.075 2 12 2q-2.05 0-3.875.787q-1.825.788-3.187 2.151Q3.575 6.3 2.788 8.113Q2 9.925 2 12q0 1.825.6 3.463q.6 1.637 1.7 2.937Z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{'Bagel User'}</h3>
                <p className="text-gray-400 text-sm">{'you@bagel.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('General')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'General'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  General
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Security')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'Security'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  <Shield size={18} />
                  Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Account')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'Account'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  <User size={18} />
                  Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Github PAT')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'Github PAT'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  <Github size={18} />
                  Github PAT
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with Close Button */}
          <div className="flex justify-end p-6 pb-0">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 px-8 py-6 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
