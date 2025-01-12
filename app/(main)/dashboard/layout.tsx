import { ReactNode } from "react";
import { Layout } from "@/components/layout/layout";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { MailProvider } from "@/contexts/MailContext";
import { TargetProvider } from "@/contexts/TargetIdContext";
import { checkHealth } from "@/lib/serverHealthCheck";
import MaintenancePage from "@/components/maintenance/MaintenancePage";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isHealthy = await checkHealth();

  if (!isHealthy) {
    return <MaintenancePage />;
  }

  return (
    <TargetProvider>
      <DateRangeProvider>
        <MailProvider>
          <Layout>{children}</Layout>
        </MailProvider>
      </DateRangeProvider>
    </TargetProvider>
  );
}
