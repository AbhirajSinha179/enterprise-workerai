import React from "react";
import { HeroPost } from "@/components/blogs/hero-post";
import { MoreStories } from "@/components/blogs/more-stories";
import { getAllPosts } from "@/lib/api";

const Blogs = async () => {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto px-5">
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </div>
    </>
  );
};

export default Blogs;
