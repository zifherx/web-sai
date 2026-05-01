import { cn } from "@/lib/utils"
import { UBICANOS_FILTER_PROPS } from "@/types/ubicanos.types"
import { Search } from "lucide-react"

export function UbicanosFilter({
  isLoading,
  onChange,
  totalResults,
  value,
}: UBICANOS_FILTER_PROPS) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {/* Input de búsqueda */}
      <div className="relative w-full max-w-sm">
        <Search
          size={16}
          className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-custom-500"
          aria-hidden="true"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Busca por ciudad, sede o dirección"
          aria-label="Buscar concesionarios por ciudad"
          className={cn(
            "w-full rounded-xl border border-gray-custom-300/60 bg-gray-custom-100",
            "py-2.5 pr-4 pl-9",
            "font-textOffice-regular text-sm text-gray-custom-900",
            "placeholder:text-gray-custom-500",
            "transition-all focus:ring-2 focus:ring-sky-custom-300 focus:outline-none"
          )}
        />
      </div>

      {/* Contador de resultados */}
      {!isLoading && (
        <p className="font-textOffice-regular text-sm text-gray-custom-700">
          {totalResults === 0
            ? "Sin resultados"
            : `${totalResults} ${totalResults === 1 ? "sede" : "sedes"} encontradas`}
        </p>
      )}
    </div>
  )
}
