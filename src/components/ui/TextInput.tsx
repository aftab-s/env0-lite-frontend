import { ChangeEvent } from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email';
}

export default function TextInput({ label, placeholder, value, onChange, type = 'text' }: TextInputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-white text-sm mb-2 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#09090B] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D4A253]"
      />
    </div>
  );
}