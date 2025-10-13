"use client";

import { usePathname } from "next/navigation";
import PrivateRoute from "@/auth/privateroutes";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();

  // Exclude PrivateRoute on the login page (/) and signup page (/signup)
  if (pathname === "/" || pathname === "/signup") {
    return <>{children}</>;
  }

  return <PrivateRoute>{children}</PrivateRoute>;
}