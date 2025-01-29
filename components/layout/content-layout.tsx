import { Navbar } from "@/components/navbar/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} showBackButton={title.toLowerCase() === "overview"} />
      {title.toLowerCase() === "overview" ? (
        <div className="container px-6 py-10 sm:px-12 ">
          {children}
        </div>
      ) : (
        <div className="container px-4 py-8 sm:px-8">{children}</div>
      )}
    </div>
  );
}
