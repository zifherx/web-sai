import { LogoFooter } from "@/components/modules/(footer)/Logo-Footer"
import { MenuDesktop } from "@/components/modules/(navbar)/Menu-Desktop"
import { MenuMobile } from "@/components/modules/(navbar)/Menu-Mobile"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="w-full bg-[#f8f8f8]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 p-4">
        <LogoFooter
          brand={{
            href: "/",
            logoAlt: "Automotores Inka",
            logoSrc: "/assets/logos/logo-color.png",
          }}
        />

        <MenuDesktop />

        <div className="flex items-center gap-3">
          <Link
            href="/servicios/financiamiento"
            className="hidden rounded-lg bg-sky-custom-500 px-5 py-2 font-headOffice-bold text-sm text-white uppercase transition-colors hover:bg-sky-custom-700 sm:block"
          >
            Financia aquí
          </Link>

          <MenuMobile />
        </div>
      </div>
    </nav>
  )
}
