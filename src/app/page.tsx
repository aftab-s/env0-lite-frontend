'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextInput from '../components/TextInput/TextInput';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import Button from '../components/PrimaryButton/PrimaryButton';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login submitted', { email, password });
  };

  return (
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

      {/* Right Side - Login Form */}
      <div className="w-[45%] h-full bg-[#111111] flex items-center justify-center px-30 py-8">
        <div className="w-full max-w-md bg-[#18181B] rounded-lg p-8 border-1 border-gray-800">
          <h2 className="text-[#CD9C20] text-2xl font-semibold mb-2">Login</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your email below to login to your account
          </p>

          <div className="flex flex-col gap-4 mb-4">
            <TextInput
              label="Email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSubmit}>Login</Button>
          </div>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-white text-xs font-thin underline hover:text-[#CD9C20]"
            >
              Forgot your password?
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-6 text-center">
            {"Don't have an account? "}
            <Link href="/signup" className="text-white underline hover:text-[#D4A253]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}