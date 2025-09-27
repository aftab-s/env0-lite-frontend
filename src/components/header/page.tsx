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
      className={`flex items-center justify-between w-full px-4 transition-colors duration-500 ${bgColor}`}
      style={{ height: "40px", minHeight: "40px", maxHeight: "40px" }}
    >
      <div className="flex items-center gap-2 h-full">
        <Link href="/" className="flex items-center gap-2 h-full">
          <Image
            src="/Logo/BagelLogo.svg"
            alt="Logo"
            width={80}
            height={55}
            priority
            style={{ maxHeight: "38px", height: "100%", width: "auto" }}
          />
        </Link>
      </div>

      <DarkModeToggle />
    </header>
  );
}
