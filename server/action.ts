import { getAllPosts } from "@/lib/api"

export const fetchAllPosts = async () => {
  const allPosts = getAllPosts()
  return allPosts
}
