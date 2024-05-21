import React from "react"
import { HeroPost } from "@/components/blogs/hero-post"
import { MoreStories } from "@/components/blogs/more-stories"
import { getAllPosts } from "@/lib/api"

const blogs = () => {
  const allPosts = getAllPosts()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <div>
        <h1 className="pt-10 text-center text-4xl font-bold">Worker AI Blog</h1>
      </div>
      <hr className="mt-10 border-t border-gray-200" />
      <div className="mt-8">
        <div className="container mx-auto px-5">
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </div>
    </>
  )
}

export default blogs
