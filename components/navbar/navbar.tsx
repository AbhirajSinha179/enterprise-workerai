import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";
import { SheetMenu } from "@/components/sidebar/sheet-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  title: string;
  isOverviewPage?: boolean;
}

// TODO: Add a search bar for navigating across features

export function Navbar({ title, isOverviewPage }: NavbarProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-10 dark:bg-slate-950/70 backdrop-blur dark:shadow-slate-800 shadow-md w-full">
      <div
        className={cn(
          "flex h-14 items-center px-8 ",
          isOverviewPage ? "max-w-7xl container mx-auto" : " mr-20 "
        )}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4 lg:space-x-0">
          {!isOverviewPage ? (
            <>
              <SheetMenu />
              <h1 className="tracking-wide font-bold">{title}</h1>
            </>
          ) : (
            <div className=" -ml-6 flex justify-start ">
              <Link href="/dashboard" >
                <Button variant="ghost" >
                  <ChevronLeft className="mr-2" />
                  <span className="tracking-wide font-bold">{title}</span>
                </Button>
              </Link>

            </div>

          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
