import { PostPreview } from "@/components/blogs/post-preview"

type Post = {
  slug: string
  title: string
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  preview?: boolean
}

type Props = {
  posts: Post[]
}

export function MoreStories({ posts }: Props) {
  return (
    <section className="my-10">
      <h2 className="mb-16 text-5xl font-bold leading-tight tracking-tighter md:text-5xl">More Stories</h2>
      <div className="mb-32 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-4 md:gap-y-12 lg:gap-x-12">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}