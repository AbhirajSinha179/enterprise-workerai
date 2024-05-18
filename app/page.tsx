import { Metadata } from "next"
import Link from "next/link"
import { CardChronark } from "@/components/customComponents/cardChronark"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

      <section className="bg-background">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center min-h-screen lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Worker AI
            </h1>

            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Jumpstart your enterprise project with our feature-packed, high-performance Next.js boilerplate!
              Experience rapid UI development, AI-powered code reviews, and an extensive suite of tools for a smooth and
              enjoyable development process.
            </p>
            {/* <ShadCardComponent /> */}
            <Button asChild>
              <Link href="https://github.com/Blazity/next-enterprise" className="mr-3">
                Get started
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise">
                Deploy Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-background">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full p-1.5 text-blue-700 lg:h-12 lg:w-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-8 mx-10 lg:grid-cols-2  ">
        <CardChronark>
          <Link href="/dashboard">
            <article className="relative w-full h-full p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                {/* <div className="text-xs text-zinc-100">
                  {featured.date ? (
                    <time dateTime={new Date(featured.date).toISOString()}>
                      {Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                      }).format(new Date(featured.date))}
                    </time>
                  ) : (
                    <span>SOON</span>
                  )}
                </div> */}
                {/* <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <Eye className="w-4 h-4" />{" "}
                  {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                    views[featured.slug] ?? 0
                  )}
                </span> */}
              </div>

              <h2
                id="featured-post"
                className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
              >
                King
              </h2>
              <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                King wanna be king as a king why not king what the fuck kign
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sapiente quis porro velit ullam magni ipsum, quod aliquam dignissimos? Magni facilis pariatur tempora nisi accusantium vel voluptatibus laborum culpa deserunt.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit animi iste quis iusto. Nemo ad aperiam consequuntur delectus culpa, non aspernatur aut id odit facilis magnam quasi, quisquam libero nostrum!
              </p>
              <div className="absolute bottom-4 md:bottom-8">
                <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                  Read more <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </article>
          </Link>
        </CardChronark>
      </div>
    </>
  )
}

