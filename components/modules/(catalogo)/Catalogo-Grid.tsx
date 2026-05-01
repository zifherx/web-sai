import { SearchSelect } from "@/components/shared/Search-Select"
import { VehicleCatalogoCard } from "@/components/shared/Vehicle-Catalogo-Card"
import { Skeleton } from "@/components/ui/skeleton"
import { SORT_OPTIONS } from "@/constants/catalogo.constants"
import { cn } from "@/lib/utils"
import { CATALOGO_GRID_PROPS, SORT_OPTION_TYPE } from "@/types/catalogo.types"
import { ChevronRight, SlidersHorizontal } from "lucide-react"

export function CatalogoGrid({
  hasMore,
  isLoading,
  marcaMap,
  onLoadMore,
  onSortChange,
  sort,
  totalCount,
  vehiculos,
}: CATALOGO_GRID_PROPS) {
  return (
    <section className="w-full bg-[#ECF1F9] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Subtitulo */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="max-w-2xl text-center font-textOffice-regular text-base leading-relaxed text-gray-custom-700">
              Encuentra tu auto entre las más de 14 marcas que tenemos
              disponibles para ti. Podrás evaluar tu financiamiento y simular tu
              crédito online. Comienza el sueño de tu nuevo auto con nosotros.
            </p>
            {!isLoading && (
              <p className="mt-2 font-headOffice-medium text-sm text-sky-custom-500">
                {totalCount} {totalCount === 1 ? "resultado" : "resultados"}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <SlidersHorizontal
              size={16}
              className="text-gray-custom-700"
              aria-hidden="true"
            />

            <span className="font-textOffice-regular text-sm whitespace-nowrap text-gray-custom-700">
              Ordenar por:
            </span>

            <div className="w-52">
              <SearchSelect
                id="sort-select"
                placeholder="Ordenar"
                value={sort}
                onChange={(v) => onSortChange(v as SORT_OPTION_TYPE)}
                options={SORT_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-gray-custom-300/40 bg-white"
                >
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="flex flex-col gap-3 p-5">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <div className="mt-2">
                      <Skeleton className="mb-1 h-3 w-16" />
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="mt-1 h-3 w-40" />
                    </div>
                    <Skeleton className="mt-2 h-11 w-full rounded-xl" />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && vehiculos.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-headOffice-medium text-xl text-gray-custom-700">
              No encontramos vehículos con esos filtros
            </p>
            <p className="font-textOffice-regular text-sm text-gray-custom-500">
              Intenta con otra marca, modelo o rango de precio
            </p>
          </div>
        )}

        {/* Grid de cards */}
        {!isLoading && vehiculos.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {vehiculos.map((vehiculo) => (
                <VehicleCatalogoCard
                  key={vehiculo.id}
                  vehiculo={vehiculo}
                  marcaNombre={marcaMap[vehiculo.marcaId]?.name}
                  marcaSlug={marcaMap[vehiculo.marcaId]?.slug}
                />
              ))}
            </div>

            {/* Botón "Más resultados" */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={onLoadMore}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl",
                    "border-2 border-sky-custom-500 px-8 py-3.5",
                    "font-headOffice-bold text-sm tracking-widest text-sky-custom-500 uppercase",
                    "cursor-pointer transition-all duration-200",
                    "hover:bg-sky-custom-500 hover:text-white",
                    "focus-visible:outline focus-visible:outline-sky-custom-300"
                  )}
                >
                  Más Resultados
                  <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
