// app/main/dashboard/layout.tsx
import { Layout } from "@/components/layout/layout";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { MailProvider } from "@/contexts/MailContext";
import { TargetProvider } from "@/contexts/TargetIdContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TargetProvider>
      <Layout>
        <DateRangeProvider>
          <MailProvider>
            {children}
          </MailProvider>
        </DateRangeProvider>
      </Layout>
    </TargetProvider>
  );
}
