"use client";
import Input from "@/components/Input/page";
import Button from "@/components/PrimaryButton/page";
import { useDarkMode } from "@/context/DarkModeProvider";
import { useState } from "react";

export default function ForgotPassword() {
  const { darkMode } = useDarkMode();

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const mainBg = darkMode ? "bg-[#111111]" : "bg-[#EFEFEF]";
  const textColor = darkMode ? "text-white" : "text-black";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-600";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setErrors({});
    try {
      // await sendOtp({ email });
      setMessage("If this email is registered, an OTP has been sent.");
      setStep("otp");
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return setErrors({ otp: "OTP is required" });

    setErrors({});
    try {
      // const valid = await verifyOtp({ email, otp });
      const valid = true;
      if (valid) setStep("reset");
      else setErrors({ otp: "Invalid OTP" });
    } catch {
      setMessage("OTP verification failed. Try again.");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setErrors({});
    try {
      // await resetPassword({ email, password });
      setMessage("Password reset successful. You can now log in.");
      setStep("email");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch {
      setMessage("Password reset failed. Please try again.");
    }
  };

  return (
    <div
      className={`w-screen h-full flex flex-col items-center justify-center ${mainBg} transition-colors duration-500`}
    >
      <div className="w-85 mb-5 flex flex-col items-start justify-center">
        <span className={`font-semibold text-[20px] ${textColor}`}>
          Forgot Password
        </span>
        {message && (
          <span className={`text-sm mt-1 ${subTextColor}`}>{message}</span>
        )}
      </div>

      <div className="w-85">
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <Input
              helperText="Registered account email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Button type="submit">Send OTP</Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
            <Input
              helperText="Enter the OTP sent to your email"
              label="OTP"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={errors.otp}
            />
            <Button type="submit">Verify OTP</Button>
            <button
              type="button"
              onClick={handleEmailSubmit}
              className="text-xs text-[#6B21A8] hover:underline"
            >
              Resend OTP
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
            <Input
              helperText="Your email cannot be changed"
              label="Email"
              type="email"
              value={email}
              disabled
            />
            <Input
              helperText="Enter new password"
              label="Password"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              helperText="Confirm new password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </div>
    </div>
  );
}
