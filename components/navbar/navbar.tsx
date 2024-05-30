import { ModeToggle } from "@/components/global/mode-toggle"
import { SheetMenu } from "@/components/sidebar/sheet-menu"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className=" tracking-wide font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
