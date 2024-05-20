import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ButtonLinkProps {
  href: string
  children: string
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref >
      <Button variant="link" size={"useLink"}>
        {children}
      </Button>
    </Link>
  )
}
