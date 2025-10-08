"use client"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthRedirect() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      // user is logged in → redirect to dashboard
      router.replace("/dashboard")
    }
  }, [status, router])

  return null
}
