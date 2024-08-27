import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
// import { ModeToggle } from "@/components/global/mode-toggle"
// import { UserNav } from "@/components/admin-panel/user-nav"
// import { SheetMenu } from "@/components/sidebar/sheet-menu"
// import { Button } from "../ui/button"
import { WorkerAILogo } from "../global/logo"

export function SiteNav() {
  return (
    <header
      className={`dark:supports-backdrop-blur:bg-background/60 supports-backdrop-blur:bg-background/70 sticky top-0 z-20 mx-auto w-full border-none backdrop-blur-sm dark:backdrop-filter-none`}
    >
      <div className="absolute -z-10 block size-full bg-gradient-to-t from-transparent to-black/90 bg-blend-overlay md:to-black/60 "></div>
      <div className="mx-4 flex h-20 max-w-6xl items-center justify-between sm:mx-auto sm:p-2">
        <div className="flex items-center space-x-4 lg:space-x-0 rtl:space-x-reverse">
          {/* <SheetMenu /> */}
          <Link href={"/"} className="flex items-center space-x-2">
            <WorkerAILogo />
            <h1 className="text-lg font-bold sm:block md:text-2xl">WorkerAI</h1>
          </Link>
        </div>
        <div className="flex items-center justify-between md:w-auto md:gap-8">
          <ul className="hidden md:mt-0 md:flex md:space-x-8 md:border-0 rtl:space-x-reverse">
            <li className="ml-4 inline-block">
              <Link
                href="/about"
                className="underline-animated"
              >
                About
              </Link>
            </li>
            <li className="inline-block">
              <Link
                href="/blog"
                className="underline-animated"
              >
                Blog
              </Link>
            </li>
            <li className="ml-4 inline-block">
              <Link
                href="/pricing"
                className="underline-animated"
              >
                Pricing
              </Link>
            </li>
          </ul>
          <Link href={"/dashboard"}>
            <SignedOut>
              <button className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-50 blur" />
                <SignInButton />
              </button>
            </SignedOut>
            <SignedIn>
              <button className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-50 blur" />
                Dashboard
              </button>
            </SignedIn>
          </Link>
        </div>
      </div>
    </header>
  )
}
