"use client"

import { SOCIAL_BUTTON_PROPS } from "@/types"
import Link from "next/link"
import { ComponentType } from "react"
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa6"

const SOCIAL_ICON_MAP: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
}

export function SocialButton({ href, name }: SOCIAL_BUTTON_PROPS) {
  const Icon = SOCIAL_ICON_MAP[name.toLowerCase()]
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-custom-500 transition-all duration-200"
    >
      <Icon size={24} />
    </Link>
  )
}
