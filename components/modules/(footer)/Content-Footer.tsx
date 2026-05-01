import { FooterNavSection } from "@/components/shared/Footer-NavSection"
import { SocialButton } from "@/components/shared/Social-Button"
import { CONTENT_FOOTER_PROPS } from "@/types"
import Image from "next/image"
import Link from "next/link"

export function ContentFooter({ content }: CONTENT_FOOTER_PROPS) {
  const { complaints, sections, social } = content

  return (
    <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1fr_1fr_auto] md:gap-12 md:pb-10">
      {sections.map((section) => (
        <FooterNavSection key={section.heading} {...section} />
      ))}

      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          {social.map((so) => (
            <SocialButton key={so.name} {...so} />
          ))}
        </div>

        <Link
          href={complaints.href}
          className="flex items-center gap-4 text-white transition-opacity duration-200 hover:opacity-80"
          aria-label="Libro de reclamaciones"
        >
          <Image
            src="/images/libro-reclamaciones2.png"
            alt="Libro de reclamaciones"
            width={80}
            height={30}
            className="object-contain"
          />
          <span className="font-headOffice-regular text-sm leading-tight tracking-widest whitespace-pre-line uppercase">
            {complaints.label}
          </span>
        </Link>
      </div>
    </div>
  )
}
