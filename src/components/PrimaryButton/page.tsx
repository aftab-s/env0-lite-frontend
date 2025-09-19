'use client';
import React, { ReactNode } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const { darkMode } = useDarkMode();

  let bgColor = "";
  let textColor = "";
  let border = "";
  let hoverBg = "";
  let widthClass = "w-full"; // default full width for primary

  switch (variant) {
    case "primary":
      bgColor = darkMode ? "bg-white" : "bg-black";
      textColor = darkMode ? "text-black" : "text-white";
      hoverBg = darkMode ? "hover:bg-gray-200" : "hover:bg-gray-800";
      border = "border-none";
      widthClass = "w-full"; // full width
      break;
    case "secondary":
      bgColor = "bg-transparent";
      textColor = darkMode ? "text-white" : "text-black";
      border = "border border-[#4B5563]";
      hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
      widthClass = "w-auto px-4"; // smaller width
      break;
    case "tertiary":
      bgColor = "bg-[#0070F3]";
      textColor = "text-white";
      border = "border-none";
      hoverBg = "hover:bg-[#0055c2]";
      widthClass = "w-auto px-4"; // smaller width
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-[14px] rounded-[5px] py-2 font-medium transition-colors duration-300
        ${bgColor} ${textColor} ${border} ${hoverBg} ${widthClass} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
