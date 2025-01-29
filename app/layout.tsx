
import "styles/tailwind.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { GeistSans } from "geist/font/sans";
import { DateRangeProvider } from "@/contexts/DateRangeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="m-0 scroll-smooth p-0 antialiased relative overflow-x-hidden">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <DateRangeProvider>
              {children}
              <Toaster />
            </DateRangeProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
