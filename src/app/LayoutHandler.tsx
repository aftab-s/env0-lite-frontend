"use client";

import { usePathname } from "next/navigation";
import PublicHeader from "@/components/PublicHeader/page";
import PrivateHeader from "@/components/PrivateHeader/page";
import Sidebar from "@/components/Sidebar/page";
import Providers from "./providers";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const authRoutes = ["/", "/signup", "/forgot-password"];
  const credentialRoutes = ["/aws-credentials", "/cloud-provider"];
  const isAuthPage = authRoutes.includes(pathname);
  const isCredentialPage = credentialRoutes.includes(pathname);

  return (
    <>
      {isAuthPage ? (
        <div className="flex flex-col w-full h-screen">
          <div className="flex-1 overflow-y-auto">
            <Providers>{children}</Providers>
          </div>
        </div>
      ) : isCredentialPage ? (
        <div className="flex flex-col w-full h-screen">
          <PublicHeader />
          <div className="flex-1 overflow-y-auto">
            <Providers>{children}</Providers>
          </div>
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="flex flex-col flex-1 h-screen">
            <PrivateHeader />
            <div className="flex-1 overflow-y-auto">
              <Providers>{children}</Providers>
            </div>
          </div>
        </>
      )}
    </>
  );
}