'use client';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { logout } from '@/redux/slice/Auth/loginSlice';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import SettingsModal from '@/components/SettingsModal/SettingsModal';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  // Fetch name and email from cookies on mount
  useEffect(() => {
    setName(Cookies.get('name'));
    setEmail(Cookies.get('email'));
  }, []);

  const menuItems = [
    { icon: '/sidebar/projects.svg', name: 'Projects', route: '/projects' },
    { icon: '/sidebar/deployments.svg', name: 'Deployments', route: '/past-deployments' },
    { icon: '/sidebar/settings.svg', name: 'Settings', route: null },
  ];

  const getActiveItem = () => {
    const item = menuItems.find(item => item.route === pathname);
    return item ? item.name : 'Projects';
  };

  const activeItem = getActiveItem();

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

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.name === 'Settings') {
      setIsSettingsOpen(true);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col ${
          isOpen ? 'w-65' : 'w-16'
        } h-screen bg-[#000000] border-r border-[#232329] transition-all duration-300 ease-in-out`}
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
                    activeItem === item.name
                      ? 'bg-[#2A2A2A] text-yellow-500'
                      : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
                  } ${!isOpen ? 'justify-center' : ''}`}
                  title={!isOpen ? item.name : ''}
                  onClick={() => handleMenuClick(item)}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={18}
                    height={18}
                    className={`shrink-0 ${
                      activeItem === item.name
                        ? 'brightness-0 saturate-100 invert-[0.5] sepia hue-rotate-[25deg]'
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
        
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default Sidebar;