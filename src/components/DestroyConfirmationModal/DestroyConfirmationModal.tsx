import React from 'react';
import { Loader } from 'lucide-react';


interface DestroyConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deploymentName: string;
  isLoading: boolean;
}

const DestroyConfirmationModal: React.FC<DestroyConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deploymentName,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-[3px]"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
        <div className="bg-[#18181B] border border-[#333333] rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600/10 to-transparent border-b border-[#333333] p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Confirm Destroy</h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    {isLoading ? 'Destroying resources...' : 'Confirm destruction of deployment resources'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-[#A1A1AA] mb-4">
              You are about to destroy the following deployment:
            </p>

            {/* Deployment Info Card */}
            <div className="bg-black/40 border border-[#292929] rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A1A1AA] mb-1">Deployment</div>
                  <div className="text-base font-semibold text-white break-all">
                    {deploymentName}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning banner */}
            <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-3 flex gap-2">
              <svg
                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-xs text-red-600">
                This action will permanently delete all resources associated with this deployment. This cannot be undone.
              </p>
            </div>

            {/* Status Section */}
            {isLoading && (
              <div className="bg-black/40 border border-[#292929] rounded-lg p-4 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <Loader className="animate-spin h-6 w-6 text-red-600" />
                  <p className="text-sm text-white">Destroying...</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-black/20 border-t border-[#333333] p-6 flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#18181B] border border-[#333333] rounded-lg transition-colors duration-200 cursor-pointer ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1F2228]'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg cursor-pointer ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-red-600 hover:bg-red-700 shadow-red-600/20 hover:shadow-red-600/40'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestroyConfirmationModal;