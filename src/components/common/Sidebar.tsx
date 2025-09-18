'use client';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeProvider';

const Sidebar = () => {
  const { darkMode } = useDarkMode();

  const sidebarBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const logoText = darkMode ? 'text-white' : 'text-black';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const inactiveMenuText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inactiveMenuHoverBg = darkMode ? 'hover:bg-[#374151]' : 'hover:bg-gray-100';
  const inactiveMenuHoverText = darkMode ? 'hover:text-white' : 'hover:text-black';
  const activeMenuBg = darkMode ? 'bg-[#0070F3]' : 'bg-[#EFF6FF]';
  const activeMenuText = darkMode ? 'text-white' : 'text-[#2563EB]';

  const menuItems = [
    { name: 'Projects', active: true },
    { name: 'Deployments', active: false },
    { name: 'Settings', active: false },
    { name: 'Team', active: false },
  ];

  return (
    <div
      className={`w-65 h-screen ${sidebarBg} border-r ${borderColor} transition-colors duration-500`}
    >

      {/* Navigation Menu */}
      <nav className="px-3 py-5">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-inter font-medium transition-colors duration-300 cursor-pointer ${
                  item.active
                    ? `${activeMenuBg} ${activeMenuText}`
                    : `${inactiveMenuText} ${inactiveMenuHoverBg} ${inactiveMenuHoverText}`
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
