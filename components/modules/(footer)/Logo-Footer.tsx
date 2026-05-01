import { LOGO_FOOTER_PROPS } from "@/types"
import Image from "next/image"
import Link from "next/link"

export function LogoFooter({ brand }: LOGO_FOOTER_PROPS) {
  const { href, logoAlt, logoSrc } = brand

  return (
    <div className="flex items-center justify-start">
      <Link href={href} aria-label={logoAlt}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={300}
          height={80}
          className="object-contain"
          priority
        />
      </Link>
    </div>
  )
}
