'use client';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { logout } from '@/redux/slice/Auth/loginSlice';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { username, email } = useSelector((state: RootState) => ({
    username: state.auth.username,
    email: state.auth.email,
  }));
  const [isOpen, setIsOpen] = useState(true);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const menuItems = [
    { icon: '/sidebar/projects.svg', name: 'Projects', active: true },
    { icon: '/sidebar/deployments.svg', name: 'Deployments', active: false },
    { icon: '/sidebar/team.svg', name: 'Team', active: false },
    { icon: '/sidebar/settings.svg', name: 'Settings', active: false },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SidebarToggleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="text-gray-400 hover:text-white"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.416 4.767a2.65 2.65 0 0 0-2.65 2.65v8.832a2.65 2.65 0 0 0 2.65 2.65h1.461V4.767h-1.46Zm0-1.767A4.416 4.416 0 0 0 2 7.416v8.833a4.416 4.416 0 0 0 4.416 4.417h11.168A4.416 4.416 0 0 0 22 16.248V7.416A4.416 4.416 0 0 0 17.584 3zm3.228 1.767v14.132h7.94a2.65 2.65 0 0 0 2.65-2.65V7.416a2.65 2.65 0 0 0-2.65-2.65h-7.94Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  const displayName = username || 'User';
  const displayEmail = email || 'user@gmail.com';

  return (
    <div
      className={`flex flex-col ${
        isOpen ? 'w-65' : 'w-16'
      } h-screen bg-[#1A1A1A] border-r border-gray-700 transition-all duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-4 py-4">
        <div
          className="flex items-center cursor-pointer"
          onMouseEnter={() => !isOpen && setIsLogoHovered(true)}
          onMouseLeave={() => !isOpen && setIsLogoHovered(false)}
          onClick={() => !isOpen && toggleSidebar()}
        >
          {isOpen ? (
            <>
              <Image
                src="/login/logo-full.svg"
                alt="Logo"
                width={130}
                height={40}
                priority
                className="mr-1"
              />
            </>
          ) : (
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              {isLogoHovered ? (
                <SidebarToggleIcon />
              ) : (
                <Image src="/login/logo-icon.svg" alt="Logo" width={40} height={40} priority />
              )}
            </div>
          )}
        </div>

        {/* Toggle button - only visible when sidebar is open */}
        {isOpen && (
          <button onClick={toggleSidebar} className="p-1 rounded-md cursor-pointer">
            <SidebarToggleIcon />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 py-5 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`group flex items-center gap-3 w-full text-left px-2 py-2 rounded-md text-sm font-inter font-medium cursor-pointer ${
                  item.active
                    ? 'bg-[#2A2A2A] text-white'
                    : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                } ${!isOpen ? 'justify-center' : ''}`}
                title={!isOpen ? item.name : ''}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={18}
                  height={18}
                  className={`shrink-0 ${
                    item.active
                      ? 'brightness-0 saturate-100 invert-[1]'
                      : 'brightness-0 saturate-100 invert-[0.6] group-hover:brightness-0 group-hover:saturate-100 group-hover:invert-[1]'
                  }`}
                />
                {isOpen && item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Div */}
      <div className="border-t border-gray-700 mt-auto">
        <div
          className={`group flex items-center justify-between gap-3 px-2 py-2 text-sm font-inter font-medium text-gray-400 hover:bg-[#2A2A2A] hover:text-white ${
            !isOpen ? 'justify-center' : ''
          }`}
          title={!isOpen ? displayName : ''}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogout();
            }
          }}
        >
          {/* Profile Info Div */}
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="text-gray-400 hover:text-white rounded-full shrink-0"
            >
              <path
                fill="currentColor"
                d="M12 11q.825 0 1.413-.588Q14 9.825 14 9t-.587-1.413Q12.825 7 12 7q-.825 0-1.412.587Q10 8.175 10 9q0 .825.588 1.412Q11.175 11 12 11Zm0 2q-1.65 0-2.825-1.175Q8 10.65 8 9q0-1.65 1.175-2.825Q10.35 5 12 5q1.65 0 2.825 1.175Q16 7.35 16 9q0 1.65-1.175 2.825Q13.65 13 12 13Zm0 11q-2.475 0-4.662-.938q-2.188-.937-3.825-2.574Q1.875 18.85.938 16.663Q0 14.475 0 12t.938-4.663q.937-2.187 2.575-3.825Q5.15 1.875 7.338.938Q9.525 0 12 0t4.663.938q2.187.937 3.825 2.574q1.637 1.638 2.574 3.825Q24 9.525 24 12t-.938 4.663q-.937 2.187-2.574 3.825q-1.638 1.637-3.825 2.574Q14.475 24 12 24Zm0-2q1.8 0 3.375-.575T18.25 19.8q-.825-.925-2.425-1.612q-1.6-.688-3.825-.688t-3.825.688q-1.6.687-2.425 1.612q1.3 1.05 2.875 1.625T12 22Zm-7.7-3.6q1.2-1.3 3.225-2.1q2.025-.8 4.475-.8q2.45 0 4.463.8q2.012.8 3.212 2.1q1.1-1.325 1.713-2.95Q22 13.825 22 12q0-2.075-.788-3.887q-.787-1.813-2.15-3.175q-1.362-1.363-3.175-2.151Q14.075 2 12 2q-2.05 0-3.875.787q-1.825.788-3.187 2.151Q3.575 6.3 2.788 8.113Q2 9.925 2 12q0 1.825.6 3.463q.6 1.637 1.7 2.937Z"
              />
            </svg>
            {isOpen && (
              <div className="flex flex-col text-left">
                <span className="text-white font-semibold">{displayName}</span>
                <span className="text-xs text-gray-400">{displayEmail}</span>
              </div>
            )}
          </div>
          {/* Logout Icon Div */}
          {isOpen && (
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut
                size={18}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;