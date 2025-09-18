"use client";
import React, { InputHTMLAttributes } from "react";

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
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-[12px] font-normal text-[#EDEDED]">{label}</label>
      <input
        {...props}
        className={`w-full rounded-[5px] border px-3 py-2 text-[14px] focus:outline-none ${
          error ? "border-red-500" : "border-[#2A2A2A]"
        } ${className}`}
      />
      {error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : helperText ? (
        <p className="text-gray-400 text-xs">{helperText}</p>
      ) : null}
    </div>
  );
}
