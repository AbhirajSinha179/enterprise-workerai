import { leadSchema } from "@/types/interface"
import { z } from "zod"

export const leadZodSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    company: z.string().optional().nullable().default(" "),
    status: z.string().optional().default("doneFirst"),
    engaged: z.string().optional().default("no"),
})
export const leadsSchema = z.object({
    total_leads: z.number(),
    limit: z.number(),
    offset: z.number(),
    page: z.number(),
    results: z.array(leadSchema)
});

export type Leads = z.infer<typeof leadsSchema>
export type Lead = z.infer<typeof leadZodSchema>