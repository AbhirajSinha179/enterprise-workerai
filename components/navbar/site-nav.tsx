import { ModeToggle } from "@/components/global/mode-toggle"
// import { UserNav } from "@/components/admin-panel/user-nav"
import { SheetMenu } from "@/components/sidebar/sheet-menu"
import Link from "next/link"
import { Button } from "../ui/button"


export function SiteNav() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-4 z-10 mx-auto w-full max-w-7xl backdrop-blur-sm ">
      <div className="mx-4 flex h-16 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0 rtl:space-x-reverse">
          <SheetMenu />
          <h1 className="hidden sm:block text-lg font-bold md:text-2xl dark:text-white">WorkerAI</h1>
        </div>
        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul className="hidden md:mt-0 md:flex md:space-x-8 md:border-0 rtl:space-x-reverse">
            <li className="ml-4 inline-block">
              <Link href="/about" className="text-sm font-semibold text-foreground">
                About
              </Link>
            </li>
            <li className="ml-4 inline-block">
              <Link href="/pricing" className="text-sm font-semibold text-foreground">
                Pricing
              </Link>
            </li>
            <li className="inline-block">
              <Link href="/" className="text-sm font-semibold text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end space-x-4 md:order-2 rtl:space-x-reverse">
          <ModeToggle />
          <Button asChild className="min-w-20">
            <Link href="/login">Login</Link>
          </Button>
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  )
}
