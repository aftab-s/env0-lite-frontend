"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar/page";
import { useDarkMode } from "@/context/DarkModeProvider";
import InfrastructureBanner from "./_newProjectComponent/page";

export default function DashboardPage() {
  const { darkMode } = useDarkMode();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // prevents going back
    }
  }, [status, router]);

  // Optional: prevent history back navigation
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePop = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (status !== "authenticated") {
    return null; // or a loading spinner
  }

  return (
    <div className="flex-1 p-10 pt-0 overflow-y-auto box-border">
      <InfrastructureBanner />
    </div>
  );
}
