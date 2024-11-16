import { Layout } from "@/components/layout/layout"
import { MailProvider } from "@/contexts/MailContext"
import { DateRangeProvider } from "@/contexts/DateRangeContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <DateRangeProvider>
        <MailProvider>{children}</MailProvider>
      </DateRangeProvider>
    </Layout>
  )
}
