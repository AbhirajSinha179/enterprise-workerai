"use client"
import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

import { MouseEventHandler, PropsWithChildren } from "react"

export const CardChronark = ({ children, isFooter = false }: { children: React.ReactNode; isFooter: boolean }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 })

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden border border-zinc-600 duration-300 hover:border-zinc-400/50 hover:bg-zinc-800/10 md:gap-8 ",
        !isFooter ?? "rounded-xl border"
      )}
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 blur transition duration-500 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10  bg-zinc-400 bg-gradient-to-br via-zinc-100/10  opacity-10 transition duration-500 group-hover:opacity-30 "
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-100 "
          style={style}
        />
      </div>

      {children}
    </div>
  )
}
