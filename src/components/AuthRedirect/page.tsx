"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function AuthRedirect() {
  const token = useSelector((state: RootState) => state.auth.token)
  const router = useRouter()

  useEffect(() => {
    if (token) {
      // user is logged in → redirect to dashboard
      router.replace("/dashboard")
    }
  }, [token, router])

  return null
}
