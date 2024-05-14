"use client"

import React from "react"
import { useLockedBody } from "@/hooks/useBodyLock"
// import { NavbarWrapper } from "../navbar/navbar"
// import { SidebarWrapper } from "../sidebar/sidebar"
import { SidebarContext } from "./layout-context"
import { Sidebar } from "../sidebar/sidebar"
import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [_, setLocked] = useLockedBody(false)
  const handleToggleSidebar: () => void = () => {
    setSidebarOpen(!sidebarOpen)
    setLocked(!sidebarOpen)
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <Sidebar />
      <main
        className={cn(
          "min-h-[100vh] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
           sidebarOpen===false? "lg:ml-72" :"lg:ml-[90px]"
        )}
      >
        {children}
      </main>{" "}
    </SidebarContext.Provider>
  )
}
