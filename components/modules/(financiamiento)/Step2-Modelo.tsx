import { Skeleton } from "@/components/ui/skeleton"
import { useVehiculosByMarca } from "@/hooks/queries/use-vehiculo"
import { precioFormateadoUSD } from "@/lib/global.functions"
import { cn } from "@/lib/utils"
import { IModeloSelect, STEP2_MODELO_PROPS } from "@/types/financiamiento.types"
import { BadgeCheck, ChevronLeft, Fuel, Gauge } from "lucide-react"
import Image from "next/image"

export function Step2Modelo({
  initialData,
  marca,
  onBack,
  onNext,
}: STEP2_MODELO_PROPS) {
  const { data: vehiculos, isLoading } = useVehiculosByMarca(marca.marcaId)

  const handleSelect = (v: IModeloSelect) => {
    onNext({
      vehiculoId: v.id,
      vehiculoNombre: v.name,
      vehiculoSlug: v.slug,
      precioBase: v.precioBase,
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="rounded-2xl bg-gray-custom-100 px-2 py-4 md:px-5 md:py-8">
        <button
          onClick={onBack}
          className="mb-4 flex cursor-pointer items-center justify-center gap-1 font-textOffice-regular text-sm text-gray-custom-700 transition-colors hover:text-sky-custom-500"
        >
          <ChevronLeft size={14} /> Cambiar marca
        </button>

        <h2 className="font-headOffice-bold text-xl tracking-wide text-sky-custom-500 md:text-5xl md:tracking-wider">
          Modelos {marca.marcaNombre}
        </h2>
        <p className="mt-1 font-textOffice-regular text-lg leading-5 tracking-tight text-gray-custom-900 md:text-xl md:leading-6">
          Descubre los modelos disponibles y encuentra el perfecto para ti
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {isLoading &&
          Array(4)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}

        {!isLoading && vehiculos?.length === 0 && (
          <p className="py-10 text-center font-textOffice-regular text-sm text-gray-custom-500">
            No hay modelos disponibles para esta marca
          </p>
        )}

        {!isLoading &&
          vehiculos?.map((v) => {
            const isSelected = initialData?.vehiculoId === v.id
            return (
              <div
                key={v.id}
                className={cn(
                  "flex flex-col items-center gap-4 rounded-2xl border-2 p-4 md:flex-row",
                  "transition-all duration-200",
                  isSelected
                    ? "border-sky-custom-500 bg-sky-custom-50"
                    : "border-gray-custom-300/50 bg-white hover:border-sky-custom-300"
                )}
              >
                {/* Imagen */}
                <div className="relative h-40 w-full shrink-0 rounded-2xl bg-gray-custom-100 md:w-80">
                  <Image
                    src={v.imageUrl}
                    alt={v.name}
                    fill
                    sizes="120px"
                    className="object-contain object-center"
                    draggable={false}
                  />
                </div>

                <div className="flex items-center justify-between gap-6 md:gap-12">
                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col gap-1">
                        <p className="font-headOffice-bold text-lg text-blue-custom-500">
                          {v.name}
                        </p>
                        <p className="font-headOffice-light text-lg font-semibold text-blue-custom-500">
                          {marca.marcaNombre}
                        </p>
                      </div>
                    </div>
                    <p className="font-textOffice-regular text-sm text-gray-custom-700">
                      Precio base:
                      <br />
                      <span className="font-headOffice-medium text-lg text-gray-custom-900">
                        {precioFormateadoUSD(v.precioBase)}
                      </span>
                    </p>
                  </div>

                  {/* Botón */}
                  <div className="flex flex-col items-center gap-5 md:items-end md:gap-4">
                    {v.isNuevo && (
                      <span className="w-fit rounded-sm bg-red-custom-500 px-3 py-1 font-headOffice-bold text-[10px] text-white uppercase">
                        Nuevo
                      </span>
                    )}
                    {v.isGLP && (
                      <span className="w-fit rounded-sm bg-green-custom-500 px-3 py-1 font-headOffice-bold text-[10px] text-white uppercase">
                        GLP
                      </span>
                    )}
                    {v.isEntrega48H && (
                      <span className="w-fit rounded-sm bg-yellow-custom-500 px-3 py-1 font-headOffice-bold text-[10px] text-gray-custom-900 uppercase">
                        48H
                      </span>
                    )}
                    <div className="hidden items-center justify-between gap-3 md:flex">
                      <span className="flex items-center justify-center gap-2 text-xs">
                        <Fuel
                          size={20}
                          strokeWidth={2}
                          className="text-sky-custom-500"
                        />
                        {v.features.feature1[0].mainTitle}
                      </span>
                      <span className="flex items-center justify-center gap-2 text-xs">
                        <Gauge
                          size={20}
                          strokeWidth={2}
                          className="text-sky-custom-500"
                        />
                        {v.features.feature1[3].mainTitle}
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelect(v)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2.5 md:px-4",
                        "cursor-pointer font-headOffice-bold text-xs tracking-wider uppercase transition-all duration-200",
                        isSelected
                          ? "bg-sky-custom-500 text-white"
                          : "bg-sky-custom-500 text-white hover:bg-sky-custom-500 hover:text-white"
                      )}
                    >
                      {isSelected ? (
                        <>
                          <BadgeCheck size={20} strokeWidth={2} />
                          Seleccionado
                        </>
                      ) : (
                        <>Seleccionar</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
