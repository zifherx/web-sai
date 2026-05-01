import { FooterSection } from "@/interfaces"
import { FooterNavLink } from "./Footer-NavLink"

export function FooterNavSection({ heading, links }: FooterSection) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-headOffice-medium text-lg tracking-wide text-white">
        {heading}
      </h3>
      <ul className="ml-2 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
        {links.map((link) => (
          <FooterNavLink key={link.href} {...link} />
        ))}
      </ul>
    </div>
  )
}
