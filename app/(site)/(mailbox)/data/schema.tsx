import { z } from "zod"
export const mailsSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    domain: z.string(),
    warmupCapacity: z.string(),
})

export type Mails = z.infer<typeof mailsSchema>