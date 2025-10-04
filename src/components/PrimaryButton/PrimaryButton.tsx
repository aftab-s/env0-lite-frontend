import { MouseEvent } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ children, onClick, disabled = false, type = 'button', className = '' }: ButtonProps) {
  const base = 'w-full font-medium py-2 rounded mt-2 transition-colors';
  const enabled = 'bg-[#CD9C20] hover:bg-[#B88A1C] text-black cursor-pointer';
  const disabledCls = 'bg-[#7a6635] text-black/70 cursor-not-allowed opacity-70';

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${base} ${disabled ? disabledCls : enabled} ${className}`.trim()}
    >
      {children}
    </button>
  );
}