import { DiscordLogoIcon, EnvelopeClosedIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    <section className="mt-8 border-t-2 px-4 text-center sm:text-left">
      <div >
        <div className="mx-auto grid w-full max-w-screen-xl gap-8 py-10 lg:grid-cols-5">
          <div className=" sm:col-span-3 lg:col-span-2">
            <div >
              <h3 className="mb-3 text-3xl font-bold">Worker AI </h3>
            </div>
            <div >
              <p className="max-w-sm text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>

            <div className="mt-10 flex-row hover:cursor-pointer ">

              <Link href="mailto:hello@workerai.co" target="_blank" >
                <Button variant="link" size={"useLink"}>
                  hello@workerai.co
                </Button>
              </Link>

              <div className="mt-2 flex flex-row sm:justify-start justify-center">
                <Link
                  href="https://www.linkedin.com/company/workerai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInLogoIcon className="mr-4 size-6 transition-transform hover:scale-125" />
                </Link>
                <Link
                  href="https://twitter.com/workerai_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterLogoIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
                <Link
                  href="https://discord.gg/34FVxdy9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordLogoIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
                <Link
                  href="mailto:hello@workerai.co"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvelopeClosedIcon className="mr-4 size-6 transition-transform hover:scale-125 " />
                </Link>
              </div>
            </div>
          </div>
          {footerLinks.map((footerLink) => (
            <div key={footerLink.title} className="sm:col-span-3 lg:col-span-1">
              <h3 className="text-2xl font-bold mb-2">
                {footerLink.title}
              </h3>
              <ul className="text-md space-y-3 ">
                {footerLink.links.map((link) => (
                  <li key={link.name} >
                    <div className="hover:text-muted-foreground  ">
                      <Link href={link.href}>{link.name}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-screen-xl py-2">
          <hr className="mb-2 border-t border-gray-200" />
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="space-x-4">
              <Link href="" >
                <Button variant="link" size={"useLink"}>
                  Terms of Use
                </Button>
              </Link>
              <Link href="" >
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
      </div>
    </section>
  )
}

export default Footer
