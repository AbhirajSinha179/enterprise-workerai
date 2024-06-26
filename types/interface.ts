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
