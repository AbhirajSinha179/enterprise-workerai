import Footer from "@/components/global/footer";
import { SiteNav } from "@/components/navbar/site-nav";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      {children}
      <Footer />
    </>
  );
}