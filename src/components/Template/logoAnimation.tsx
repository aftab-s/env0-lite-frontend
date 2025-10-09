'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AnimatedLogo() {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => !prev);
    }, 2000); // flip every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`transition-transform duration-700 ease-in-out ${
        flip ? 'rotate-y-180' : ''
      }`}
      style={{
        width: '100px',
        height: '100px',
        transformStyle: 'preserve-3d',
      }}
    >
      <Image
        src="../../public/Logo/BagelLogo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
  );
}
