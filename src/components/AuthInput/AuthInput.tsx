'use client';

import { ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  className?: string;
  bgClass?: string;
}

export default function AuthInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon,
  showPassword,
  onTogglePassword,
  className = '',
  bgClass = 'bg-[#1a1a2e]',
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-white text-sm mb-2">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-gray-400 w-4 h-4 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${bgClass} border bg-black border-gray-700 rounded-lg px-10 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A574] ${className}`}
        />
        {showPassword !== undefined && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 text-gray-400 hover:text-gray-300 flex items-center justify-center"
          >
            {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}