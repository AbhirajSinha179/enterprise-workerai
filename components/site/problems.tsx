"use client"

import { FADE_UP_ANIMATION_VARIANTS, landingConfig, MESSAGE_BUBBLE_QUESTIONS } from "@/lib/constants"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button, ButtonProps } from "../ui/button"
import { cn } from "@/lib/utils"

const GradientSeparator = () => (
  <>
    <div className="h-12 w-1 rounded-t-full bg-gradient-to-b from-[#63e] via-violet-400 to-transparent md:h-20 md:w-2"></div>
  </>
)

export const Problems = () => {
  return (
    <section id="features" className="container relative my-12 sm:mt-32">
      <div className="mx-auto grid place-content-center gap-4 text-center lg:mb-8">
        <div className=" relative mx-auto my-6 max-w-screen-2xl after:absolute after:inset-0 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="before:animate-image-glow rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)]"
          >
            {/* <div className="solid-transparent mask-clip-padding-box border-box mask-composite-intersect mask-linear-gradient(transparent,transparent),linear-gradient(white,white) after:animation-delay-11s after:bg-linear-gradient(to_left,var(--color-one),var(--color-two),transparent) after:offset-anchor-90% 50% after:offset-path-rect(0_auto_auto_0_round_200px) absolute inset-0 rounded-[inherit] border-[1.5px] after:absolute after:aspect-square after:w-[calc(200px)] after:animate-border-beam" /> */}
            <Image
              src="/assets/images/dashboard_workerai.jpeg"
              alt="Hero image"
              width={1920}
              height={1080}
              className="relative size-full rounded-xl border"
            />
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="my-32"
        >
          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-8 text-3xl leading-none tracking-tight md:text-5xl lg:text-6xl"
          >
            Sales is challenging.
          </motion.h1>
          <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="mb-8 text-sm md:text-lg mx-auto max-w-4xl">
            Managing leads, tracking interactions, and nurturing prospects can be overwhelming, time-consuming, and
            expensive. 
          </motion.p>
          <AnimatedMessageBubbles />
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="mx-auto my-12 max-w-4xl rounded-2xl border-transparent bg-white px-4 shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none"
      >
        <Image
          src={landingConfig.featureSection.imageUri}
          alt="Hero image"
          width={1200}
          height={900}
          className="w-full rounded-md bg-cover bg-center invert"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="mx-auto grid max-w-7xl place-content-center gap-12 p-4 md:my-48 md:grid-cols-3"
      >
        {landingConfig.featureSection.features.map((feature) => (
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            key={feature?.title}
            className="flex flex-1 items-center gap-x-4"
          >
            <GradientSeparator />
            <div>
              <p className="flex-1 grow md:text-lg">{feature?.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

const AnimatedMessageBubbles = () => {


  const getRandomDelay = () => Math.random() * 0.8 +0.1 // Random delay between 0.2 and 1
  const getRandomDuration = () => Math.random() * 0.3 + 0.3 // Random duration between 0.3 and 0.6

  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 px-8">
      {MESSAGE_BUBBLE_QUESTIONS.map((item, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                delay: getRandomDelay(),
                duration: getRandomDuration(),
              },
            },
          }}
          className=" "
        >
          <EyeCatchingButton className="min-w-32">{item}</EyeCatchingButton>
        </motion.div>
      ))}
    </div>
  )
}

export const EyeCatchingButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="outline"
      className={cn("font-base font-geist rounded-xl bg-[length:300%] text-lg tracking-wide", props.className)}
    />
  )
}
