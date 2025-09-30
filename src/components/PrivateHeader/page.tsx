'use client';

import { TbBellRinging } from 'react-icons/tb';
import { useDarkMode } from "@/context/DarkModeProvider";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";

export default function Header() {
  
  const { darkMode } = useDarkMode();

  const headerBg = darkMode ? 'bg-[#000000]' : 'bg-[#FFFFFF]';
  const IconColor = darkMode ? '#E5E7EB' : '#6B7280';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <header
      className={`${headerBg} ${borderColor} border-b px-4 py-3 transition-colors duration-500`}
    >
      <div className="flex items-center justify-end">

        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-full transition-colors duration-200 cursor-pointer">
            <TbBellRinging size={24} color={IconColor} />
          </button>
          
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};
