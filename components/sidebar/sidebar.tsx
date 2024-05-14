import { PanelsTopLeft } from "lucide-react"
import Link from "next/link"

import { Menu } from "@/components/sidebar/menu"
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import { useLockedBody } from "@/hooks/useBodyLock";
import { useSidebarContext } from "../layout/layout-context"
import { ModeToggle } from "../global/mode-toggle"

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !collapsed === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={!collapsed} setIsOpen={setCollapsed} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            !collapsed === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                !collapsed === false ? "hidden -translate-x-96 opacity-0" : "translate-x-0 opacity-100"
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <ModeToggle />
        <Menu isOpen={!collapsed} />
      </div>
    </aside>
  )
}
