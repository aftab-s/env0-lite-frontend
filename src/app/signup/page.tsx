'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Lock } from 'lucide-react';
import AuthInput from '@/components/ui/AuthInput';
import Button from '@/components/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { signupUser, resetSignupState } from '@/redux/slice/Auth/signUpSlice';
import type { SignupCredentials, SignupResponse } from '@/types/auth.types';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';


export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, success } = useSelector((s: RootState) => s.signup);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const name = `${firstName.trim()} ${lastName.trim()}`.trim();
  const canSubmit = !!firstName && !!email && !!password && agreedToTerms && !loading && !emailError && !passwordError;

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1];
    if (!domain) return 'Invalid email';
    const forbidden = ['example.com', 'test.com', 'admin.com'];
    if (forbidden.includes(domain.toLowerCase())) {
      return 'This email domain is not allowed';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload: SignupCredentials = {
      name,
      email,
      password,
      role: 'user',
    };
    const action = await dispatch(signupUser(payload));
    if (signupUser.fulfilled.match(action)) {
      // Store token in cookies, same as login
      Cookies.set("token", action.payload.token, { expires: 7 });
            const response = action.payload as SignupResponse;
       Cookies.set('name', response.name);
      Cookies.set('email', response.email);


      Swal.fire({
        icon: 'success',
        title: 'Account created',
        text: 'You can now login',
        confirmButtonColor: '#CD9C20',
      }).then(() => {
        router.push('/github-connect');
        dispatch(resetSignupState());
      });
    } else {
      const msg = action.payload as string | undefined;
      Swal.fire({
        icon: 'error',
        title: 'Signup failed',
        text: msg || 'Unable to create account',
        confirmButtonColor: '#CD9C20',
      });
    }
  }, [canSubmit, dispatch, email, password, name, router]);

  useEffect(() => {
    router.prefetch('/github-connect');
  }, [router]);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Branding */}
      <div className="w-1/2 relative">
        <Image
          src="authPages/signupBanner.svg"
          alt="Signup Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 bg-[#000000] flex items-center justify-center p-16">
        <div className="w-full max-w-md mt-10">
          <h2 className="text-white text-3xl font-light mb-2">Create Account</h2>
          <p className="text-gray-400 mb-10">Start managing your infrastructure today</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <AuthInput
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                icon={<User />}
                bgClass="bg-[#1a1a2e]"
              />
              <AuthInput
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                icon={<User />}
                bgClass="bg-[#1a1a2e]"
              />
            </div>

            {/* Email */}
            <AuthInput
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value));
              }}
              icon={<Mail />}
              bgClass="bg-[#1a1a2e]"
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

            {/* Password */}
            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
              }}
              icon={<Lock />}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              bgClass="bg-[#1a1a2e]"
            />
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with a mix of letters and numbers
            </p>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 mt-7">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-700 bg-[#1a1a2e] text-[#D4A574] focus:ring-[#D4A574] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{' '}
                <span className="text-[#CD9C20]">Terms of Service</span> and{' '}
                <span className="text-[#CD9C20]">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button disabled={!canSubmit} type="submit">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            {/* Error Message */}
            {error && !success && (
              <p className="text-red-500 text-xs text-center" role="alert">{error}</p>
            )}

            {/* Sign In Link */}
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/" className="text-[#CD9C20] hover:underline">
                Sign in
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