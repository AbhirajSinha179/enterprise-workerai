import { AboutUsSection } from "@/components/site/about-us"
import { ABOUT_US_SECTIONS } from "@/lib/constants"

export default function Page() {
  return (
    <main className="container relative my-24 overflow-hidden">
      <h1 className="underline-animated mx-auto mb-8 text-center text-6xl font-bold lg:text-7xl">About Us</h1>
      <div className="flex flex-col items-center justify-center gap-8">
        {ABOUT_US_SECTIONS.map((section, index) => (
          <AboutUsSection key={index} {...section} />
        ))}
      </div>
    </main>
  )
}
