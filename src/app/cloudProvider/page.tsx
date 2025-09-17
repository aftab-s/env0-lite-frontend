"use client";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

export default function DemoPage() {
  const [darkMode, setDarkMode] = useState(false);

  const mainBg = darkMode ? "bg-[#000000]" : "bg-[#FFFFFF]";
  const headingColor = darkMode ? "text-white" : "text-gray-900";
  const subHeadingColor = darkMode ? "text-gray-300" : "text-gray-600";

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

      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />

      {/* Main content area */}
      <div className={`flex-1 flex flex-col ${mainBg} transition-colors duration-500`}>
        <Header darkMode={darkMode} />
        <div className="flex-1 p-8 overflow-auto">
          <h1 className={`text-3xl font-bold font-inter mb-2 ${headingColor} transition-colors duration-500`}>
            Choose Your Cloud Provider
          </h1>
          <p className={`text-base font-inter mb-8 ${subHeadingColor} transition-colors duration-500`}>
            Select the cloud platform where you want to deploy your infrastructure. You can always add more providers later.
          </p>

          {/* Cloud provider cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AWS Card */}
            <div className={`p-10 rounded-lg border transition-colors duration-500 hover:shadow-lg cursor-pointer min-h-[250px] flex flex-col justify-end ${
              darkMode 
                ? "border-gray-700 bg-[#1A1A1A] hover:border-gray-600" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              <div className="flex flex-col text-left">
                <h3 className={`text-lg font-semibold font-inter mb-2 ${headingColor} transition-colors duration-500`}>
                  Amazon Web Services
                </h3>
                <p className={`text-sm ${subHeadingColor} transition-colors duration-500`}>
                  Deploy to AWS with EC2, S3, Lambda, and more
                </p>
              </div>
            </div>

            {/* Google Cloud Card */}
            <div className={`p-10 rounded-lg border transition-colors duration-500 hover:shadow-lg cursor-pointer min-h-[250px] flex flex-col justify-end ${
              darkMode 
                ? "border-gray-700 bg-[#1A1A1A] hover:border-gray-600" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              <div className="flex flex-col text-left">
                <h3 className={`text-lg font-semibold font-inter mb-2 ${headingColor} transition-colors duration-500`}>
                  Google Cloud Platform
                </h3>
                <p className={`text-sm ${subHeadingColor} transition-colors duration-500`}>
                  Build on Googles scalable infrastructure
                </p>
              </div>
            </div>

            {/* Microsoft Azure Card */}
            <div className={`p-10 rounded-lg border transition-colors duration-500 hover:shadow-lg cursor-pointer min-h-[250px] flex flex-col justify-end ${
              darkMode 
                ? "border-gray-700 bg-[#1A1A1A] hover:border-gray-600" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
              <div className="flex flex-col text-left">
                <h3 className={`text-lg font-semibold font-inter mb-2 ${headingColor} transition-colors duration-500`}>
                  Microsoft Azure
                </h3>
                <p className={`text-sm ${subHeadingColor} transition-colors duration-500`}>
                  Leverage Azures cloud computing platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}