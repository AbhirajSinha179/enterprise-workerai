import { MoveRight } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BentoGridLanding } from "@/components/site/bento"
import InputSpotlightBorder from "@/components/site/input-spotlight-border"
import { WaitlistForm } from "@/components/site/waitlist-form"
import { WobbleCardDemo } from "@/components/site/wobble-grid"
import { Button } from "@/components/ui/button"
import { landingConfig } from "@/lib/constants"
import { LP_GRID_ITEMS } from "lp-items"

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

/**        <div className="mx-auto grid w-full max-w-md grid-cols-5 sm:max-w-7xl">
          {/* <Image
            src="/assets/images/warmupcard.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full rounded-2xl"
          /> 
          <Image
            src="/assets/images/warmupcard.svg"
            // layout="fill"
            width={600}
            height={600}
            objectFit="cover"
            alt="WorkerAI warmup"
            className="col-span-5 hidden size-full sm:block"
          />
          <Image
            src="/assets/images/warmupcard (2).svg"
            // layout="fill"
            width={600}
            height={600}
            objectFit="cover"
            alt="WorkerAI warmup"
            className="col-span-5 size-full sm:hidden"
          />
          <Image
            src="/assets/images/leads_card.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full sm:col-span-3"
          />
          <Image
            src="/assets/images/prospects.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full sm:col-span-2"
          />
          <Image
            src="/assets/images/emails_card.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full sm:col-span-2"
          />
          <Image
            src="/assets/images/comm_card.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full sm:col-span-3"
          />
          <Image
            src="/assets/images/leadstoclients.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 hidden size-full sm:block"
          />
          <Image
            src="/assets/images/leadstoclients (3).svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 sm:hidden"
          />
        </div>
 */

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
    <main className="overflow-hidden">
      {/* <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_-30%,#000_70%,transparent_100%)]"></div> */}
      {/* <div className="absolute inset-0 h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
      <div className="absolute w-screen h-[70vh] overflow-hidden -z-10 inset-0 size-full items-center px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_-10%,#63e_0%,transparent_60%)]"></div>
      <section className="relative min-h-screen">
        <div className="mx-auto grid px-6 py-8 md:text-center md:my-20 lg:py-16">
          <div className="mx-auto grid min-h-[60vh] place-content-center sm:min-h-[50vh]">
            <h1 className="mb-12 max-w-6xl text-5xl leading-none tracking-tight dark:text-white md:text-5xl lg:mb-12 xl:text-7xl">
              Hyper-scale your Outbounds with{" "}
              <span className="inline-flex animate-text-gradient bg-gradient-to-l from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent">
                WorkerAI
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-5xl text-base/loose font-thin text-opacity-95 md:text-lg lg:mb-8 lg:text-xl">
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
            </p>
            <WaitlistForm />
          </div>
        </div>
        <div className="relative mx-auto my-6 max-w-screen-2xl after:absolute after:inset-0 after:[background:linear-gradient(to_top,black_10%,transparent)]">
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
        </div>
      </section>
      <section id="image-cover" className="container ">
        <div className="mx-auto grid max-w-6xl place-content-center gap-4 text-center lg:mb-8 ">
          <h1 className="text-3xl leading-none tracking-tight md:text-5xl lg:text-6xl">
            Orthodox sales systems are slowing down your business growth.
          </h1>
          <p className="text-sm md:text-lg">Understand how to get through this bs</p>
        </div>
      </section>

      <section id="features" className="container relative my-12 sm:mt-24">
        <div className="mx-auto my-6 max-w-4xl rounded-xl border border-transparent bg-white shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none">
          <Image
            src={landingConfig.featureSection.imageUri}
            alt="Hero image"
            width={1200}
            height={900}
            className="w-full rounded-md bg-cover bg-center"
          />
        </div>
        <div className="mx-auto grid max-w-7xl place-content-center gap-12 p-4 md:my-48 md:grid-cols-3">
          <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
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

      <section className="relative" id="bento-layout">
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-evenly sm:max-w-7xl">
          {LANDING_PAGE_GRID_CARDS.map((item, ind) => (
            <div
              key={item.title}
              className={
                `flex w-full items-center justify-between p-4 max-sm:flex-col ` +
                (ind % 2 === 0 ? "text-right" : "flex-row-reverse")
              }
            >
              <Image src={item.image} alt={item.title} width={600} height={600} className="rounded-xl" />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
