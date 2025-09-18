"use client";
import { useDarkMode } from "@/context/DarkModeProvider";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        darkMode ? "bg-gray-600" : "bg-gray-300"
      }`}
    >
      {/* Sun icon (left) */}
      <span className="absolute left-1 text-sm">🌞</span>
      {/* Moon icon (right) */}
      <span className="absolute right-1 text-sm">🌙</span>

      {/* Slider knob */}
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </div>
  );
}
