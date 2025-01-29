import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";
import { SheetMenu } from "@/components/sidebar/sheet-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown, ChevronLeft } from "lucide-react";

interface NavbarProps {
  title: string;
  showBackButton?: boolean;
}

// TODO also add search bar which will be for navigating across features

export function Navbar({ title, showBackButton }: NavbarProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-10 w-full dark:bg-slate-950/70 backdrop-blur dark:shadow-slate-800 shadow-md">
      <div className={`pr-8 flex h-14 items-center ${!showBackButton ? "mx-20" : "mx-4 sm:mx-8"}`}>
        <div className="flex items-center space-x-4 lg:space-x-0">
          {!showBackButton && (
            <>
              <SheetMenu />
              <h1 className="tracking-wide font-bold">{title}</h1>
            </>
          )}
        </div>
        {showBackButton && (
          <Link href="/dashboard">
            {/* <Button variant="ghost">Back </Button> */}
            <ChevronLeft />
          </Link>
        )}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
