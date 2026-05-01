import { Home } from "lucide-react"
import Link from "next/link"

export function BreadcrumbUbicanos() {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="mx-auto max-w-7xl px-4 py-4 md:px-8"
    >
      <ol className="flex items-center gap-1.5 font-textOffice-regular text-sm font-semibold tracking-wider text-gray-custom-700">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center gap-1 transition-colors hover:text-sky-custom-500"
          >
            <Home size={14} aria-hidden="true" />
            <span>Inicio</span>
          </Link>
        </li>

        <li aria-hidden="true" className="text-gray-custom-700">
          /
        </li>

        <li className="text-gray-custom-700">Nosotros</li>

        <li aria-hidden="true" className="text-gray-custom-700">
          /
        </li>

        <li className="text-sky-custom-500" aria-current="page">
          Nuestros Locales
        </li>
      </ol>
    </nav>
  )
}
