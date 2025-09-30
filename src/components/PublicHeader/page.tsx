"use client";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeProvider";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import Link from "next/link";

export default function Header() {
  const { darkMode } = useDarkMode();
  const headerBg = darkMode ? 'bg-[#000000]' : 'bg-[#FFFFFF]';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';


  return (
    <header
      className={`${headerBg} ${borderColor} flex items-center justify-between px-4 py-3 transition-colors duration-500`}
    >

      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/login/logo-full.svg"
            alt="Logo"
            width={130}
            height={40}
            priority
          />
        </Link>
      </div>
      <DarkModeToggle />
    </header>
  );
}