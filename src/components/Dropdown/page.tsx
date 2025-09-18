"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DropdownOption {
  label: string;
  value: string;
}

interface CommonDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export default function CommonDropdown({
  value,
  onChange,
  options,
  placeholder = "Select...",
  helperText,
  error,
}: CommonDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full rounded-[5px] border px-3 py-2 text-[14px] bg-[#111111] cursor-pointer flex justify-between items-center ${
          error ? "border-red-500" : "border-[#2A2A2A]"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel || placeholder}</span>
        <Image
          src="/Drop.svg"
          alt="Dropdown"
          width={10}
          height={10}
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""} filter invert`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full bg-[#111111] border border-[#2A2A2A] rounded-[5px] z-10 max-h-60 overflow-y-auto mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 text-[14px] hover:bg-[#2A2A2A] cursor-pointer"
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

      {/* Error or helper text */}
      {error ? (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-gray-400 text-xs mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
