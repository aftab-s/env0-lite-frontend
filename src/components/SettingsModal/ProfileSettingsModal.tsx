import { useState } from 'react';
import { X } from 'lucide-react';
// Removed Logo import; use public path string for next/image
import Image from 'next/image';
import { useParams } from 'next/navigation';
import AWSProfileSettings from '@/components/Logic/Profiles/AWSProfileSettings';
import DeleteProjectSettings from '@/components/Logic/Profiles/DeleteProjectSettings';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProfileSettingsTab = 'AWS Profile' | 'Delete Project';

const ProfileSettingsModal = ({ isOpen, onClose }: ProfileSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<ProfileSettingsTab>('AWS Profile');
  const params = useParams();
  const spaceName = params?.projectId || 'Space Name';

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'AWS Profile':
        return <AWSProfileSettings />;
      case 'Delete Project':
        return <DeleteProjectSettings />;
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
        {/* Sidebar */}
        <div className="w-[280px] bg-black border-r border-gray-800 flex flex-col">
          {/* Space Info Section */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white">
                <Image src="/Login/logo-icon.svg" alt="Logo" width={40} height={40} priority />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate max-w-[120px]">{spaceName.length > 12 ? spaceName.slice(0, 10) + '...' : spaceName}</h3>
                <p className="text-gray-400 text-sm truncate">Project Space Settings</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('AWS Profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'AWS Profile'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  AWS Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Delete Project')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === 'Delete Project'
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                >
                  Delete Project
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 px-6 py-4 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
