"use client";
import CommonDropdown from "@/components/Dropdown/page";
import Button from "@/components/PrimaryButton/page";
import Input from "@/components/Input/page";
import { signIn } from "@/services/query/useAuthentication";
import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    }

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); 

    try {
      
      await signIn({
        name,
        email,
        password,
        role
      });
      

      console.log({ name, email, password, role });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center bg-[#111111]">
      <div className="w-85 mb-5 flex flex-col items-start justify-center">
        <span className="font-semibold text-[20px]">Sign Up for TerraFuel</span>
      </div>

      <div className="w-85">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            helperText="Enter your full name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <Input
            label="Email"
            helperText="Enter your email address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <div>
            <label className="block text-[12px] font-normal mb-1 text-[#EDEDED]">
              Role
            </label>
            <CommonDropdown
                value={role}
                onChange={setRole}
                options={[
                    { label: "User", value: "user" },
                    { label: "Admin", value: "admin" },
                ]}
                placeholder="Select Role"
                helperText="Choose a role for this account"
            />
          </div>

          <Input
            label="Password"
            helperText="Minimum 6 characters"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            helperText="Re-enter your password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <Button type="submit">Sign Up</Button>
        </form>

        <div className="mt-6 flex flex-col items-start gap-2 text-[12px]">
          <p>
            Already have an account?{" "}
            <a href="/" className="text-[#A259FF] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
