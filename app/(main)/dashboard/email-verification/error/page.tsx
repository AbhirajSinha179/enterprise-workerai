"use client"
import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
type Props = {}

const page = (props: Props) => {
  const searchParams = useSearchParams()
  const error = searchParams.get("e")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          {/* <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"></div> */}
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">
            {error == "verification"
              ? "Verification Failed"
              : error == "internal"
              ? "Internal Error"
              : "Something Went Wrong"}
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            Something Went Wrong while verifying your email, Please Try Again Later. If it keeps happening,{" "}
            <a className="underline underline-offset-2" href="mailto:hello@workerai.co">
              Contact Support
            </a>
          </p>
        </div>
        <Link
          href="/dashboard/mailbox"
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Go Back
        </Link>
      </main>
    </div>
  )
}

export default page
