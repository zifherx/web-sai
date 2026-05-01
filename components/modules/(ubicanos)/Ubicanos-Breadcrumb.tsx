import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

export function UbicanosBreadcrumb() {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <ol className="flex items-center gap-1.5 font-textOffice-regular text-sm text-gray-custom-700">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-sky-custom-500"
          >
            <Home size={13} aria-hidden="true" />
            <span>Inicio</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} className="text-gray-custom-500" />
        </li>
        <li className="text-sky-custom-500" aria-current="page">
          Red de atención
        </li>
      </ol>
    </nav>
  )
}
