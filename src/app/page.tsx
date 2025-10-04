'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import AuthInput from '@/components/AuthInput/AuthInput';
import Button from '@/components/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { loginUser } from '@/redux/slice/Auth/loginSlice';
import type { LoginCredentials } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const canSubmit = !!email && !!password && agreedToTerms && !loading;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const creds: LoginCredentials = { email, password };
    const resultAction = await dispatch(loginUser(creds));
    if (loginUser.fulfilled.match(resultAction)) {
      const payload = resultAction.payload;
      const to = payload.onboardingCompleted ? '/dashboard' : '/github-connect';
      router.push(to);
    } else {
      const payload = resultAction.payload as string | undefined;
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: payload || 'Unable to login with provided credentials',
        confirmButtonColor: '#CD9C20'
      });
    }
  }, [canSubmit, dispatch, email, password, router]);

  useEffect(() => {
    if (token) {
      router.prefetch('/dashboard');
      router.prefetch('/github-connect');
    }
  }, [token, router]);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Branding */}
      <div className="w-1/2 relative">
        <Image
          src="authPages/loginBanner.svg"
          alt="Login Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 bg-[#0a0a0b] flex items-center justify-center p-16">
        <div className="w-full max-w-md mt-10">
          <h2 className="text-[#CD9C20] text-3xl font-light mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-10">Sign in to manage your infrastructure</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <AuthInput
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail />}
              bgClass="bg-[#1a1a1a]"
            />

            {/* Password */}
            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock />}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              bgClass="bg-[#1a1a1a]"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {error}
              </p>
            )}

            {/* Terms Checkbox and Forgot Password */}
            <div className="flex justify-between mt-7">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-700 bg-[#1a1a2e] text-[#D4A574] focus:ring-[#D4A574] cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  Remember me for 30 days
                </label>
              </div>

              <p className="text-center text-gray-400 text-sm">
                <Link href="/forgot-password" className="text-[#CD9C20] hover:underline">
                  Forgot Password ?
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <Button disabled={!canSubmit} >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0f0f0f] text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-white py-2 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-white py-3 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-gray-400 text-sm">
              {"Don't have an account ?"} {" "}
              <Link href="/signup" className="text-[#CD9C20] hover:underline">
                Sign up
              </Link>
            </p>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs mt-4">
            © 2025 Bagel. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}