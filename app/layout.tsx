import "styles/tailwind.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { Navbar } from "@/components/navbar/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased scroll-smooth p-0 m-0 ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
