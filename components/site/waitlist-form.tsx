"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { LoadingSpinner } from "../ui/spinner"

export const WaitlistForm = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-12 flex flex-row max-w-3xl relative left-1/2 -translate-x-1/2 items-center justify-center gap-4">

      {/* Book a call button */}
      <Link href="https://www.calendly.com/rohit_workerai" passHref>
        <Button
          variant="secondary"
          className="inline-flex h-12 w-96 animate-shimmer items-center justify-center
                  rounded-md border bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1
                  dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-50"
        >
          {loading ? "Loading..." : "Book a call"}
        </Button>
      </Link>

      {/* Take a tour button */}
      <Link href="/tour" passHref>
        <Button
          variant="secondary"
          className="inline-flex h-12 w-96 animate-shimmer items-center justify-center
                  rounded-md border bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1
                  dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-50"
        >
          <ClerkLoading>
            <LoadingSpinner />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton>Take a Tour</SignInButton>
            </SignedOut>
            <SignedIn>Take a Tour</SignedIn>
          </ClerkLoaded>
        </Button>
      </Link>

    </div>
  )
}
