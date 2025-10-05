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
  const [navigating, setNavigating] = useState(false);
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const creds: LoginCredentials = { email, password };
    const resultAction = await dispatch(loginUser(creds));
    if (loginUser.fulfilled.match(resultAction)) {
      const payload = resultAction.payload;
      setNavigating(true);
      let to = '/github-connect'; // default
      if (payload.githubPAT) {
        if (payload.isProjectThere === 'yes') {
          to = '/projects';
        } else {
          to = '/dashboard';
        }
      } else if (payload.onboardingCompleted) {
        to = '/dashboard';
      }
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
  }, [dispatch, email, password, router]);

  useEffect(() => {
    if (token) {
      router.prefetch('/dashboard');
      router.prefetch('/github-connect');
      router.prefetch('/projects');
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

            {/* Forgot Password */}
            <div className="mt-7">
              <p className="text-right text-gray-400 text-sm">
                <Link href="/forgot-password" className="text-[#CD9C20] hover:underline">
                  Forgot Password ?
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading || navigating}>
              {loading || navigating ? 'Logging in...' : 'Sign In'}
            </Button>


            

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