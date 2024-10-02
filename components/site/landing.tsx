"use client"

import { motion } from "framer-motion"
import { WaitlistForm } from "./waitlist-form"
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants"
import Particles from "../ui/particles"

export default function Landing() {
  return (
    <section className="relative min-h-80vh lg:min-h-[calc(100vh-40px)] overflow-hidden rounded-b-xl bg-[linear-gradient(to_bottom,#6d28d9,#6d28d9_50%,#e8e8e8_88%)] dark:bg-[linear-gradient(to_bottom,#000,#0000_40%,#503f7b_78%,#6d28d9_99%_50%)]">
      <div className="background_grid absolute inset-0 h-[600px] w-full bg-transparent opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute left-1/2 top-[calc(100%-90px)]  h-[500px] w-[700px] -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#6d28d9)] md:h-[500px] md:w-[1100px] lg:top-[calc(100%-150px)] lg:h-[750px] lg:w-[140%]"></div>

      <div className="mx-auto grid px-6 py-8 md:my-20 md:text-center lg:py-16">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="mx-auto grid min-h-[60vh] place-content-center sm:min-h-[50vh]"
        >
          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-12 max-w-4xl text-5xl leading-none tracking-tight md:text-5xl lg:mb-12 xl:text-7xl"
          >
            Hyper-scale your Outbounds with{" "}
            <span className="inline-flex animate-text-gradient bg-gradient-to-b from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent">
              WorkerAI
            </span>
          </motion.h1>

          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mx-auto mb-6 max-w-5xl text-base/loose font-thin text-opacity-95 md:text-lg lg:mb-8 lg:text-xl"
          >
            Redefining B2B{" "}
            <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text font-normal text-transparent">
              sales
            </span>{" "}
            with end-to-end{" "}
            <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text font-normal text-transparent">
              automation
            </span>
            , from prospecting{" "}
            <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text font-normal text-transparent">
              leads
            </span>{" "}
            to deal closure
          </motion.p>
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 200, opacity: 1 }}
        animate={{ y:0, opacity: 1 }}
        transition={{
          duration: 1.2,
          type: "spring"
         }}
        className="absolute inset-0 -z-10"
      >
        <Particles
          className="absolute inset-0 -z-10 hidden dark:block"
          quantity={90}
          ease={70}
          size={0.05}
          staticity={40}
          color="#ffffff"
        />
        <Particles
          className="absolute inset-0 -z-10 hidden dark:block"
          quantity={90}
          ease={70}
          size={0.1}
          staticity={40}
          color="#ffffff"
        />
        <Particles
          className="absolute inset-0 -z-10 block dark:hidden"
          quantity={50}
          ease={70}
          size={0.05}
          staticity={40}
          color="#000000"
        />
        <Particles
          className="absolute inset-0 -z-10 block dark:hidden"
          quantity={50}
          ease={70}
          size={0.8}
          staticity={40}
          color="#000000"
        />
      </motion.div>
    </section>
  )
}
