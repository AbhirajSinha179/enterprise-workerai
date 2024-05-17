import { Metadata } from "next"
import { notFound } from "next/navigation"
import Alert from "@/components/customComponents/alert"
import Container from "@/components/customComponents/container"
import Header from "@/components/customComponents/header"
import { PostBody } from "@/components/customComponents/post-body"
import { PostHeader } from "@/components/customComponents/post-header"
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
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader title={post.title} coverImage={post.coverImage} />
          <PostBody content={content} />
        </article>
      </Container>
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
  const CMS_NAME = "Markdown"

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`

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
