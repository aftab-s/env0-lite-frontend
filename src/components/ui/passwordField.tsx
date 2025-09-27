"use client"

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, placeholder, width = "w-64", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col ${width} mb-7`}>
      <label className="mb-[5px] text-sm font-semibold text-[#000000]">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="h-10 w-full px-3 pr-10 border border-[#e4e4e4] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#343434]"
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;