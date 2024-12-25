import { Layout } from "@/components/layout/layout"
import { DateRangeProvider } from "@/contexts/DateRangeContext"
import { MailProvider } from "@/contexts/MailContext"
// import { TargetIdProvider } from "@/contexts/TargetIdContext"
// import { TargetProvider } from "@/contexts/TargetIdContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <DateRangeProvider>
        {/* <TargetIdProvider> */}
        {/* <TargetProvider> */}

        <MailProvider>{children}</MailProvider>
        {/* </TargetProvider> */}

        {/* </TargetIdProvider> */}
      </DateRangeProvider>
    </Layout>
  )
}
