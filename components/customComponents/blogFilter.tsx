"use client"

// import { formUrlQuery } from "@/sanity/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const links = ["All", "AI", "Digital Workers", "Growth", "SaaS"]

const BlogFilters = () => {
  const [active, setActive] = useState("")
  const searchParms = useSearchParams()
  const router = useRouter()

  const handleFilter = (link: string) => {
    let newUrl = ""

    if (active === link) {
      setActive("")
      //   newUrl = formUrlQuery({
      //     params: searchParms.toString(),
      //     keysToRemove: ["category"],
      //   })
    } else {
      setActive(link)

      //   newUrl = formUrlQuery({
      //     params: searchParms.toString(),
      //     key: "category",
      //     value: link.toLowerCase(),
      //   })
    }
    // console.log("on page ", link)

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex justify-center ">
      <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-5 sm:max-w-2xl">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => handleFilter(link)}
            className={`${
              active === link ? "text-lg text-muted-foreground " : ""
            } whitespace-nowrap rounded-lg px-8 py-2.5 text-lg capitalize `}
          >
            {link}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default BlogFilters
