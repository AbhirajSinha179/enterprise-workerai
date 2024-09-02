"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { WaitlistForm } from "./waitlist-form"
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants"
import Particles from "../ui/particles"

export default function Landing() {
  return (
    <section className="relative min-h-[calc(100vh-40px)] overflow-hidden rounded-b-xl bg-[linear-gradient(to_bottom,#6d28d9,#6d28d9_50%,#e8e8e8_88%)] dark:bg-[linear-gradient(to_bottom,#000,#0000_40%,#503f7b_78%,#6d28d9_99%_50%)]">
      <div className="absolute inset-0 h-[600px]  w-full bg-transparent background_grid opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute left-1/2 top-[calc(100%-90px)]  h-[500px] w-[700px] -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#6d28d9)] md:h-[500px] md:w-[1100px] lg:top-[calc(100%-150px)] lg:h-[750px] lg:w-[140%]"></div>

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
      {/* <div className="relative mx-auto my-6 max-w-screen-2xl after:absolute after:inset-0 after:[background:linear-gradient(to_top,black_10%,transparent)]">
        <div className="before:animate-image-glow rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)]">
          <div className="solid-transparent mask-clip-padding-box border-box mask-composite-intersect mask-linear-gradient(transparent,transparent),linear-gradient(white,white) after:animation-delay-11s after:bg-linear-gradient(to_left,var(--color-one),var(--color-two),transparent) after:offset-anchor-90% 50% after:offset-path-rect(0_auto_auto_0_round_200px) absolute inset-0 rounded-[inherit] border-[1.5px] after:absolute after:aspect-square after:w-[calc(200px)] after:animate-border-beam" />
          <Image
            src="/assets/images/dashboard_workerai.jpeg"
            alt="Hero image"
            width={1920}
            height={1080}
            className="relative size-full rounded-xl border"
          />
        </div>
      </div> */}
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
    </section>
  )
}
