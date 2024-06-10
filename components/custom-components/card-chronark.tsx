"use client"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

import { MouseEventHandler, PropsWithChildren } from "react"

export const CardChronark: React.FC<PropsWithChildren> = ({ children }) => {
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
      className="group relative overflow-hidden rounded-xl border border-zinc-600 duration-300 hover:border-zinc-400/50 hover:bg-zinc-800/10 md:gap-8 "
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 blur transition duration-500 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10  bg-gradient-to-br via-zinc-100/10  opacity-10  transition duration-500 group-hover:opacity-30 bg-zinc-700 "
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


//usage-

// <div className="grid grid-cols-1 gap-8 mx-10 lg:grid-cols-2  ">
//   <CardChronark>
//     <Link href="/dashboard">
//       <article className="relative w-full h-full p-4 md:p-8">
//         <div className="flex items-center justify-between gap-2">
//           {/* <div className="text-xs text-zinc-100">
//                   {featured.date ? (
//                     <time dateTime={new Date(featured.date).toISOString()}>
//                       {Intl.DateTimeFormat(undefined, {
//                         dateStyle: "medium",
//                       }).format(new Date(featured.date))}
//                     </time>
//                   ) : (
//                     <span>SOON</span>
//                   )}
//                 </div> */}
//           {/* <span className="flex items-center gap-1 text-xs text-zinc-500">
//                   <Eye className="w-4 h-4" />{" "}
//                   {Intl.NumberFormat("en-US", { notation: "compact" }).format(
//                     views[featured.slug] ?? 0
//                   )}
//                 </span> */}
//         </div>

//         <h2
//           id="featured-post"
//           className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
//         >
//           King
//         </h2>
//         <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
//           King wanna be king as a king why not king what the fuck kign
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sapiente quis porro velit ullam magni ipsum, quod aliquam dignissimos? Magni facilis pariatur tempora nisi accusantium vel voluptatibus laborum culpa deserunt.
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit animi iste quis iusto. Nemo ad aperiam consequuntur delectus culpa, non aspernatur aut id odit facilis magnam quasi, quisquam libero nostrum!
//         </p>
//         <div className="absolute bottom-4 md:bottom-8">
//           <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
//             Read more <span aria-hidden="true">&rarr;</span>
//           </p>
//         </div>
//       </article>
//     </Link>
//   </CardChronark>
// </div>
