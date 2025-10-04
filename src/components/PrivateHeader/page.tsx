'use client';

import { TbBellRinging } from 'react-icons/tb';

export default function Header() {
  return (
    <header className="bg-[#0b0b0b] border-b border-[#1F2228] px-4 py-3">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-full cursor-pointer">
            <TbBellRinging size={24} color="#E5E7EB" />
          </button>
        </div>
      </div>
    </header>
  );
}