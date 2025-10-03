"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#000000] border-b border-gray-700 flex items-center justify-between px-4 py-3">
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
    </header>
  );
}