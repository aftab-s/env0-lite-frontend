'use client';
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "social" | "gold";
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
}: ButtonProps) {

  let bgColor = "";
  let textColor = "";
  let border = "";
  let hoverBg = "";
  let widthClass = "w-full";

  switch (variant) {
    case "primary":
      bgColor = "bg-black";
      textColor = "text-white";
      hoverBg = "hover:bg-gray-800";
      border = "border-none";
      widthClass = "w-full font-medium";
      break;
    case "secondary":
      bgColor = "bg-transparent font-bold ";
      textColor = "text-[#374151]";
      border = "border border-[#2F343C]";
      hoverBg = "hover:bg-gray-700";
      widthClass = "w-auto px-4";
      break;
    case "tertiary":
      bgColor = "bg-[#A5BCFD]";
      textColor = "text-black font-bold";
      border = "border-none";
      hoverBg = "hover:bg-[#0055c2]";
      widthClass = "w-auto px-4";
      break;
    case "gold":
      bgColor = "bg-[#F1C453]";
      textColor = "text-[#111111] font-medium";
      border = "border-none";
      hoverBg = "hover:brightness-95";
      widthClass = "w-auto px-4";
      break;
    case "social": // New variant for Google/GitHub/etc.
      bgColor = "bg-transparent";
      textColor = "text-white";
      border = "border border-[#2F343C]";
      hoverBg = "hover:bg-[#3A3F46]";
      widthClass = "w-fit px-4 flex items-center gap-2";
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-[14px] rounded-[5px] py-2 transition-colors duration-300
        ${bgColor} ${textColor} ${border} ${hoverBg} ${widthClass} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
