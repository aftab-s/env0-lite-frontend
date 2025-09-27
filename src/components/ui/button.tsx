import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "tertiary";

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
    "px-4 py-2 h-10 rounded font-medium text-sm transition-colors duration-200";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#F5CB5C] text-black hover:bg-[#FFC52D]",
    secondary: "bg-[#e4e4e4] text-[#343434] hover:bg-[#cfcfcf]",
    tertiary: "bg-blue-100 text-blue-800 hover:bg-blue-200", 
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