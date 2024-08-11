import { z } from "zod"

export const emailSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  body: z.string(),
  subject: z.string(),
  recipient: z.string(),
  sendAt: z.string(),
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

export const threadSchema = z.object({
  threadId: z.string(),
  thread: z.array(emailSchema),
  replies: z.array(emailSchema).nullable(),
})

export const threadsSchema = z.array(threadSchema)

export interface SchedularEmail {
  id: number
  subject: string
  body: string
  date: string
  scheduled: boolean
  recipient: string
}

export const emailSchemaSchedular = z.object({
  id: z.number(),
  subject: z.string(),
  body: z.string(),
  date: z.string(),
  scheduled: z.boolean(),
  recipient: z.string(),
})

export const schedularEmailSchema = z.array(emailSchemaSchedular)

export interface Email {
  id: string
  threadId: string
  // name: string
  body: string
  subject: string
  recipient: string
  sendAt: string
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
  seniority: string
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
  replies: [] | Email[] | any
  lead: Lead
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
  name: string
  uv: number
  pv: number
  amt: number
}
export interface SalesDataItem {
  name: string
  email: string
}

export const statDashboardSchema = z.object({
  title: z.string(),
  value: z.string(),
  icon: z.string(),
})

export const dataGraphSchema = z.object({
  name: z.string(),
  uv: z.number(),
  pv: z.number(),
  amt: z.number(),
})

export const salesDataItemSchema = z.object({
  name: z.string(),
  email: z.string(),
})

export const dashboardDataSchema = z.object({
  statsDashboard: z.array(statDashboardSchema),
  dataGraph: z.array(dataGraphSchema),
  recentSalesData: z.array(salesDataItemSchema),
})

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
