// app/lib/schemas.ts
import { z } from "zod"

export const emailSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  text: z.string(),
  date: z.string(),
  read: z.boolean(),
  labels: z.array(z.string()),
})

export const threadSchema = z.object({
  threadid: z.string(),
  thread: z.array(emailSchema),
})

export const threadsSchema = z.array(threadSchema)
