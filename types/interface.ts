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
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
  labels: string[]
}

export interface Thread {
  threadid: string
  thread: Email[]
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

export interface ThreadList {
  threadid: string
  thread: Email[]
}

export interface MailDisplayProps {
  threadData: ThreadList | null
}

export interface MailListProps {
  items: ThreadList[]
}

export interface Thread {
  threadid: string
  thread: Email[]
}

export interface ThreadList {
  threadid: string
  thread: Email[]
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
