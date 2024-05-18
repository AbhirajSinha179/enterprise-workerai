import localFont from "next/font/local"
import "styles/tailwind.css"
import Footer from "@/components/global/footer"
// import { Navbar } from "@/components/navbar/navbar"
import { ThemeProvider } from "@/providers/theme-provider"

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Regular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="m-0 scroll-smooth p-0 antialiased ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
