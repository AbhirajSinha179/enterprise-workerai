"use client"

import { FADE_UP_ANIMATION_VARIANTS, landingConfig, MESSAGE_BUBBLE_QUESTIONS } from "@/lib/constants"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button, ButtonProps } from "../ui/button"
import { cn } from "@/lib/utils"

const GradientSeparator = () => (
  <div className="h-8 w-1 rounded-t-full bg-gradient-to-b from-[#63e] via-violet-400 to-transparent sm:h-12 md:h-20 md:w-2"></div>
)

export const Problems = () => {
  return (
    <section id="features" className="px-2 sm:px-4 relative sm:mt-32">
      <div className="mx-auto grid place-content-center gap-4 text-center lg:mb-8">
        <div className="relative mx-auto my-6 px-1 max-w-screen-2xl after:absolute after:inset-0">
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
            className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] relative"
          >
            <Image
              src="/assets/images/dashboard_workerai.jpeg"
              alt="Hero image"
              width={1920}
              height={1080}
              className="w-full rounded-xl"
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
          className="my-8 sm:my-16 lg:my-32"
        >
          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-4 text-3xl leading-tight tracking-tight sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Sales is challenging.
          </motion.h1>
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mb-4 text-xs sm:mb-8 sm:text-sm md:text-lg mx-auto max-w-xl sm:max-w-5xl"
          >
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
        className="mx-auto my-6 sm:my-12 max-w-xs sm:max-w-md md:max-w-5xl rounded-2xl border-transparent  px-2 sm:px-4 shadow-xl dark:border-white/[0.2]  dark:shadow-none"
      >
        <Image
          src={landingConfig.featureSection.imageUri}
          alt="Hero image"
          width={1000}
          height={700}
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
          }
        }
        }
        className="mx-auto grid max-w-xs sm:max-w-md md:max-w-7xl place-content-center gap-8 sm:gap-12 p-4 md:my-48 md:grid-cols-3"
      >
        {landingConfig.featureSection.features.map((feature) => (
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            key={feature?.title}
            className="flex flex-1 items-center gap-x-2 sm:gap-x-4"
          >
            <GradientSeparator />
            <div>
              <p className="text-sm sm:text-base md:text-lg">{feature?.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

const AnimatedMessageBubbles = () => {
  const getRandomDelay = () => Math.random() * 0.8 + 0.1
  const getRandomDuration = () => Math.random() * 0.3 + 0.3

  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 sm:gap-x-12 px-4 sm:px-8">
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
          className=""
        >
          <EyeCatchingButton className="min-w-24 sm:min-w-32">{item}</EyeCatchingButton>
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
      className={cn("text-xs sm:text-sm md:text-lg font-base overflow-clip cursor-default font-geist rounded-xl bg-[length:300%]", props.className)}
    />
  )
}
