'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextInput from '../../components/TextInput';
import Button from '../../components/PrimaryButton/PrimaryButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="w-screen h-screen flex overflow-hidden">
          {/* Left Side - Logo */}
          <div className="w-[55%] h-full bg-[#18181B] flex items-center justify-center">
            <div className="flex items-center gap-4">
              <Image
                src="/login/logo-full.svg"
                alt="Bagel Logo"
                width={500}
                height={120}
                priority
              />
            </div>
          </div>

          {/* Right Side - ForgotPassword Form */}
          <div className="w-[45%] h-full bg-[#111111] flex items-center justify-center px-30 py-8">
            <div className="w-full max-w-md bg-[#18181B] rounded-lg p-8 border border-gray-800">
              <h2 className="text-[#CD9C20] text-2xl font-semibold mb-2">Forgot Your Password?</h2>
              <p className="text-gray-400 text-sm mb-6">
                Enter your registered email
              </p>

              <div className="flex flex-col gap-4 mb-2">
                <TextInput
                  label="Email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <Button onClick={handleSubmit}>Reset Password</Button>
              </div>

              <p className="text-gray-400 text-sm mt-2 text-center">
                <Link href="/" className="text-white underline hover:text-[#D4A253]">
                  Go Back
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}