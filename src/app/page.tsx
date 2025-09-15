"use client";
import { useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Right side conditional classes
  const rightBg = darkMode ? "bg-black" : "bg-white";
  const headingColor = darkMode ? "text-white" : "text-gray-900";
  const subHeadingColor = darkMode ? "text-[#374151]" : "text-gray-500";
  const inputBg = darkMode
    ? "bg-gray-800 text-white placeholder-gray-400"
    : "bg-white text-black placeholder-[#A9A9A9]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const tabActiveColor = darkMode ? "#A5BCFD" : "#021A5A";
  const tabInactiveColor = darkMode ? "#6B7280" : "#6B7280";

  return (
    <div className="flex h-screen w-screen relative">
      {/* Dark mode toggle */}
       <div className="absolute top-4 right-4 z-10 flex items-center">
        <div
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            darkMode ? "bg-gray-600" : "bg-yellow-300"
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {/* Slider circle */}
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? "translate-x-7" : "translate-x-0"
            }`}
          ></div>
          {/* Optional icons */}
          <span className="absolute left-1 text-xs">{darkMode ? "🌙" : "🌞"}</span>
        </div>
      </div>

      {/* Left side gradient (unchanged, never reacts to dark mode) */}
      <div className="flex flex-1 h-full items-center justify-center bg-gradient-to-r from-[#E0E7FF] to-[#EFF6FF]">
        <Image src="/login/Logo.svg" alt="Logo" width={125} height={38} priority />
      </div>

      {/* Right side */}
      <div
        className={`flex flex-2 items-center justify-center ${rightBg} h-full transition-colors duration-500`}>
        <div className="w-full max-w-sm space-y-6 px-4">

          {/* Heading */}
          <div className="space-y-2">
            <div className={`font-extrabold text-[29px] leading-[36px] font-inter ${headingColor} transition-colors duration-500`}>
              Welcome to Fuel
            </div>
            <div className={`font-normal text-[14.74px] leading-[24px] font-inter ${subHeadingColor} transition-colors duration-500`}>
              Frictionless deployment of infrastructure
            </div>
          </div>

          {/* Tabs: Login | Sign Up */}
          <div className="flex border-b transition-colors duration-300" style={{ borderColor: darkMode ? '#1F2228' : '#D1D5DB' }}>
            <button
              className={`px-3 py-2 text-center font-inter font-bold text-[11px] leading-[20px] border-b-2 transition-colors duration-300`}
              style={{
                color: tabActiveColor,
                borderColor: tabActiveColor
              }}
            >
              Login
            </button>
            <button
              className={`px-3 py-2 text-center font-inter font-bold text-[11px] leading-[20px] border-b-2 border-transparent transition-colors duration-500`}
              style={{ color: tabInactiveColor }}
            >
              Sign Up
            </button>
          </div>

          {/* Login form */}
          <form className="space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className={`text-[12px] leading-[20px] font-inter font-medium ${subHeadingColor} transition-colors duration-500`}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-[6px] px-3 py-2 text-[13px] ${inputBg} border border-t-[0.8px] ${borderColor}
                  focus:border-[#021A5A] focus:ring focus:ring-[#021A5A] focus:ring-opacity-50
                  transition-colors duration-500`}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className={`text-[12px] leading-[20px] font-inter font-medium ${subHeadingColor} transition-colors duration-500`}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-[6px] px-3 py-2 text-[13px] ${inputBg} border border-t-[0.8px] ${borderColor}
                  focus:border-[#021A5A] focus:ring focus:ring-[#021A5A] focus:ring-opacity-50
                  transition-colors duration-500`}
              />
            </div>

            {/* Continue button */}
            <button
              type="submit"
              className={`w-full font-inter text-[14px] py-2 font-bold   rounded-md
                ${darkMode ? "bg-[#A5BCFD]  text-black" : "bg-[#021A5A] dark:bg-[#2563EB] text-white"}
                transition-colors duration-500
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1`}
            >
              Continue
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className={`flex-1 h-px ${darkMode ? "bg-[#1F2228]" : "bg-[#E5E7EB]"} transition-colors duration-300`}></div>
            <span className={`mx-3 text-[10px] font-inter ${darkMode ? "text-gray-400" : "text-[#9CA3AF]"} `}>OR</span>
            <div className={`flex-1 h-px ${darkMode ? "bg-[#1F2228]" : "bg-[#E5E7EB]"} transition-colors duration-300`}></div>
          </div>

          {/* Github Button */}
          <div>
            <button
              type="button"
              className={`w-full font-inter text-[14px] py-2 px-4 font-bold 
                ${darkMode ? "bg-[#C8D2E0]  text-black" : "bg-[#1F2937] dark:bg-gray-800 text-white"}
                 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2
                 focus:ring-indigo-500 focus:ring-offset-1 flex items-center justify-center
                 transition-colors duration-500`}
            >
              <Image
                src="/login/github.svg"
                alt="Github logo"
                width={18}
                height={18}
                className="inline-block mr-2 mb-1"
              />
              Continue with Github
            </button>

            {/* Forgot Password */}
            <div className="flex items-center my-4 justify-center">
              <span className={`mx-3 text-[12px] font-inter ${darkMode ? "text-[#63B3ED]" : "text-[#007CD8]"}`}>
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
