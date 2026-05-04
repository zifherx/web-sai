import { Skeleton } from "@/components/ui/skeleton"
import { useActiveMarcas } from "@/hooks/queries/use-marca"
import { SEDE_GRID_PROPS } from "@/types/ubicanos.types"
import { MapPinOff } from "lucide-react"
import { useMemo } from "react"
import { SedeUbicanosCard } from "../../shared/Sede-Ubicanos-Card"

export function SedesGrid({ isLoading, sedes }: SEDE_GRID_PROPS) {
  const { data: marcas } = useActiveMarcas()
  const marcaMap = useMemo(
    () => Object.fromEntries((marcas ?? []).map((m) => [m.id, m.name])),
    [marcas]
  )
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border-2 border-gray-custom-300/50 bg-white"
                >
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="flex flex-col gap-4 p-6">
                    <Skeleton className="h-8 w-3/5" />
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-4/5" />
                      <Skeleton className="h-3 w-3/5" />
                    </div>
                    <div className="flex gap-2">
                      {Array(4)
                        .fill(null)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-6 w-16 rounded-full" />
                        ))}
                    </div>
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && sedes.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <MapPinOff
              size={48}
              className="text-gray-custom-500"
              strokeWidth={1.5}
            />
            <p className="font-headOffice-medium text-xl text-gray-custom-700">
              No encontramos locales con esos filtros
            </p>
            <p className="font-textOffice-regular text-sm text-gray-custom-500">
              Intenta con otra ciudad o limpia los filtros
            </p>
          </div>
        )}

        {/* Grid de cards */}
        {!isLoading && sedes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sedes.map((sede) => (
              <SedeUbicanosCard
                key={sede.id}
                sede={sede}
                marcasVentas={sede.marcasDisponiblesVentas
                  .map((m) => marcaMap[m.id] ?? "")
                  .filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
