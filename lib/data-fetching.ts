// app/lib/data-fetching.ts
import { threadsSchema } from "@/types/interface"

async function getData() {
  const res = await fetch("http://localhost:3000/threads")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()

  const result = threadsSchema.safeParse(data)
  if (!result.success) {
    console.error(result.error)
    throw new Error("Invalid data format")
  }
  return result.data
}

export { getData }
