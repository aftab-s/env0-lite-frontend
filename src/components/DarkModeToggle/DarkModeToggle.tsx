"use client";
import { useDarkMode } from "@/context/DarkModeProvider";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        darkMode ? "bg-slate-700" : "bg-gray-300"
      }`}
    >
      {/* Slider knob with icon container */}
      <div
        className={`relative w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
          darkMode ? "bg-white" : "bg-slate-900"
        } ${darkMode ? "translate-x-7" : "translate-x-0"}`}
      >
        {/* Light Mode Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`absolute w-3.5 h-3.5 transition-opacity duration-300 ${
            darkMode ? "opacity-0" : "opacity-100 text-white"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>

        {/* Dark Mode Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`absolute w-3.5 h-3.5 text-slate-700 transition-opacity duration-300 ${
            darkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </div>
    </div>
  );
}
