"use client";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeProvider";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import Link from "next/link";

export default function Header() {
  const { darkMode } = useDarkMode();

  const bgColor = darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]";
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <header
      className={`flex items-center justify-between w-full px-4 py-3 transition-colors duration-500 ${bgColor}`}
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
            <Image
            src="/login/Logo.svg"
            alt="Logo"
            width={30}
            height={35}
            priority
            />
            <span className={`font-semibold text-lg ${textColor}`}>
            TerraFuel
            </span>
        </Link>
        </div>

      <DarkModeToggle />
    </header>
  );
}
