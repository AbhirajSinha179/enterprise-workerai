import matter from "gray-matter"
import fs from "fs"
import { join } from "path"

export type Post = {
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

const postsDirectory = join(process.cwd(), "app/(site)/(blog)/_posts")
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug))
  return posts
}
