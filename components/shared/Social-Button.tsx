import { SocialNetwork } from "@/interfaces"
import Link from "next/link"

export function SocialButton({ href, icon: Icon, name }: SocialNetwork) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-custom-500 transition-all duration-200"
    >
      <Icon size={24} strokeWidth={1} />
    </Link>
  )
}
