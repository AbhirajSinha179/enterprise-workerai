import React from "react"
import BlogHeader from "@/components/blog/blogs/blogHeader"
import Container from "@/components/blog/blogs/container"
import { HeroPost } from "@/components/blog/blogs/hero-post"
import { MoreStories } from "@/components/blog/blogs/more-stories"
import { getAllPosts } from "@/lib/api"

const blogs = () => {
  const allPosts = getAllPosts()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <BlogHeader />
      <hr className="mt-10 border-t border-gray-200" />
      {/* <BlogFilters /> */}
      <div className="mt-8">
        <Container>
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </div>
    </>
  )
}

export default blogs
