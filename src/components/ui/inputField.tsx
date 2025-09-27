import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, width = "w-64", ...props }) => {
  return (
    <div className={`flex flex-col ${width}`}>
      <label className="mb-[5px] text-sm font-semibold text-[#000000]">
        {label}
      </label>
      <input
        className="h-10 px-3 border border-[#e4e4e4] rounded text-sm mb-5 focus:outline-none focus:ring-1 focus:ring-[#343434] w-full"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputField;