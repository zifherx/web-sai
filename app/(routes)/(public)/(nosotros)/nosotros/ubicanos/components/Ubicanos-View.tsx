"use client"

import { UbicanosBreadcrumb } from "@/components/modules/(ubicanos)/Ubicanos-Breadcrumb"
import { UbicanosFilter } from "@/components/modules/(ubicanos)/Ubicanos-Filter"
import { UbicanosSidebar } from "@/components/modules/(ubicanos)/Ubicanos-Sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { DEFAULT_UBICATION_CENTER } from "@/constants/ubicanos.constants"
import { useActiveSedes } from "@/hooks/queries/use-sede"
import { SedeType } from "@/types/api.types"
import type { Marker } from "leaflet"
import dynamic from "next/dynamic"
import { useCallback, useMemo, useRef, useState } from "react"

const UbicanosMap = dynamic(
  () =>
    import("@/components/modules/(ubicanos)/Ubicanos-Map").then(
      (m) => m.UbicanosMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="md:col-span-2">
        <Skeleton className="h-187.5 w-full rounded-2xl" />
      </div>
    ),
  }
)

export function UbicanosView() {
  const { data: sedes = [], isLoading } = useActiveSedes()
  const [search, setSearch] = useState("")
  // Sede seleccionada desde el sidebar → mueve el mapa y abre el popup
  const [sedeSeleccionada, setSedeSeleccionada] = useState<SedeType | null>(
    null
  )
  const [openPopupId, setOpenPopupId] = useState<string | null>(null)
  const markersRef = useRef<Record<string, Marker>>({})

  const filteredSedes = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return sedes
    return sedes.filter(
      (s) =>
        s.ciudad.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    )
  }, [sedes, search])

  // Centro del mapa — sigue a la sede seleccionada
  const mapCenter = useMemo((): [number, number] => {
    if (sedeSeleccionada?.coordenadasMapa) {
      return [
        parseFloat(sedeSeleccionada.coordenadasMapa.latitud),
        parseFloat(sedeSeleccionada.coordenadasMapa.longitud),
      ]
    }
    if (filteredSedes[0]?.coordenadasMapa) {
      return [
        parseFloat(filteredSedes[0].coordenadasMapa.latitud),
        parseFloat(filteredSedes[0].coordenadasMapa.longitud),
      ]
    }
    return DEFAULT_UBICATION_CENTER
  }, [sedeSeleccionada, filteredSedes])

  const handleSelectSede = useCallback((sede: SedeType) => {
    setSedeSeleccionada(sede)
    setOpenPopupId(sede.id)
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <UbicanosBreadcrumb />
      <UbicanosFilter
        value={search}
        onChange={(v) => {
          setSearch(v)
          setSedeSeleccionada(null)
          setOpenPopupId(null)
        }}
        totalResults={filteredSedes.length}
        isLoading={isLoading}
      />
      <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
        <UbicanosSidebar
          sedes={filteredSedes}
          isLoading={isLoading}
          selectedId={sedeSeleccionada?.id ?? null}
          onSelectSede={handleSelectSede}
        />
        <UbicanosMap
          sedes={filteredSedes}
          mapCenter={mapCenter}
          openPopupId={openPopupId}
          markersRef={markersRef}
        />
      </div>
    </div>
  )
}
