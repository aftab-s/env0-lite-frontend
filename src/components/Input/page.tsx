"use client";
import React, { InputHTMLAttributes } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export default function Input({
  label,
  helperText,
  error,
  className = "",
  ...props
}: InputProps) {
  const { darkMode } = useDarkMode();

  const labelColor = darkMode ? "text-[#EDEDED]" : "text-gray-700";
  const bgColor = darkMode ? "bg-[#111111]" : "bg-white";
  const borderColor = error
    ? "border-red-500"
    : darkMode
    ? "border-[#2A2A2A]"
    : "border-gray-300";
  const textColor = darkMode ? "text-white" : "text-black";
  const helperColor = darkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className="flex flex-col gap-1">
      <label className={`block text-[12px] font-normal ${labelColor} transition-colors duration-500`}>
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-[5px] border px-3 py-2 text-[14px] focus:outline-none ${bgColor} ${borderColor} ${textColor} ${className} transition-colors duration-500`}
      />
      {error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : helperText ? (
        <p className={`${helperColor} text-xs transition-colors duration-500`}>{helperText}</p>
      ) : null}
    </div>
  );
}
