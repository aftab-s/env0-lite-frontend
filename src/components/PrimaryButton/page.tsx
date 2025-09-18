"use client";
import React, { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const { darkMode } = useDarkMode();

  const bgColor = darkMode ? "bg-white" : "bg-black";
  const textColor = darkMode ? "text-black" : "text-white";
  const hoverBg = darkMode ? "hover:bg-gray-200" : "hover:bg-gray-800";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-[14px] rounded-[5px] py-2 font-medium ${bgColor} ${textColor} ${hoverBg} disabled:opacity-50 disabled:cursor-not-allowed ${className} `}
    >
      {children}
    </button>
  );
}
