
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
// import { ModeToggle } from "@/components/global/mode-toggle"
// import { UserNav } from "@/components/admin-panel/user-nav"
// import { SheetMenu } from "@/components/sidebar/sheet-menu"
// import { Button } from "../ui/button"
import { WorkerAILogo } from "../global/logo"
// import { ArrowBigRight } from "lucide-react"

// TODO need to check nav background for transparency issue

export function SiteNav() {
  return (
    <header className={`dark:supports-backdrop-blur:bg-background/60 supports-backdrop-blur:bg-background/70 sticky top-0 z-20 mx-auto w-full  border-none backdrop-blur-sm dark:backdrop-filter-none`}    >
      <div className="absolute w-full h-[120%] block dark:bg-gradient-to-t from-transparent to-black/90 md:to-black/70 -z-10  bg-blend-overlay ">
      </div>
      <div className="mx-2 flex h-20 max-w-6xl items-center justify-between sm:mx-auto sm:p-2">
        <div className="flex items-center space-x-4 lg:space-x-0 rtl:space-x-reverse">
          {/* <SheetMenu /> */}
          <Link href={"/"} className="flex items-center space-x-2">
            <WorkerAILogo />
            <h1 className="text-lg font-bold dark:text-white  sm:block md:text-2xl">WorkerAI</h1>
          </Link>
        </div>
        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul className="hidden md:mt-0 md:flex md:space-x-8 md:border-0 rtl:space-x-reverse">
            <li className="ml-4 inline-block">
              <Link href="/about" className="font-semibold text-foreground">
                About
              </Link>
            </li>
            <li className="ml-4 inline-block">
              <Link href="/pricing" className="font-semibold text-foreground">
                Pricing
              </Link>
            </li>
            <li className="inline-block">
              <Link href="/blog" className="font-semibold text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="mr-2 flex items-center justify-end space-x-4 md:order-2 rtl:space-x-reverse">
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
