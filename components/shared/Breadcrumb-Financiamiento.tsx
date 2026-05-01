import { Home } from "lucide-react"
import Link from "next/link"

export function BreadcrumbFinanciamiento() {
  return (
    <nav aria-label="Ruta de navegación" className="mb-8">
      <ol className="flex items-center gap-1.5 font-textOffice-bold text-sm text-gray-custom-700">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center gap-1 transition-colors hover:text-sky-custom-500"
          >
            <Home size={13} aria-hidden="true" strokeWidth={2} />
            <span>Inicio</span>
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-custom-500">
          /
        </li>
        <li className="text-sky-custom-500" aria-current="page">
          Financia tu Auto
        </li>
      </ol>
    </nav>
  )
}
