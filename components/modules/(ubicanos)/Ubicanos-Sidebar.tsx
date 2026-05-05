import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib"
import { UBICANOS_SIDEBAR_PROPS } from "@/types"
import { MapPin } from "lucide-react"
import Image from "next/image"

export function UbicanosSidebar({
  isLoading,
  onSelectSede,
  sedes,
  selectedId,
}: UBICANOS_SIDEBAR_PROPS) {
  return (
    <aside className="flex flex-col gap-2 md:col-span-1">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <MapPin size={16} className="text-sky-custom-500" />
        <h2 className="font-headOffice-medium text-base text-gray-custom-900">
          Concesionarios
        </h2>
      </div>

      {/* Lista con scroll */}
      <div className="h-90 overflow-y-auto rounded-2xl border border-gray-custom-300/40 md:h-187.5">
        <div className="flex flex-col gap-2 p-3">
          {/* Skeletons */}
          {isLoading &&
            Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border border-gray-custom-300/30 p-3"
                >
                  <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}

          {/* Empty state */}
          {!isLoading && sedes.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
              <MapPin
                size={32}
                className="text-gray-custom-400"
                strokeWidth={1.5}
              />
              <p className="font-textOffice-regular text-sm text-gray-custom-500">
                No encontramos sedes con esa búsqueda
              </p>
            </div>
          )}

          {/* Cards de sedes */}
          {!isLoading &&
            sedes.map((sede) => {
              const isSelected = selectedId === sede.id
              return (
                <button
                  key={sede.id}
                  onClick={() => onSelectSede(sede)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left",
                    "cursor-pointer transition-all duration-200",
                    "hover:border-sky-custom-300 hover:bg-sky-custom-50",
                    isSelected
                      ? "border-sky-custom-500 bg-sky-custom-50 shadow-sm"
                      : "border-gray-custom-300/40 bg-white"
                  )}
                >
                  {/* Imagen de sede */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={sede.imageUrl || "/images/sedes/placeholder.jpg"}
                      alt={sede.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "font-headOffice-medium text-sm leading-tight",
                        isSelected
                          ? "text-sky-custom-500"
                          : "text-gray-custom-900"
                      )}
                    >
                      {sede.name}
                    </p>
                    <span
                      className={cn(
                        "mt-1 inline-block rounded-full px-2 py-0.5",
                        "font-textOffice-regular text-xs",
                        "bg-sky-custom-100 text-sky-custom-500"
                      )}
                    >
                      {sede.ciudad}
                    </span>
                    <p className="mt-1 truncate font-textOffice-regular text-xs text-gray-custom-700">
                      {sede.address}
                    </p>
                  </div>
                </button>
              )
            })}
        </div>
      </div>
    </aside>
  )
}
