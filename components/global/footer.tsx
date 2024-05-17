"use client"
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { ButtonLink } from "../customComponents/customLink"

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Development", href: "#" },
      { name: "Design", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Contact Us", href: "#" },
      { name: "Support", href: "#" },
      { name: "Sales", href: "#" },
    ],
  },
]

const Footer = () => {
  const footerAnimation = {
    hidden: { y: "66%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  }
  const contentAnimation = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  }

  const titleAnimation = {
    hidden: { y: "66%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5, ease: "easeInOut" } },
  }
  const linksAnimation = {
    hidden: { y: "66%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" } },
  }

  // Discord link: https://discord.gg/34FVxdy9

  // Twitter link: https://twitter.com/workerai_

  // LinkedIn link: https://www.linkedin.com/company/workerai/

  // maibox: hello@workerai.co

  return (
    <section className="mt-8 border-2 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={footerAnimation}>
        <div className="mx-auto grid w-full max-w-screen-xl gap-8 py-10 lg:grid-cols-5">
          <div className=" sm:col-span-3 lg:col-span-2">
            <motion.div variants={titleAnimation}>
              <h3 className="mb-3 text-3xl font-bold">Worker AI </h3>
            </motion.div>
            <motion.div variants={linksAnimation}>
              <p className="max-w-sm text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </motion.div>

            <motion.div variants={linksAnimation} className="mt-10 flex-row hover:cursor-pointer ">
              <ButtonLink href="">hello@workerai.co</ButtonLink>

              <div className="mt-2 flex flex-row">
                {/* change the insta for gmail logo, also add each icon in a link */}
                {/* make the links filled on hover */}

                <InstagramLogoIcon className=" mr-4 h-6 w-6 transition-transform hover:scale-125" />
                <TwitterLogoIcon className="mr-4 h-6 w-6 transition-transform hover:scale-125 " />
                <LinkedInLogoIcon className="mr-4 h-6 w-6 transition-transform hover:scale-125 " />
              </div>
            </motion.div>
          </div>
          {/* <div className="grid w-full max-w-screen-xl grid-cols-3 gap-8"> */}
          {footerLinks.map((footerLink) => (
            <div key={footerLink.title} className="sm:col-span-3 lg:col-span-1">
              <motion.h3 className="mb-3 mt-4 text-2xl font-bold tracking-wide" variants={titleAnimation}>
                {footerLink.title}
              </motion.h3>
              <ul className="text-md space-y-3 ">
                {footerLink.links.map((link) => (
                  <motion.li key={link.name} variants={linksAnimation}>
                    <div className="hover:text-muted-foreground  ">
                      <a href={link.href}>{link.name}</a>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
          {/* </div> */}
        </div>

        <div className="mx-auto max-w-screen-xl py-2">
          <hr className="mb-2 border-t border-gray-200" />
          <div className="flex flex-row justify-between">
            <div className="flex w-1/6 justify-between">
              <ButtonLink href="">Terms of Use</ButtonLink>
              <ButtonLink href="">Privacy Policy</ButtonLink>
            </div>
            <div className="flex max-w-screen-xl items-center justify-center">
              <p>
                <span className="text-xs">© {new Date().getFullYear()} Worker AI, Inc.All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Footer
