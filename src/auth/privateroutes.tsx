"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Read token from cookies on client
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || null;
    setToken(cookieToken);
    
    if (!cookieToken) {
      router.push("/");
    }
  }, [router]);

  if (!token) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}