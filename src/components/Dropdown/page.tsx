"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeProvider";

interface DropdownOption {
  label: string;
  value: string;
}

interface CommonDropdownProps {
  value: string;
  label: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export default function CommonDropdown({
  value,
  label,
  onChange,
  options,
  placeholder = "Select...",
  helperText,
  error,
}: CommonDropdownProps) {
  const { darkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const bgColor = darkMode ? "bg-[#111111]" : "bg-white";
  const borderColor = error
    ? "border-red-500"
    : darkMode
    ? "border-[#2A2A2A]"
    : "border-gray-300";
  const labelColor = darkMode ? "text-[#EDEDED]" : "text-gray-700";
  const textColor = darkMode ? "text-white" : "text-black";
  const helperColor = darkMode ? "text-gray-400" : "text-gray-600";
  const hoverBg = darkMode ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        className={`block text-[12px] font-normal mb-1 ${labelColor}`}
      >
        {label}
      </label>
      <div
        className={`w-full rounded-[5px] border px-3 py-2 text-[14px] cursor-pointer flex justify-between items-center ${bgColor} ${borderColor} ${textColor} transition-colors duration-500`}
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel || placeholder}</span>
        <Image
          src="/Drop.svg"
          alt="Dropdown"
          width={10}
          height={10}
          className={`ml-2 transition-transform ${
            open ? "rotate-180" : ""
          } ${darkMode ? "invert" : ""}`}
        />
      </div>

      {open && (
        <div
          className={`absolute top-full left-0 w-full ${bgColor} border ${borderColor} rounded-[5px] z-10 max-h-60 overflow-y-auto mt-[-18px] transition-colors duration-500`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 text-[14px] cursor-pointer ${hoverBg} ${textColor}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error ? (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      ) : helperText ? (
        <p className={`${helperColor} text-xs mt-1`}>{helperText}</p>
      ) : null}
    </div>
  );
}
