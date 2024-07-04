"use client"
import { useRef, useState } from "react"
import InputSpotlightBorder from "./input-spotlight-border"
import { Button } from "../ui/button"

export const WaitlistForm = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Your logic here
    console.log(email)
    // fetch here

    setEmail("")
    // have one case for success and one for error
    // also add validation on server side, change this to an
    setLoading(false)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 inline-flex max-w-3xl relative left-1/2 -translate-x-1/2 items-center justify-center gap-2"
    >
      <InputSpotlightBorder
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e?.target?.value)}
        placeholder="Enter your email"
      />
      <Button
        variant="secondary"
        type="submit"
        className="inline-flex h-12 min-w-fit flex-[0.5] animate-shimmer items-center justify-center
                  rounded-md border bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1
                dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-50"
      >
        {loading ? "Loading..." : "Join the Waitlist"}
      </Button>
    </form>
  )
}
