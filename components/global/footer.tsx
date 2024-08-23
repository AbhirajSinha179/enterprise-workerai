import { DiscordLogoIcon, EnvelopeClosedIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardChronark } from "../custom-components/card-chronark"
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
  return (
    <CardChronark isFooter={true}>
      <section className="mt-8 px-4 text-center sm:text-left">
        <div className="mx-auto grid w-full max-w-screen-xl gap-8 py-10 lg:grid-cols-5">
          <div className="mx-auto sm:col-span-3 lg:col-span-2">
            <h3 className="mb-4 text-4xl font-bold">Worker AI </h3>
            <p className="max-w-sm text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>

            <div className="mt-10 flex gap-4 flex-col">

              <Link
                href="mailto:hello@workerai.co"
                className="underline-animated mx-auto text-center md:mx-0 md:text-left"
                target="_blank"
              >
                hello@workerai.co
              </Link>

              <div className="flex flex-row justify-center sm:justify-start">
                <Link href="https://www.linkedin.com/company/workerai/" target="_blank" rel="noopener noreferrer">
                  <LinkedInLogoIcon className="mr-4 size-6 transition-transform hover:scale-125" />
                </Link>
                <Link href="https://twitter.com/workerai_" target="_blank" rel="noopener noreferrer">
                  <TwitterLogoIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
                <Link href="https://discord.gg/34FVxdy9" target="_blank" rel="noopener noreferrer">
                  <DiscordLogoIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
                <Link href="mailto:hello@workerai.co" target="_blank" rel="noopener noreferrer">
                  <EnvelopeClosedIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
              </div>
            </div>
          </div>
          {footerLinks.map(({ title, links }) => (
              <div key={title} className="sm:col-span-3 lg:col-span-1">
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <ul className="text-md space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <div className="underline-animated mx-auto text-center md:mx-0 md:text-left">
                        <Link href={link.href}>{link.name}</Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className="mx-auto max-w-screen-xl py-2">
          <hr className="mb-2 border-t border-gray-200" />
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="space-x-4">
              <Link href="">
                <Button variant="link" size={"useLink"}>
                  Terms of Use
                </Button>
              </Link>
              <Link href="">
                <Button variant="link" size={"useLink"}>
                  Privacy Policy
                </Button>
              </Link>
            </div>
            <div className="flex max-w-screen-xl items-center justify-center">
              <p>
                <span className="text-xs">© {new Date().getFullYear()} Worker AI, Inc. All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </CardChronark>
  )
}

export default Footer
