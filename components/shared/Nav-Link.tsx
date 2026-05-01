import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"

type NAV_LINK_PROPS = {
  href: string
  children: ReactNode
}

export function NavLink({ children, href }: NAV_LINK_PROPS) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2",
        "font-headOffice-medium text-lg text-sky-custom-500 uppercase",
        "transition-colors duration-150 hover:text-sky-custom-700",
        "focus-visible:outline focus-visible:outline-sky-custom-300"
      )}
    >
      {children}
    </Link>
  )
}
