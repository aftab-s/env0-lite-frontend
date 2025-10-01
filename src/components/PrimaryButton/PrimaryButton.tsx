import { MouseEvent } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#CD9C20] hover:bg-[#B88A1C] text-black font-medium py-2 rounded mt-2 transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}