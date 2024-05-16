import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
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
  return (
    <section className="border-2 px-4">
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 py-20 lg:grid-cols-5">
        <div className="sm:col-span-3 lg:col-span-2">
          <h3 className="mb-2 text-3xl font-bold">Worker AI</h3>
          <p className="max-w-sm text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <div className="mt-8">
            <ButtonLink href=""> hello@workerai.co</ButtonLink>
          </div>

          <div className="mt-8 flex flex-row  ">
            <InstagramLogoIcon className="mr-4 h-6 w-6" />
            <TwitterLogoIcon className="mr-4 h-6 w-6" />
            <LinkedInLogoIcon className="mr-4 h-6 w-6" />
          </div>
        </div>
        {footerLinks.map((footerLink) => (
          <div key={footerLink.title}>
            <h3 className="mb-4 text-sm font-bold">{footerLink.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerLink.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full py-2">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <p>
            <span className="text-xs">&copy; {new Date().getFullYear()} Worker AI</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
