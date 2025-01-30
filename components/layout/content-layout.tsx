import { Navbar } from "@/components/navbar/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const isOverviewPage = title.toLowerCase() === "back to dashboard";

  return (
    <div>
      <Navbar title={title} isOverviewPage={isOverviewPage} />
      <div className={`container ${isOverviewPage ? "px-6 py-10 sm:px-12" : "px-4 py-8 sm:px-8"}`}>
        {children}
      </div>
    </div>
  );
}
