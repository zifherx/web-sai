"use client"

import { MapaHero } from "@/components/modules/(talleres)/Mapa-Hero"
import {
  ALL_CITIES,
  SedesBuscador,
} from "@/components/modules/(talleres)/Sedes-Buscador"
import { SedesGrid } from "@/components/modules/(talleres)/Sedes-Grid"
import { useActiveSedes } from "@/hooks/queries/use-sede"
import { useMemo, useState } from "react"

export function TalleresView() {
  const { data: sedes = [], isLoading } = useActiveSedes()

  const [ciudadFiltro, setCiudadFiltro] = useState("")
  const [localFiltro, setLocalFiltro] = useState("")

  const ciudades = useMemo(() => {
    const seen = new Set<string>()

    return sedes
      .map((s) => s.ciudad.trim())
      .filter((c) => {
        const key = c.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .sort((a, b) => a.localeCompare(b, "es"))
  }, [sedes])

  const localesDeCiudad = useMemo(() => {
    if (!ciudadFiltro || ciudadFiltro === ALL_CITIES) return sedes
    return sedes.filter(
      (s) => s.ciudad.toLowerCase() === ciudadFiltro.toLowerCase()
    )
  }, [sedes, ciudadFiltro])

  const sedesFiltradas = useMemo(() => {
    if (!ciudadFiltro || ciudadFiltro === ALL_CITIES) return sedes

    let resultado = sedes.filter(
      (s) => s.ciudad.toLowerCase() === ciudadFiltro.toLowerCase()
    )

    if (localFiltro) {
      resultado = resultado.filter((s) => s.id === localFiltro)
    }
    return resultado
  }, [sedes, ciudadFiltro, localFiltro])

  const handleCiudadChange = (ciudad: string) => {
    setCiudadFiltro(ciudad)
    setLocalFiltro("")
  }

  const handleSearch = (ciudad: string, local: string) => {
    setCiudadFiltro(ciudad)
    setLocalFiltro(local)
  }

  return (
    <div>
      <div className="relative">
        <MapaHero />
        <SedesBuscador
          ciudades={ciudades}
          locales={localesDeCiudad}
          ciudadValue={ciudadFiltro}
          localValue={localFiltro}
          onCiudadChange={handleCiudadChange}
          onLocalChange={setLocalFiltro}
          onSearch={handleSearch}
        />
      </div>
      <div className="pt-32 md:pt-36">
        <SedesGrid sedes={sedesFiltradas} isLoading={isLoading} />
      </div>
    </div>
  )
}
