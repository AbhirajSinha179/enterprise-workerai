import { PanelsTopLeft } from "lucide-react"
import Link from "next/link"

import { Menu } from "@/components/sidebar/menu"
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import { useLockedBody } from "@/hooks/useBodyLock";
import { useSidebarContext } from "../layout/layout-context"

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        collapsed ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={!collapsed} setIsOpen={setCollapsed} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
        <Link
          href="/dashboard"
          className={cn(
            "mb-1 flex items-center gap-2 transition-transform duration-300 ease-in-out self-center",
            collapsed ? "translate-x-1" : "translate-x-0"
          )}
        >
          <PanelsTopLeft className="mr-1 size-6" />
          <h1
            className={cn(
              "whitespace-nowrap font-sans text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
              collapsed ? "hidden -translate-x-96 opacity-0" : "translate-x-0 opacity-100"
            )}
          >
            Worker AI
          </h1>
        </Link>
        <Menu isOpen={!collapsed} />
      </div>
    </aside>
  )
}
