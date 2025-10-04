'use client';
import { TbBellRinging } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
}

const Header = ({ darkMode }: HeaderProps) => {
  const headerBg = darkMode ? 'bg-[#000000]' : 'bg-[#FFFFFF]';
  const bellIconColor = darkMode ? '#E5E7EB' : '#6B7280';
  const circleColor = darkMode ? '#FFFFFF' : '#E5E7EB';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <header
      className={`${headerBg} ${borderColor} border-b border-b-[#e4e4e4] px-6 py-4 transition-colors duration-500`}
    >
      <div className="flex items-center justify-end">
        {/* Notification Bell */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <TbBellRinging 
              size={24} 
              color={bellIconColor}
            />
          </button>
          
          {/* Temporary */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <FaCircle 
                size={32} 
                color={circleColor}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;