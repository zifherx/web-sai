import { FooterLink } from "@/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function FooterNavLink({ href, label, external }: FooterLink) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-2 text-white/70 transition-colors duration-200 hover:text-white"
      >
        <ChevronRight size={16} strokeWidth={2} />
        <span className="text-sm font-light tracking-wide">{label}</span>
      </Link>
    </li>
  )
}
