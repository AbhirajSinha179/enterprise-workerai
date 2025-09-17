"use client";
import { SignedIn, SignedOut, SignInButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import Link from "next/link"
import { WorkerAILogo } from "../global/logo"
import { LoadingSpinner } from "../ui/spinner"
import { motion } from "framer-motion"
import { SheetMenu } from "../sidebar/sheet-menu";

export function SiteNav() {
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 0.8 }}
        className="animate-header-slide-down-fade sticky top-0 z-30 w-full border-b border-white/10 bg-transparent py-3 backdrop-blur-sm transition duration-200 ease-in-out"
      >
        <div className="mx-auto hidden h-[58px] w-full flex-row items-center justify-between px-6 md:flex md:max-w-full lg:max-w-7xl">
          <a className="flex w-[100px] items-center gap-2 pt-10 md:pt-0 lg:w-[180px]" href="/">
            <WorkerAILogo />
            <h1 className=" text-3xl font-bold tracking-tighter">WorkerAI</h1>
          </a>
          <div className="mx-auto flex items-center font-bold md:gap-4 lg:gap-6">
            <Link href="/about-us" className="underline-animated">
              About
            </Link>
            <Link href="/blog" className="underline-animated">
              Blog
            </Link>
            <Link href={"https://www.calendly.com/rohit_workerai"} className="underline-animated font-bold">
              Book a call
            </Link>
            {/* <Link href={"https://www.calendly.com/rohit_workerai"} className="underline-animated">
              Talk to Sales
            </Link> */}
            {/* <Link href="/pricing" className="underline-animated">
              Pricing
            </Link> */}
            {/* <Link href="/changelog" className="underline-animated">
              Changelog
            </Link> */}
          </div>
          <div className="flex items-center gap-6">

            {/* <Link href={"/tour"} className="underline-animated font-bold">
              Take A Tour
            </Link> */}

            {/* <Link href={"/tour"}>
              <button className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-50 blur" />
                <ClerkLoading>
                  <LoadingSpinner />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedOut>
                    {/* <SignInButton /> */}
                    {/* <SignInButton> Take a Tour</SignInButton>
                  </SignedOut>
                  <SignedIn>Take a Tour</SignedIn>
                </ClerkLoaded>
              </button>
            </Link> */}

            <Link href={"/dashboard"}>
              <button className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-50 blur" />
                <ClerkLoading>
                  <LoadingSpinner />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>Dashboard</SignedIn>
                </ClerkLoaded>
              </button>
            </Link>
          </div>
        </div>
        <div className="mx-auto flex h-[58px] w-full max-w-5xl items-center justify-between px-6 backdrop-blur-md md:hidden md:max-w-7xl">
          <a className="lg:w-[180px]" href="/">
            <WorkerAILogo />
          </a>
          <div className="flex gap-4">{/* add clerk sign in button */}</div>
        </div>
      </motion.nav>
    </>
  )
}
