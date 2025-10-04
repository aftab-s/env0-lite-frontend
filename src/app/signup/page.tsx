"use client";
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { signupUser, resetSignupState } from '@/redux/slice/Auth/signUpSlice';
import type { SignupCredentials } from '@/types/auth.types';
import { showSuccessAlert, showErrorAlert } from '@/utils/swal';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, success } = useSelector((s: RootState) => s.signup);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const name = `${firstName.trim()} ${lastName.trim()}`.trim();
  const canSubmit = !!firstName && !!lastName && !!email && !!password && !loading;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    const payload: SignupCredentials = {
      name,
      email,
      password,
      role: 'user',
    };
    const action = await dispatch(signupUser(payload));
    if (signupUser.fulfilled.match(action)) {
      showSuccessAlert('Account created', 'You can now login', true).then(() => {
        router.push('/github-connect');
        dispatch(resetSignupState());
      });
    } else {
      const msg = action.payload as string | undefined;
      showErrorAlert('Signup failed', msg || 'Unable to create account', true);
    }
  }, [canSubmit, dispatch, email, password, name, router]);

  // Prefetch login page for faster redirect
  useEffect(() => {
    router.prefetch('/github-connect');
  }, [router]);

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

      {/* Right Side - Signup Form */}
      <div className="w-[45%] h-full bg-[#111111] flex items-center justify-center px-30 py-8">
        <div className="w-full max-w-md bg-[#18181B] rounded-lg p-8  border-1 border-gray-800">
          <h2 className="text-[#CD9C20] text-2xl font-semibold mb-2">Sign Up</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your information to create an account
          </p>

          <div className="flex flex-col gap-4 mb-4"> 


            <div className="flex flex-row gap-5">
              <TextInput
                label="First Name"
                placeholder="Max"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInput
                label="Last Name"
                placeholder="Robinson"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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

            <Button onClick={handleSubmit}>
              {loading ? 'Creating account...' : 'Create an account'}
            </Button>
            {error && !success && (
              <p className="text-red-500 text-xs" role="alert">{error}</p>
            )}
          </div>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link href="/" className="text-white underline hover:text-[#D4A253]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
