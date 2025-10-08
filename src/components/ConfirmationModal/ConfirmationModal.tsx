import React from 'react';


interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  repositoryName: string;
  branchName: string;
  ownerName?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  repositoryName,
  branchName,
  ownerName,
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
          <div className="relative bg-gradient-to-r from-[#CD9C20]/10 to-transparent border-b border-[#333333] p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#CD9C20]/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#CD9C20]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Confirm Selection
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Review your repository and branch
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
              You are about to connect the following repository and branch:
            </p>

            {/* Repository Info Card */}
            <div className="bg-black/40 border border-[#292929] rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#CD9C20]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A1A1AA] mb-1">Repository</div>
                  <div className="text-base font-semibold text-white break-all">
                    {repositoryName}
                  </div>
                  {ownerName && (
                    <div className="text-xs text-[#A1A1AA] mt-1">
                      Owner: {ownerName}
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-[#292929]" />

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#CD9C20]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A1A1AA] mb-1">Branch</div>
                  <div className="text-base font-semibold text-white break-all">
                    {branchName}
                  </div>
                </div>
              </div>
            </div>

            {/* Info banner */}
            <div className="bg-[#CD9C20]/10 border border-[#CD9C20]/30 rounded-lg p-3 flex gap-2">
              <svg
                className="w-5 h-5 text-[#CD9C20] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-[#CD9C20]">
                After confirmation your repository will be cloned to Terraform container.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-black/20 border-t border-[#333333] p-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#18181B] border border-[#333333] rounded-lg hover:bg-[#1F2228] transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-black bg-[#CD9C20] rounded-lg hover:bg-[#E5B040] transition-all duration-200 shadow-lg shadow-[#CD9C20]/20 hover:shadow-[#CD9C20]/40 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;