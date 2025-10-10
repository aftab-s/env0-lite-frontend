import { ChangeEvent } from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email';
  disabled?: boolean;
}

export default function TextInput({ label, placeholder, value, onChange, type = 'text', disabled = false }: TextInputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-white text-sm mb-2 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-[#09090B] border border-[#232329] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4A253] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}