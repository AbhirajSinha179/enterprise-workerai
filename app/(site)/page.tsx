import { Metadata } from "next"
import Image from "next/image"
import StaggeredFade from "@/components/site/staggered-fade"
import { WaitlistForm } from "@/components/site/waitlist-form"
import { landingConfig } from "@/lib/constants"
import Landing from "@/components/site/landing"
import { Features } from "@/components/site/features"

export const metadata: Metadata = {
  title: "Worker AI",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    // url: "https://next-enterprise.vercel.app/",
    // images: [
    //   {
    //     width: 1200,
    //     height: 630,
    //     url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
    //   },
    // ],
  },
}

// TODO: Add metadata
// TODO: Footer info
// TODO: Data table needs to be independent of leads component, make separate components folder for that

const LANDING_PAGE_GRID_CARDS = [
  // {
  //   title: "Warmup",
  //   description: "Warm up your leads with personalized messages",
  //   image: "/assets/images/warmupcard.svg",
  // },
  {
    title: "Leads",
    description: "Get leads from LinkedIn, AngelList, and more",
    image: "/assets/images/leads_card.svg",
  },
  {
    title: "Prospects",
    description: "Convert leads to prospects with automated outreach",
    image: "/assets/images/prospects.svg",
  },
  {
    title: "Emails",
    description: "Send emails to prospects with automated follow-ups",
    image: "/assets/images/emails_card.svg",
  },
  {
    title: "Communication",
    description: "Communicate with prospects via calls and texts",
    image: "/assets/images/comm_card.svg",
  },
  // {
  //   title: "Leads to Clients",
  //   description: "Convert prospects to clients with automated follow-ups",
  //   image: "/assets/images/leadstoclients.svg",
  // },
]

const GradientSeparator = () => (
  <>
    <div className="h-12 w-1 rounded-t-full bg-gradient-to-b from-[#63e] via-violet-400 to-transparent md:h-20 md:w-2"></div>
  </>
)

export default function Web() {
  return (
    <main className=" overflow-hidden">
      {/* <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_-30%,#000_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
      {/* <div className="absolute w-screen h-[70vh] overflow-hidden -z-10 inset-0 size-full items-center px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_-10%,#63e_0%,transparent_60%)]"></div> */}
              
      <Landing />

      <section id="image-cover" className="container ">
        <div className="mx-auto grid max-w-6xl place-content-center gap-4 text-center lg:mb-8 ">
          <h1 className="text-3xl leading-none tracking-tight md:text-5xl lg:text-6xl">
            Orthodox sales systems are slowing down your business growth.
          </h1>
          {/* <p className="text-sm md:text-lg">Understand how to get through this bs</p> */}
        </div>
      </section>
      <Features />

      <section id="features" className="container relative my-12 sm:mt-24">
        <div className="mx-auto my-6 max-w-4xl rounded-2xl border-transparent bg-white shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none">
          <Image
            src={landingConfig.featureSection.imageUri}
            alt="Hero image"
            width={1200}
            height={900}
            className="w-full rounded-md bg-cover bg-center invert"
          />
        </div>
        <div className="mx-auto grid max-w-7xl place-content-center gap-12 p-4 md:my-48 md:grid-cols-3">
          {landingConfig.featureSection.features.map((feature) => (
            <div key={feature?.title} className="flex flex-1 items-center gap-x-4">
              <GradientSeparator />
              <div>
                <p className="flex-1 grow md:text-lg">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* <section className="relative my-32" id="bento-layout">
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-evenly sm:max-w-7xl">
          {LANDING_PAGE_GRID_CARDS.map((item, ind) => (
            <div
              key={item.title}
              className={
                `flex w-full items-center justify-between p-4 max-sm:flex-col max-sm:gap-12` +
                (ind % 2 === 0 ? "text-right" : "flex-row-reverse")
              }
            >
              <Image src={item.image} alt={item.title} width={600} height={600} className="rounded-lg" />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  )
}
