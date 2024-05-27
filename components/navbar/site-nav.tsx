import Link from "next/link"
import { ModeToggle } from "@/components/global/mode-toggle"
// import { UserNav } from "@/components/admin-panel/user-nav"
// import { SheetMenu } from "@/components/sidebar/sheet-menu"
import { Button } from "../ui/button"

export function SiteNav() {
  return (
    <header className="dark:supports-backdrop-blur:bg-background/60 supports-backdrop-blur:bg-background/70 sticky top-0 z-10 mx-auto w-full shadow backdrop-blur-sm ">
      <div className="mx-2 flex h-16 max-w-6xl items-center justify-between sm:mx-auto sm:h-20 sm:p-2">
        <div className="flex items-center space-x-4 lg:space-x-0 rtl:space-x-reverse">
          {/* <SheetMenu /> */}
          <Link href={"/"}>
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
