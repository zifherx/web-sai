import { BREADCRUMB_VEHICULO_PROPS } from "@/types"
import { Home } from "lucide-react"
import Link from "next/link"

export function BreadcrumbVehiculo({
  marca,
  marcaSlug,
  modelo,
}: BREADCRUMB_VEHICULO_PROPS) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-8">
      <ol className="flex items-center gap-1.5 font-textOffice-regular text-sm text-gray-custom-700">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-sky-custom-500"
          >
            <Home size={13} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-custom-500">
          /
        </li>
        <li>
          <Link
            href="/catalogo"
            className="transition-colors hover:text-sky-custom-500"
          >
            Catálogo
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-custom-500">
          /
        </li>
        <li>
          <Link
            href={`/catalogo?marca=${marcaSlug}`}
            className="capitalize transition-colors hover:text-sky-custom-500"
          >
            {marca}
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-custom-500">
          /
        </li>
        <li
          className="font-headOffice-medium text-blue-custom-300"
          aria-current="page"
        >
          {modelo}
        </li>
      </ol>
    </nav>
  )
}
