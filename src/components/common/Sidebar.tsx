'use client';
import Image from 'next/image';

interface SidebarProps {
  darkMode: boolean;
}

const Sidebar = ({ darkMode }: SidebarProps) => {
  const sidebarBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]';
  const logoText = darkMode ? 'text-white' : 'text-black';
  const menuItemBg = darkMode ? 'bg-[#374151]' : 'bg-[#E5E7EB]';
  const menuItemText = darkMode ? 'text-white' : 'text-[#374151]';
  const activeMenuBg = darkMode ? 'bg-[#0070F3]' : 'bg-[#EFF6FF]';
  const activeMenuText = darkMode ? 'text-[#FFFFFF]' : 'text-[#2563EB]';


  const inactiveMenuText = darkMode ? 'text-gray-400' : 'text-[#6B7280]';

  const menuItems = [
    { name: 'Projects', active: true },
    { name: 'Deployments', active: false },
    { name: 'Settings', active: false },
    { name: 'Team', active: false },
  ];

  return (
    <div
      className={`w-48 h-screen ${sidebarBg} border-r ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } transition-colors duration-500`}
    >
      {/* Logo Section */}
      <div className="flex items-center px-4 py-6">
        <Image src="/login/Logo.svg" alt="Logo" width={30} height={38} priority className="mr-2" />
        <span
          className={`font-inter font-semibold text-base ${logoText} transition-colors duration-500`}
        >
          Fuel
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-inter font-medium transition-colors duration-300 cursor-pointer ${
                  item.active
                    ? `${activeMenuBg} ${activeMenuText}`
                    : `hover:${menuItemBg} ${inactiveMenuText} hover:${menuItemText}`
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
