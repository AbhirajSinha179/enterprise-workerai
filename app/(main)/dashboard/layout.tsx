import { Layout } from "@/components/layout/layout"
import { DateRangeProvider } from "@/contexts/DateRangeContext"
import { MailProvider } from "@/contexts/MailContext"
import { TargetIdProvider } from "@/contexts/TargetIdContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <DateRangeProvider>
        <TargetIdProvider>

          <MailProvider>{children}</MailProvider>
        </TargetIdProvider>
      </DateRangeProvider>
    </Layout>
  )
}
