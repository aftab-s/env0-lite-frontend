"use client";
import Button from "@/components/PrimaryButton/page";
import Input from "@/components/Input/page";
import { logIn } from "@/services/query/useAuthentication";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useDarkMode } from "@/context/DarkModeProvider";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/authSlice";
import AuthRedirect from "@/components/AuthRedirect/page";

export default function AuthForm() {
  const { data: session } = useSession();
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const mainBg = darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]";
  const textColor = darkMode ? "text-white" : "text-black";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = darkMode ? "border-[#2A2A2A]" : "border-gray-300";
  const hoverBg = darkMode ? "hover:bg-[#3c3c3c]" : "hover:bg-gray-300";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    }
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      // Call your login API
      const user = await logIn({ email, password });

      if (!user) throw new Error("Invalid credentials");

      // Save user in Redux
      dispatch(
        setUser({
          email: user.email,
          role: user.role || "user",
        })
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className={`w-screen h-full flex flex-col items-center justify-center ${mainBg} transition-colors duration-500`}
    >
      {/* <AuthRedirect /> */}
      <div className="w-85 mb-5 flex flex-col items-start justify-center">
        <span className={`font-semibold text-[20px] ${textColor}`}>
          Sign In to TerraFuel
        </span>
      </div>

      <div className="w-85">
        {/* OAuth Buttons */}
        <div className="flex gap-3 mb-6">
          {["Github", "Gitlab", "Bitbucket", "Google"].map((provider) => (
            <div key={provider} className="relative group w-full">
              <button
                onClick={() => signIn(provider.toLowerCase())}
                className={`flex items-center justify-center gap-2 w-full border ${borderColor} rounded-[5px] py-1 ${hoverBg}`}
              >
                <Image
                  src={`/login/${provider}.svg`}
                  alt={provider}
                  width={20}
                  height={20}
                  priority
                  className={`m-2 ${
                    darkMode && (provider === "Github" || provider === "Google")
                      ? ""
                      : "invert"
                  }`}
                />
              </button>
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-7 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {provider}
              </span>
            </div>
          ))}
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span
            className={`text-sm px-3 rounded ${
              darkMode ? "text-gray-400 bg-[#0A0A0A]" : "text-gray-500 bg-gray-300"
            }`}
          >
            or
          </span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            helperText="Enter your email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            helperText="Enter your password"
            label="Password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit">Sign In</Button>
        </form>

        {/* Links */}
        <div className={`mt-6 flex flex-col items-start gap-2 text-[12px] ${subTextColor}`}>
          <a href="#" className={`hover:underline ${darkMode ? "text-[#A259FF]" : "text-[#6B21A8]"}`}>
            Sign in with SSO
          </a>
          <p>
            Need an account?{" "}
            <a href="/signup" className={`hover:underline ${darkMode ? "text-[#A259FF]" : "text-[#6B21A8]"}`}>
              Sign up
            </a>
          </p>
          <p>
            Forgot your password?{" "}
            <a href="/forgot-password" className={`hover:underline ${darkMode ? "text-[#A259FF]" : "text-[#6B21A8]"}`}>
              Reset it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
