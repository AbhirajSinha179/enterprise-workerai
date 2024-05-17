import "styles/tailwind.css"
import Footer from "@/components/global/footer"
// import { Navbar } from "@/components/navbar/navbar"
import { ThemeProvider } from "@/providers/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 scroll-smooth p-0 antialiased ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
