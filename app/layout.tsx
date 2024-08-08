import localFont from "next/font/local"
import "styles/tailwind.css"
// import { Navbar } from "@/components/navbar/navbar"
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { GeistSans } from "geist/font/sans"

const myFont = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Extralight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/GeneralSans-ExtralightItalic.woff2", weight: "200", style: "italic" },
    { path: "../public/fonts/GeneralSans-Italic.woff2", weight: "400", style: "italic" },
    {
      path: "../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Semibold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
}) 
  

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="m-0 scroll-smooth p-0 antialiased relative overflow-x-hidden">
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
