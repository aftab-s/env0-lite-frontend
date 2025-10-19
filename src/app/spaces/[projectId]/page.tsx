'use client';
import Sidebar from '@/components/common/Sidebar';
import PrivateHeader from '@/components/common/PrivateHeader';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LayoutGrid, GalleryVertical } from 'lucide-react';
import ProfileSettingsModal from '@/components/SettingsModal/ProfileSettingsModal';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { getSpacesByProjectIdThunk } from '@/redux/slice/Projects/SpaceListSlice';
import { Loader } from 'lucide-react';
import { resetBranchAndSyncSpaces } from '@/services/project/pullRepo';
import Swal from 'sweetalert2';

export default function SpacesPage() {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isGallery, setIsGallery] = useState(false);
  const params = useParams();
  const projectId = params.projectId as string;
  const id = params.projectId as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { spaces, loading, error } = useSelector((state: RootState) => state.spaceList);

  // Filter spaces by search (case-insensitive substring match)
  const filteredSpaces = search.trim() === ''
    ? spaces
    : spaces.filter(space =>
        space.spaceName.toLowerCase().includes(search.trim().toLowerCase())
      );

  // Pagination logic
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredSpaces.length / pageSize));
  const pagedSpaces = filteredSpaces.slice((page - 1) * pageSize, page * pageSize);

  // Reset to page 1 if search/filter changes and current page is out of range
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [search, filteredSpaces.length, totalPages, page]);

  useEffect(() => {
    if (projectId) {
      dispatch(getSpacesByProjectIdThunk(projectId));
    }
  }, [projectId, dispatch]);

  const handleRebase = async () => {
    if (!projectId) return;
    // Show loading Swal
    Swal.fire({
      title: 'Rebasing…',
      html: 'Rebasing it to your GitHub code',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: '#0b0b0b',
    });

    const result = await resetBranchAndSyncSpaces(projectId);

    if (result.success) {
      // Refresh spaces after successful rebase/sync
      await dispatch(getSpacesByProjectIdThunk(projectId));
      Swal.fire({
        title: 'Rebased',
        text: 'Repository reset and spaces synced with latest GitHub code.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Rebase failed',
        text: result.error || 'Something went wrong while rebasing.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleToggleLayout = () => {
    setIsGallery((prev) => {
      const next = !prev;
      // Reset page when switching back to grid for a consistent view
      if (!next) setPage(1);
      return next;
    });
  };

  const formatDateTime = (iso?: string | Date | null) => {
    if (!iso) return "Never";
    const d = iso instanceof Date ? iso : new Date(iso);
    if (isNaN(d.getTime())) return "Never";
    const day = String(d.getDate()).padStart(2, "0");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex flex-col items-center justify-center bg-[#0b0b0b]">
            <Loader className="animate-spin text-white mb-4" size={48} />
            <div className="text-white">Loading spaces...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <PrivateHeader />
          <div className="flex-1 flex items-center justify-center bg-[#0b0b0b]">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-black h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <PrivateHeader />
        {/* Warning Box */}
        <div className="w-full px-14 bg-black pt-6">
          <div className="w-full bg-yellow-900/30 border border-yellow-600/40 text-yellow-200 rounded-lg px-6 py-3 mb-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.105-2.045l-6.928-12.02c-.526-.912-1.684-.912-2.21 0l-6.928 12.02c-.553.905.051 2.045 1.105 2.045z"/>
            </svg>
            <span className='text-sm'>
              Make sure you click the <b>Rebase</b> button once any change is pushed to the connected branch here to keep the code up to date.
            </span>
          </div>
        </div>

        {/* Fixed header section */}
        <div className="bg-[#000000] px-14 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white text-4xl font-bold">Spaces</h1>
            {/* Pagination controls in heading row (hidden in gallery mode) */}
            {!isGallery && (
              <div className="flex items-center gap-2">
                <button
                  className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center disabled:opacity-40 hover:border-[#CD9C20] transition"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5 text-[#CD9C20]" />
                </button>
                <div className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center select-none text-white text-base font-semibold">
                  {page}
                </div>
                <button
                  className="border border-[#232329] rounded-lg bg-[#09090B] w-10 h-10 flex items-center justify-center disabled:opacity-40 hover:border-[#CD9C20] transition"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5 text-[#CD9C20]" />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center mb-7 gap-4">
            <input
              type="text"
              placeholder="Search Spaces"
              className="w-full bg-[#09090B] border border-[#27272A] rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button
              variant="primary"
              width="w-55"
              className="ml-auto"
              onClick={() => router.push(`/past-deployments?projectId=${encodeURIComponent(projectId)}`)}
              title="View deployments for this project"
            >
              View Deployment
            </Button>
            <Button variant="rebaseButton" width="w-45" className="ml-auto" onClick={handleRebase}>Rebase</Button>
            <Button variant="extraSetting" width="auto" onClick={() => setShowProfileSettings(true)}>
              <Cog6ToothIcon className="w-5 h-5 text-white" />
            </Button>
              <Button variant="extraSetting" width="auto" className="ml-auto" onClick={handleToggleLayout}>
                {isGallery ? (
                  <GalleryVertical className="w-5 h-5 text-white" />
                ) : (
                  <LayoutGrid className="w-5 h-5 text-white" />
                )}
              </Button>
            {/* Profile Settings Modal */}
            <ProfileSettingsModal isOpen={showProfileSettings} onClose={() => setShowProfileSettings(false)} />
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 bg-[#000000] px-14 overflow-y-auto">
          <div className={isGallery ? "grid grid-cols-1 gap-8 pb-8" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8"}>
            {(isGallery ? filteredSpaces : pagedSpaces).map((space) => (
              <div
                key={space.spaceId}
                className="bg-gradient-to-br from-[#cd9c20]/7 to-black/10 backdrop-blur-md border border-[#232329] rounded-md px-6 py-5 shadow-lg cursor-pointer hover:bg-[#232329]/30 transition"
                onClick={() => router.push(`/terraform-progress/${id}?spaceId=${space.spaceName}`)}
              >
                <div className="flex justify-between items-center pb-2">
                  <div className="text-white text-lg font-semibold">{space.spaceName}</div>
                  <div className="rounded-full w-8 h-8 flex items-center justify-center">
                  </div>
                </div>
                <div className="text-[#A1A1AA] text-xs pb-3">Managed by {space.userName}</div>
                <div className="flex justify-between w-full p-2 items-center bg-[#111111]">
                  <span className="text-[#FFFFFF] text-xs">
                    {space.status === 'deployed' ? 'Last Deployment' : 'Not Deployed'}
                  </span>
                  <span className="text-[#9CA3AF] text-xs">
                    {space.lastRun ? formatDateTime(space.lastRun) : 'Never'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}