import { MoveRight } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BentoGridLanding } from "@/components/site/bento"
import { Button } from "@/components/ui/button"
import InputSpotlightBorder from "@/components/site/input-spotlight-border"
import { landingConfig } from "@/lib/constants"
import { LP_GRID_ITEMS } from "lp-items"
import { WaitlistForm } from "@/components/site/waitlist-form"
import { WobbleCardDemo } from "@/components/site/wobble-grid"

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

// TODO: Add metadata, dashboard images
// TODO: Add sticky scroll reveal
// TODO: Footer info
// TODO: new section

const GradientSeparator = () => (
  <>
    <div className=" h-12 w-1 rounded-t-full bg-gradient-to-b from-[#e6e3ff] via-violet-200 to-transparent md:h-20 md:w-2"></div>
  </>
)

export default function Web() {
  return (
    <main className="overflow-hidden">
      {/* <SiteNav /> */}
      <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="fixed top-0 h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <section className="relative min-h-screen">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center md:my-20 lg:py-16">
          <div className="mx-auto grid min-h-[70vh] place-content-center sm:min-h-[50vh]">
            <h1 className="max-w-9xl mb-4 text-4xl font-thin tracking-tight dark:text-white md:text-5xl xl:text-7xl">
              Adapt <MoveRight className="hidden sm:inline-block sm:size-12 " /> Automate{" "}
              <MoveRight className="hidden sm:inline-block sm:size-12" /> Accelerate
            </h1>

            <h1 className="max-w-9xl mb-12 text-4xl font-thin leading-none tracking-tight dark:text-white md:text-5xl lg:mb-12 xl:text-6xl">
              Hyper-scale your outbounds with{" "}
              <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text font-normal text-transparent">
                WorkerAI
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-4xl text-sm/loose font-thin text-opacity-95 md:text-lg lg:mb-8 lg:text-xl">
              Redefining B2B{" "}
              {/* <span className="animate-text-gradient inline-flex bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent">
                sales
              </span>{" "} */}
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
            {/* <form className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-2">
              <InputSpotlightBorder />
              <Button
                variant="secondary"
                type="submit"
                asChild
                className="inline-flex h-12 min-w-fit flex-[0.5] animate-shimmer items-center justify-center
                  rounded-md border bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1
                dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-50"
              >
                <Link href={"/"}>Join the Waitlist</Link>
              </Button>
            </form> */}
            <WaitlistForm />
          </div>
        </div>
        <div className="mx-auto my-6 max-w-screen-xl rounded-xl border border-transparent bg-white shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none">
          <Image
            src="/assets/images/dashboard_workerai.jpeg"
            alt="Hero image"
            width={1920}
            height={1080}
            className="rounded-md"
          />
        </div>
      </section>
      <section id="image-cover">
        <div className="mx-auto my-12 grid min-h-[30vh] max-w-6xl place-content-center gap-4 text-center sm:min-h-[80vh] lg:mb-8 ">
          <h1 className="text-3xl leading-none tracking-tight md:text-5xl lg:text-6xl">
            Orthodox sales systems are slowing down your business growth.
          </h1>
          <p className="text-sm md:text-lg">Understand how to get through this bs</p>
        </div>
      </section>

      <section id="features" className="container relative my-12 sm:my-0 ">
        <div className="mx-auto my-6 max-w-4xl rounded-xl border border-transparent bg-white shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none">
          <Image
            src={landingConfig.features.imageUri}
            alt="Hero image"
            width={1200}
            height={900}
            className="w-full rounded-md bg-cover bg-center"
          />
        </div>
        <div className="mx-auto grid max-w-7xl place-content-center gap-12 p-4 md:my-48 md:grid-cols-3">
          <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          {landingConfig.features.features.map((feature) => (
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
        {/* <BentoGridLanding /> */}
        {/* <WobbleCardDemo /> */}
        <div className="mx-auto grid w-full max-w-md grid-cols-5 sm:max-w-7xl">
          {/* <Image
            src="/assets/images/warmupcard.svg"
            alt="Hero image"
            width={600}
            height={600}
            className="col-span-5 size-full rounded-2xl"
          /> */}
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
        <div className="absolute left-0 top-0 size-full">
          <div className="overflow-x-hidden">
            <div className="absolute left-0 h-32 w-[95%] -rotate-45 overflow-x-hidden bg-[#369DFD]/70 blur-[337.4px]"></div>
          </div>
          <div className="overflow-x-hidden">
            <div className="absolute right-0 top-[145%] h-64 w-[17%] overflow-x-hidden bg-[#369DFD]/20 blur-[110px]"></div>
          </div>
        </div>
      </section>
      {/* <section className="relative" id="sticky-scroll">
        <StickyScroll content={content} />
        <div className="absolute left-0 top-0 z-[-1] size-full">
          <div className="overflow-x-hidden">
            <div className="absolute left-0 h-32 w-[95%] -rotate-45 overflow-x-hidden bg-[#369DFD]/70 blur-[337.4px]"></div>
          </div>
          <div className="overflow-x-hidden">
            <div className="absolute right-0 top-[145%] h-64 w-[17%] overflow-x-hidden bg-[#369DFD]/20 blur-[110px]"></div>
          </div>
        </div>
      </section> */}
    </main>
  )
}
