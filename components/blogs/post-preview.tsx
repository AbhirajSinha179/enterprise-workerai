import Link from "next/link"

import CoverImage from "./cover-image"

type Props = {
  title: string
  coverImage: string
  excerpt: string

  slug: string
}

export function PostPreview({ title, coverImage, excerpt, slug }: Props) {
  return (
    <>
      <div className="max-w-[420px]">
        <div className="my-3">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <h3 className="mb-3 text-3xl leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* <p className="mb-4 text-lg leading-relaxed">{excerpt}</p> */}
      </div>

    </>

  )
}
