// app/main/dashboard/layout.tsx
import { Layout } from "@/components/layout/layout";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { MailProvider } from "@/contexts/MailContext";
import { TargetProvider } from "@/contexts/TargetIdContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TargetProvider>
      <DateRangeProvider>
        <MailProvider>
          <Layout>
            {children}
          </Layout>
        </MailProvider>
      </DateRangeProvider>
    </TargetProvider>
  );
}
