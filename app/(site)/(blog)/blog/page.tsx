import React from "react";
import { HeroPost } from "@/components/blogs/hero-post";
import { MoreStories } from "@/components/blogs/more-stories";
import { getAllPosts } from "@/lib/api";

const Blogs = async () => {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  const secondHeroPost = allPosts[1];
  const morePosts = allPosts.slice(2);

  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto px-5">
          <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-5xl">Blogs</h1>
          <div className="grid grid-cols-2 gap-4">
            <div >
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              )}
            </div>
            <div >
              {secondHeroPost && (
                <HeroPost
                  title={secondHeroPost.title}
                  coverImage={secondHeroPost.coverImage}
                  slug={secondHeroPost.slug}
                  excerpt={secondHeroPost.excerpt}
                />
              )}
            </div>
          </div>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </div>
    </>
  );
};

export default Blogs;
