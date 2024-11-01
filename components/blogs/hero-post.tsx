import Link from "next/link"
// import CoverImage from "./cover-image"
import CoverImage from "@/components/blogs/cover-image"

type Props = {
  title: string
  coverImage: string
  excerpt: string
  slug: string
}

export function HeroPost({ title, coverImage, excerpt, slug }: Props) {
  return (
    <section>
      <div className="my-10 md:mb-54">
        <div className="py-4">
          {/* Cover Image */}
          <div>
            <CoverImage title={title} src={coverImage} slug={slug} />
            <h3 className="mt-4 text-3xl leading-tight lg:text-3xl">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
          </div>
          {/* Cover Image */}

          {/* Optional: Add the excerpt if needed */}
          {/* <p className="mt-4 text-lg leading-relaxed">{excerpt}</p> */}
        </div>
      </div>
    </section>
  )
}
