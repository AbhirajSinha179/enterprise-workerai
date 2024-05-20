import { MoveRight } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/navbar/site-nav"
import { BentoGridLanding } from "@/components/site/bento"
import { Button } from "@/components/ui/button"
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LP_GRID_ITEMS } from "lp-items"
// import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Worker AI",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}


export default function Web() {
  return (
    <>
      <SiteNav />
      <section className="bg-grid-white/[0.02] antialiased bg-background/[0.96]">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center md:my-20 lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-7xl text-4xl tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Adapt <MoveRight className="hidden sm:inline-block sm:size-12 " /> Automate{" "}
              <MoveRight className="hidden sm:inline-block sm:size-12" /> Accelerate
            </h1>

            <h1 className="mb-6 max-w-6xl text-xl leading-none tracking-tight dark:text-white md:text-3xl lg:mb-8 lg:text-6xl">
              Hyper-scale your outbounds with Worker AI
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-sm font-thin text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Redefining B2B <span className="font-semibold text-foreground">sales</span> with end-to-end{" "}
              <span className="font-semibold text-foreground">automation</span>, from prospecting{" "}
              <span className="font-semibold text-foreground">leads</span> to deal closure
            </p>
            <div className="group mx-auto flex max-w-sm flex-wrap items-center justify-center gap-2">
              <Button asChild className="h-12 min-w-fit flex-1">
                <Link href="https://github.com/Blazity/next-enterprise">Get started</Link>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="animate-shimmer inline-flex h-12 min-w-fit flex-1 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <Link href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise">
                  Learn more
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background" id="image-cover">
        <div className="mx-auto my-6 max-w-screen-xl rounded-xl border border-transparent bg-white p-4 py-8 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none sm:py-16 lg:px-6">
          <Image
            src="/assets/images/dashboard_random_mockup.jpg"
            alt="Hero image"
            width={1920}
            height={1080}
            className="rounded-md"
          />
        </div>
        <h1 className="mx-auto mt-24 max-w-6xl text-center text-xl leading-none tracking-tight md:text-3xl lg:mb-8 lg:text-6xl ">
          Orthodox sales systems are slowing down your business growth.
        </h1>
      </section>
      <section className="bg-background" id="bento-layout">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:py-16 lg:px-6">
          <BentoGridLanding />
        </div>
      </section>
      <section className="bg-background">
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
    </>
  )
}
