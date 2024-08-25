import { z } from "zod"
export const leadsSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    company: z.string().optional().nullable().default(" "),
    status: z.string().optional().default("doneFirst"),
    engaged: z.string().optional().default("no"),
})

export type Leads = z.infer<typeof leadsSchema>