import Footer from "@/components/global/footer"
import { SiteNav } from "@/components/navbar/site-nav"
import { DarkModeWrapper } from "@/providers/force-dark-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeWrapper>
      <div>
        <SiteNav />
        {children}
        <Footer />
      </div>
    </DarkModeWrapper>
  )
}
