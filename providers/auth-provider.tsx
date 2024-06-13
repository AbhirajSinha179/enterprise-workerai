import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes";

interface PropsWithChildren {
  children: React.ReactNode
}

function AuthProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default AuthProvider;
