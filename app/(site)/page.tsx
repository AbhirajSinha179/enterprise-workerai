import { MoveRight } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import InputSpotlightBorder from "@/components/custom-components/input-spotlight-border"
import { BentoGridLanding } from "@/components/site/bento"
import { Button } from "@/components/ui/button"
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
// TODO: Add metadata, dashboard images
// TODO: Add sticky scroll reveal
// TODO: Make Join the Waitlist form functional, use
// TODO: Adjust the tabs colours, no contrast due to tailwind config change

export default function Web() {

  return (
    <main className="overflow-hidden">
      {/* <SiteNav /> */}
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="fixed top-0 h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center md:my-20 lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-7xl text-4xl font-thin tracking-tight dark:text-white md:text-5xl  xl:text-6xl">
              Adapt <MoveRight className="hidden sm:inline-block sm:size-12 " /> Automate
              <MoveRight className="hidden sm:inline-block sm:size-12" /> Accelerate
            </h1>

            <h1 className="mb-6 max-w-6xl text-4xl font-thin leading-none tracking-tight dark:text-white md:text-5xl lg:mb-8 xl:text-6xl">
              Hyper-scale your outbounds with{" "}
              <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text font-normal text-transparent">
                WorkerAI
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-sm/loose font-thin text-opacity-85 md:text-lg lg:mb-8 lg:text-xl">
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
            <form className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-2">
              {/* <Input placeholder="Your email goes here" type="email" className="inline-flex min-w-fit flex-1" /> */}
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
            </form>
          </div>
        </div>
      </section>
      <section id="image-cover">
        <div className="mx-auto my-6 max-w-screen-xl rounded-xl border border-transparent bg-white shadow-xl shadow-input transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none">
          <Image
            src="/assets/images/dashboard_random_mockup.jpg"
            alt="Hero image"
            width={1920}
            height={1080}
            className="rounded-md"
          />
        </div>
        <div className="mx-auto my-12 grid min-h-[50vh] max-w-6xl place-content-center gap-4 text-center sm:min-h-[80vh] lg:mb-8 ">
          <h1 className="text-3xl leading-none tracking-tight md:text-5xl lg:text-6xl">
            Orthodox sales systems are slowing down your business growth.
          </h1>
          <p className="text-sm md:text-lg">Understand how to get through this bs</p>
        </div>
      </section>
      <section className="relative" id="bento-layout">
        {/* <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#63e_100%)]"></div> */}
        <div className="mx-2 max-w-screen-2xl sm:mx-auto">
          <BentoGridLanding />
        </div>
        <div className="absolute left-0 top-0 z-[-1] size-full">
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
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex size-10 items-center justify-center rounded-full p-1.5 text-blue-700 lg:size-12">
                  {singleItem.icon}
                </div>

                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
