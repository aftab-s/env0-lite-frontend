import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "extra" | "destructive" | "extraSetting" | "rebaseButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  width = "w-full",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-2 py-2 h-10 rounded font-medium text-sm transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#F5CB5C] text-black hover:bg-[#FFC52D]",
    secondary: "bg-[#e4e4e4] text-[#343434] hover:bg-[#cfcfcf]",
    tertiary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    extra: "bg-none border border-[#474747] text-white hover:bg-[#bb1600] hover:border-red-700",
    destructive: "bg-[#bb1600] border border-red-700 text-white hover:bg-red-500 hover:border-red-700",
    extraSetting: "bg-none border border-[#474747] text-white hover:bg-[#F5CB5C] hover:border-[#FFC52D]",
  rebaseButton: "bg-none border border-[#474747] text-white hover:bg-[#007011] hover:border-[#007011] shadow-[0_0_8px_2px_rgba(0,112,17,0.5)]",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], width, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;