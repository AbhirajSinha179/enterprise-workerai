import { Layout } from "@/components/layout/layout"
import { MailProvider } from "@/contexts/MailContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <MailProvider>{children}</MailProvider>
    </Layout>
  )
}
