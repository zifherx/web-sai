"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useActiveSedes, useSedesByMarca } from "@/hooks"
import { cn } from "@/lib"
import { ISedeParam, STEP3_SEDE_PROPS } from "@/types"
import { ChevronLeft, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

export function Step3Sede({
  initialData,
  onBack,
  onNext,
  marcaNombre,
}: STEP3_SEDE_PROPS) {
  const [ciudadFiltro, setCiudadFiltro] = useState("")

  const { data: sedesByMarca, isLoading: loadingByMarca } = useSedesByMarca(
    marcaNombre ?? ""
  )
  const { data: todasSedes, isLoading: loadingTodas } = useActiveSedes()

  const hayFiltroMarca = !!marcaNombre?.trim()
  const sedes = hayFiltroMarca ? (sedesByMarca ?? []) : (todasSedes ?? [])
  const isLoading = hayFiltroMarca ? loadingByMarca : loadingTodas

  const ciudades = useMemo(() => {
    const seen = new Set<string>()
    return (sedes ?? [])
      .map((s) => s.ciudad.trim())
      .filter((c) => {
        const k = c.toLowerCase()
        if (seen.has(k)) return false
        seen.add(k)
        return true
      })
      .sort((a, b) => a.localeCompare(b, "es"))
  }, [sedes])

  const sedesFiltradas = useMemo(() => {
    if (!ciudadFiltro) return sedes
    return (sedes ?? []).filter(
      (s) => s.ciudad.toLowerCase() === ciudadFiltro.toLowerCase()
    )
  }, [sedes, ciudadFiltro])

  const handleSelect = (sede: ISedeParam) => {
    onNext({
      sedeId: sede.id,
      sedeNombre: sede.name,
      sedeCiudad: sede.ciudad,
      sedeIdTiendaNovaly: sede.idTiendaNovaly,
    })
  }
  return (
    <div className="p-4 md:p-8">
      <div className="rounded-2xl bg-gray-custom-100 px-2 py-4 md:px-5 md:py-8">
        <button
          onClick={onBack}
          className="mb-4 flex cursor-pointer items-center gap-1 font-textOffice-regular text-sm text-gray-custom-700 transition-colors hover:text-sky-custom-500"
        >
          <ChevronLeft size={14} /> Cambiar modelo
        </button>

        <h2 className="font-headOffice-bold text-xl tracking-wide text-sky-custom-500 md:text-4xl md:tracking-wider">
          Encuentra tu concesionario
        </h2>
        <p className="mt-1 font-textOffice-regular text-lg leading-5 tracking-tight text-gray-custom-900 md:text-xl md:leading-6">
          {hayFiltroMarca
            ? `Concesionarios ${marcaNombre} disponibles cerca de ti`
            : "Selecciona la ciudad y el concesionario más cercano a ti"}
        </p>
      </div>

      {/* Filtro de ciudad */}
      <div className="relative mt-6">
        <MapPin
          size={16}
          className="absolute top-1/2 left-3.5 -translate-y-1/2 text-sky-custom-500"
          aria-hidden="true"
        />
        <select
          value={ciudadFiltro}
          onChange={(e) => setCiudadFiltro(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-custom-300/60 bg-gray-custom-100 py-3.5 pr-4 pl-9 font-textOffice-regular text-sm text-gray-custom-900 focus:ring-2 focus:ring-sky-custom-300 focus:outline-none md:rounded-2xl"
        >
          <option value="">
            {isLoading ? "Cargando ciudades..." : "Elige tu ciudad"}
          </option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de sedes */}
      <div className="mt-4 flex flex-col gap-3">
        {isLoading &&
          Array(2)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}

        {!isLoading && sedesFiltradas.length === 0 && ciudadFiltro && (
          <p className="py-10 text-center font-textOffice-regular text-sm text-gray-custom-900">
            No hay concesarios disponibles en {ciudadFiltro}
            {hayFiltroMarca ? ` para ${marcaNombre}` : ""}
          </p>
        )}

        {!isLoading &&
          sedesFiltradas.length === 0 &&
          !ciudadFiltro &&
          hayFiltroMarca && (
            <p className="py-10 text-center font-textOffice-regular text-sm text-gray-custom-900">
              No hay concesionarios disponibles para {marcaNombre}
            </p>
          )}

        {!isLoading &&
          sedesFiltradas.map((sede) => {
            const isSelected = initialData?.sedeId === sede.id
            const scheduleLines = [
              `Lunes a Viernes de ${sede.scheduleRegular}`,
              `Sábado de ${sede.scheduleExtended}`,
            ].filter(Boolean)

            return (
              <div
                key={sede.id}
                className={cn(
                  "flex flex-col gap-5 overflow-hidden rounded-2xl border-2 md:flex-row",
                  "p-4 transition-all duration-200",
                  isSelected
                    ? "border-sky-custom-500"
                    : "border-gray-custom-300/50 hover:border-sky-custom-300"
                )}
              >
                {/* Imagen */}
                <div className="relative h-52 w-auto shrink-0 md:h-auto md:w-80">
                  <Image
                    src={sede.imageUrl}
                    alt={sede.name}
                    fill
                    sizes="160px"
                    className="rounded-2xl object-cover object-center"
                  />
                </div>

                {/* Info + CTA */}
                <div className="flex flex-1 flex-col gap-2 py-4 pr-4">
                  <p className="font-headOffice-bold text-xl text-gray-custom-900">
                    {sede.name}
                  </p>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-sky-custom-500" />
                      <span className="font-headOffice-medium text-sm text-sky-custom-500">
                        Ubicación
                      </span>
                    </div>
                    <p className="pl-5 font-textOffice-regular text-xs text-gray-custom-700">
                      {sede.address}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-sky-custom-500" />
                      <span className="font-headOffice-medium text-sm text-sky-custom-500">
                        Horario
                      </span>
                    </div>
                    <div className="pl-5">
                      {scheduleLines.map((l, i) => (
                        <p
                          key={i}
                          className="font-textOffice-regular text-xs text-gray-custom-700"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelect(sede)}
                    className={cn(
                      "mt-auto w-full cursor-pointer rounded-lg py-2.5",
                      "font-headOffice-bold text-sm tracking-wider uppercase transition-all duration-200",
                      isSelected
                        ? "bg-sky-custom-700 text-white"
                        : "bg-sky-custom-500 text-white hover:bg-sky-custom-700"
                    )}
                  >
                    {isSelected ? "✓ Seleccionado" : "Selecciona la Tienda"}
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
