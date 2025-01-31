"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import React from "react"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.workerai.co"

export default function EmailVerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailId = searchParams.get("emailId")
  const emailAddress = searchParams.get("userEmail")
  const { userId, isLoaded, isSignedIn } = useAuth()

  const [content, setContent] = useState("Loading...")

  useEffect(() => {
    if (!emailId) {
      router.push("/dashboard/mailbox")
    }

    if (isLoaded && isSignedIn && emailId) {
      const verifyEmail = async () => {
        try {
          setContent("Verifying your email...")
          const response = await fetch(`${apiBaseUrl}/user/email-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailId,
              email: emailAddress,
              userId,
              firstName: "",
            }),
          })

          console.log("response", response)
          if (response.ok) {
            router.push("/dashboard/mailbox")
          } else {
            router.push("/dashboard/email-verification/error?e=verification")
          }
        } catch (error) {
          console.error("Error verifying email:", error)
          router.push("/dashboard/email-verification/error?e=internal")
        }
      }

      verifyEmail()
    }
  }, [isLoaded, isSignedIn, emailId, emailAddress, userId, router])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">{content}</h1>
        </div>
      </main>
    </div>
  )
}
