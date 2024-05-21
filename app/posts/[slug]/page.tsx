import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CoverImage from "@/components/blogs/cover-image"
import markdownStyles from "@/components/blogs/markdown-styles.module.css"
import { getAllPosts, getPostBySlug } from "@/lib/api"
import markdownToHtml from "@/lib/markdownToHtml"

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }
  const content = await markdownToHtml(post.content || "")
  return (
    <main>
      <div
        className="bg-secondary-foreground w-full py-6"
      >
      </div>
      <div className="container mx-auto px-5" >
        <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/blog" className="hover:underline">
            Blogs
          </Link>
          .
        </h2>
        <article className="mb-32">

          <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
            {post.title}
          </h1>
          <div className="mb-8 sm:mx-0 md:mb-16">
            <CoverImage title={post.title} src={post.coverImage} />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </article>
      </div>
    </main>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const title = `${post.title} | Worker AI Blog`

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
