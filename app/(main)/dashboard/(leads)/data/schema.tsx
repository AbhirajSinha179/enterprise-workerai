import { z } from "zod"
export const leadsSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    company: z.string(),
    status: z.string(),
    engaged: z.string(),
})

export type Leads = z.infer<typeof leadsSchema>