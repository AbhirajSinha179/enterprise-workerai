import { Layout } from "@/components/layout/layout"
import { DateRangeProvider } from "@/contexts/DateRangeContext"
import { MailProvider } from "@/contexts/MailContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <DateRangeProvider>
        <MailProvider>{children}</MailProvider>
      </DateRangeProvider>
    </Layout>
  )
}
