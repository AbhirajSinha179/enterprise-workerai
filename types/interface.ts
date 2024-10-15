import { z } from "zod"

export const emailSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  body: z.string().nullable(),
  subject: z.string(),
  recipient: z.string(),
  sendAt: z.string().nullable(),
  createdAt: z.string(),
  isFollowUp: z.boolean(),
  approved: z.boolean(),
  draftId: z.string().nullable(),
  messageId: z.string().nullable(),
  opened: z.boolean(),
  clicked: z.boolean(),
  replied: z.boolean(),
  bounced: z.boolean().nullable(),
  emailSent: z.boolean(),
})

export const leadSchema = z.object({
  id: z.string(),
  email: z.string(),
  imgUrl: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  seniority: z.string().nullable(),
  country: z.string().nullable(),
  linkedin: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  EmailAddStatus: z.string(),
  timezone: z.string().nullable(),
  companyId: z.string().nullable(),
  blackListed: z.boolean().nullable(),
})

export const replySchema = z.object({
  id: z.string().optional(),
  date: z.string().nullable(),
  subject: z.string().nullable(),
  body: z.string(),
  from: z.string(),
})

export const threadSchema = z.object({
  threadId: z.string(),
  emails: z.array(emailSchema),
  replies: z.array(replySchema).nullable(),
  lead: leadSchema,
})

export const threadsSchema = z.array(threadSchema)

// export interface UnscheduledEmailThread {
//   id: string
//   threadId: string
//   subject: string
//   body: string
//   sender: string
//   createdAt: string
//   updatedAt: string
//   status: string
// }

export interface UnscheduledEmailThread {
  id: string
  threadId: string
  subject: string
  body: string
  sender: string
  createdAt: string
  updatedAt: string | null
  status: string
  opened: boolean
  clicked: boolean
  replied: boolean
  bounced: boolean | null
  leadInfo: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    seniority: string | null
  }
  senderId: string
}

export const leadInfoSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  seniority: z.string().nullable(),
})

export const unscheduledEmailThreadSchema = z.object({
  id: z.string().uuid(),
  threadId: z.string().uuid(),
  subject: z.string(),
  body: z.string(),
  sender: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  status: z.string(),
  opened: z.boolean(),
  clicked: z.boolean(),
  replied: z.boolean(),
  bounced: z.boolean().nullable(),
  leadInfo: leadInfoSchema,
  senderId: z.string().uuid(),
})

export const unscheduledEmailResponseSchema = z.array(unscheduledEmailThreadSchema)

// export const unscheduledEmailResponseSchema = z.array(
//   z.object({
//     id: z.string(),
//     threadId: z.string(),
//     subject: z.string(),
//     body: z.string(),
//     sender: z.string(),
//     createdAt: z.string(),
//     updatedAt: z.string(),
//     status: z.string(),
//   })
// )

// export interface ScheduledEmailThread {
//   id: string
//   threadId: string
//   subject: string
//   body: string
//   sender: string
//   createdAt: string
//   updatedAt: string
//   status: string
// }

// export const emailSchedulerThreadSchema = z.object({
//   id: z.string(),
//   threadId: z.string(),
//   subject: z.string(),
//   body: z.string(),
//   sender: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   status: z.string(),
// })

// export const scheduledEmailResponseSchema = z.array(
//   z.object({
//     scheduledEmails: z.array(emailSchedulerThreadSchema),
//   })
// )

export interface ScheduledEmail {
  email: {
    id: string
    subject: string
    recipient: string
    createdAt: string
    sendAt: string | null
    body: string | null
    isFollowUp: boolean
    approved: boolean
    draftId: string | null
    messageId: string | null
    emailSent: boolean
    threadId: string
    opened: boolean
    clicked: boolean
    replied: boolean
    bounced: boolean | null
  }
  lead: {
    id: string
    email: string
    imgUrl: string | null
    firstName: string
    lastName: string | null
    seniority: string | null
    country: string | null
    linkedin: string | null
    city: string | null
    state: string | null
    EmailAddStatus: string
    timezone: string | null
    companyId: string | null
    blackListed: boolean | null
    enriched: string
    enrichedAt: string | null
  }
  senderId: string
}

export const scheduledEmailSchema = z.object({
  email: z.object({
    id: z.string(),
    subject: z.string(),
    recipient: z.string(),
    createdAt: z.string(),
    sendAt: z.string().nullable(),
    body: z.string().nullable(),
    isFollowUp: z.boolean(),
    approved: z.boolean(),
    draftId: z.string().nullable(),
    messageId: z.string().nullable(),
    emailSent: z.boolean(),
    threadId: z.string(),
    opened: z.boolean(),
    clicked: z.boolean(),
    replied: z.boolean(),
    bounced: z.boolean().nullable(),
  }),
  lead: z.object({
    id: z.string(),
    email: z.string(),
    imgUrl: z.string().nullable(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    seniority: z.string().nullable(),
    country: z.string().nullable(),
    linkedin: z.union([z.string(), z.literal("")]).nullable(),
    city: z.union([z.string(), z.literal("")]).nullable(),
    state: z.union([z.string(), z.literal("")]).nullable(),
    EmailAddStatus: z.string(),
    timezone: z.string().nullable(),
    companyId: z.string().nullable(),
    blackListed: z.boolean().nullable(),
    enriched: z.string(),
    enrichedAt: z.string().nullable(),
  }),
  senderId: z.string(),
})

export const scheduledEmailResponseSchema = z.object({
  scheduledEmails: z.array(scheduledEmailSchema),
})

// export const emailSchemaSchedular = z.object({
//   id: z.number(),
//   subject: z.string(),
//   body: z.string(),
//   date: z.string(),
//   scheduled: z.boolean(),
//   recipient: z.string(),
// })

// export const schedularEmailSchema = z.array(emailSchemaSchedular)

export interface Email {
  id: string
  threadId: string
  // name: string
  body: string | null
  subject: string
  recipient: string
  sendAt: string | null
  createdAt: string
  isFollowUp: boolean
  approved: boolean
  draftId: string | null
  messageId: string | null
  opened: boolean
  clicked: boolean
  replied: boolean
  bounced: boolean | null
  emailSent: boolean
}

export interface Lead {
  id: string
  email: string
  imgUrl: string | null
  firstName: string
  lastName: string
  seniority: string | null
  country: string | null
  linkedin: string | null
  city: string | null
  state: string | null
  EmailAddStatus: string
  timezone: string | null
  companyId: string | null
  blackListed: boolean | null
}

export interface Thread {
  threadId: string
  emails: Email[]
  replies: [] | Reply[] | Email[] | any
  lead: Lead
}

export interface Reply {
  id: string
  date: string
  subject: string
  body: string
  from: string
}

export interface CombinedMail {
  type: "EMAIL" | "REPLY"
  data: Email | Reply
}

export interface MailProps {
  accounts?: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  threads: Thread[]
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export interface MailDisplayProps {
  threadData: Thread | null
}

export interface MailListProps {
  items: Thread[]
}

export interface ThreadList {
  threadid: string
  thread: Email[]
}

export interface Mailbox {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  userId: string
  warmupCapacity: number
  dailyCapacity: number
}

export interface StatDashboard {
  title: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
export interface DataGraph {
  date: string
  opens: number
  total_emails: number
  total_unique_emails: number
}
export interface SalesDataItem {
  name: string
  email: string
}

// export const statDashboardSchema = z.object({
//   title: z.string(),
//   value: z.string(),
//   icon: z.string(),
// })

// export const dataGraphSchema = z.object({
//   name: z.string(),
//   uv: z.number(),
//   pv: z.number(),
//   amt: z.number(),
// })

// export const salesDataItemSchema = z.object({
//   name: z.string(),
//   email: z.string(),
// })

// export const dashboardDataSchema = z.object({
//   statsDashboard: z.array(statDashboardSchema),
//   dataGraph: z.array(dataGraphSchema),
//   recentSalesData: z.array(salesDataItemSchema),
// })

const dataItemSchema = z.object({
  date: z.string(), // ISO string format for dates
  opens: z.number(),
  total_emails: z.number(),
  total_unique_emails: z.number(),
})

// Define the schema for the overall dashboard data
export const dashboardDataSchema = z.object({
  total_clicks: z.number(),
  total_opens: z.number(),
  data: z.array(dataItemSchema),
})

export const emailThreadSchema = z.object({
  id: z.string(),
  subject: z.string(),
  recipient: z.string(), // Changed from 'recipients' array to 'recipient' string
  createdAt: z.string(),
  sendAt: z.string().nullable(), // Added nullable field
  body: z.string(),
  isFollowUp: z.boolean(),
  approved: z.boolean(),
  draftId: z.string().nullable(), // Added nullable field
  messageId: z.string().nullable(), // Added nullable field
  emailSent: z.boolean(),
  threadId: z.string(),
  opened: z.boolean(),
  clicked: z.boolean(),
  replied: z.boolean(),
  bounced: z.boolean().nullable(), // Added nullable field
})

export const getThreadApiResponseSchema = z.object({
  emails: z.array(emailThreadSchema),
  replies: z.array(replySchema),
})

export type EmailThread = z.infer<typeof emailThreadSchema>

export type ApiResponse = z.infer<typeof getThreadApiResponseSchema>
export const mailboxSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  userId: z.string(),
  warmupCapacity: z.number(),
  dailyCapacity: z.number(),
})

export const mailboxSchemaArray = z.array(mailboxSchema)

export const instantReplyResponseSchema = z.object({
  message: z.string(),
  emailId: z.string().uuid(),
  email: z.array(emailSchema),
})
