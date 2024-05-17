// import { motion } from "framer-motion"
import React from "react"
// import BlogFilters from "@/components/customComponents/blogFilter"
import BlogHeader from "@/components/customComponents/blogHeader"
import Container from "@/components/customComponents/container"
import { HeroPost } from "@/components/customComponents/hero-post"
import { MoreStories } from "@/components/customComponents/more-stories"
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
