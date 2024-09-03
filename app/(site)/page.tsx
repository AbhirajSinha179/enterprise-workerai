import Landing from "@/components/site/landing"
import { Features } from "@/components/site/features"
import { Problems } from "@/components/site/problems"

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

export default function Web() {
  return (
    <main className="relative overflow-hidden">
      <Landing />
      <Problems />
      <Features />

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
