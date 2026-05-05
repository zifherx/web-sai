"use client"

import { SearchSelect } from "@/components/shared/Search-Select"
import { Button } from "@/components/ui/button"
import { useActiveMarcas, useActiveSedes, useActiveVehiculos } from "@/hooks"
import { cn } from "@/lib"
import { IOptionSelect } from "@/types"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

interface SelectedItem {
  id: string
  slug: string
}

const EMPTY: SelectedItem = { id: "", slug: "" }

export function VehicleSearchBar() {
  const router = useRouter()

  // Estado de Filtros
  const [marcaSeleccionada, setMarcaSeleccionada] =
    useState<SelectedItem>(EMPTY)
  const [modeloSeleccionado, setModeloSeleccionado] =
    useState<SelectedItem>(EMPTY)
  const [ciudadSeleccionada, setCiudadSeleccionada] =
    useState<SelectedItem>(EMPTY)

  const { data: itemsMarca, isLoading: loadingMarca } = useActiveMarcas()
  const { data: itemsVehiculo, isLoading: loadingVehiculo } =
    useActiveVehiculos(
      marcaSeleccionada?.id ? { marcaId: marcaSeleccionada.id } : undefined
    )
  const { data: itemsSede, isLoading: loadingSede } = useActiveSedes()

  const brandOptions: IOptionSelect[] = useMemo(
    () =>
      (itemsMarca ?? []).map((m) => ({
        value: m.slug,
        label: m.name,
      })),
    [itemsMarca]
  )

  const modelOptions: IOptionSelect[] = useMemo(() => {
    if (!marcaSeleccionada.id || !itemsVehiculo) return []

    return itemsVehiculo.map((v) => ({
      value: v.slug,
      label: v.name,
    }))
  }, [marcaSeleccionada.id, itemsVehiculo])

  const cityOptions: IOptionSelect[] = useMemo(() => {
    if (!itemsSede) return []

    const seen = new Set<string>()

    return itemsSede
      .map((s) => s.ciudad.trim())
      .filter((ciudad) => {
        const llave = ciudad.toLowerCase()
        if (seen.has(llave)) return false
        seen.add(llave)
        return true
      })
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((ciudad) => ({
        value: ciudad.toLowerCase(),
        label: ciudad,
      }))
  }, [itemsSede])

  const handleBrandChange = (value: string) => {
    const marca = itemsMarca?.find((m) => m.slug === value)
    setMarcaSeleccionada(marca ? { id: marca.id, slug: marca.slug } : EMPTY)
    setModeloSeleccionado(EMPTY)
  }

  const handleModelChange = (slug: string) => {
    const modelo = itemsVehiculo?.find((v) => v.slug === slug)
    setModeloSeleccionado(modelo ? { id: modelo.id, slug: modelo.slug } : EMPTY)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (marcaSeleccionada) params.set("marca", marcaSeleccionada.slug)
    if (modeloSeleccionado) params.set("modelo", modeloSeleccionado.slug)
    if (ciudadSeleccionada) params.set("ciudad", ciudadSeleccionada.slug)

    const query = params.toString()
    router.push(query ? `/catalogo?${query}` : "/catalogo")
  }

  return (
    <div
      className={cn(
        "relative -bottom-5 z-20 w-full px-4",
        "mt-0",
        "sm:absolute sm:bottom-0 sm:left-1/2 sm:mt-0",
        "sm:-translate-x-1/2 sm:translate-y-1/2",
        "sm:max-w-7xl"
      )}
    >
      <div
        className={cn(
          "rounded-3xl bg-white px-6 py-6 shadow-2xl shadow-black/20",
          "border border-gray-custom-300/40",
          "sm:px-8 sm:py-8 sm:shadow-black/40"
        )}
      >
        <h2 className="mb-5 text-center font-headOffice-bold text-xl text-sky-custom-500 sm:mb-6 sm:text-2xl">
          Busca el auto de tus sueños
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Marca */}
          <SearchSelect
            id="search-brand"
            placeholder="Marca"
            value={marcaSeleccionada.slug}
            onChange={handleBrandChange}
            options={brandOptions}
            disabled={loadingMarca}
          />

          {/* Modelo - deshabilitado hasta que elijan marca */}
          <SearchSelect
            id="search-model"
            placeholder={
              !marcaSeleccionada
                ? "Primero elige una marca"
                : loadingVehiculo
                  ? "Cargando modelos..."
                  : modelOptions.length === 0
                    ? "Sin modelos disponibles"
                    : "Modelo"
            }
            value={modeloSeleccionado.slug}
            onChange={handleModelChange}
            options={modelOptions}
            disabled={!marcaSeleccionada.id || loadingVehiculo}
          />

          {/* Ciudad */}
          <SearchSelect
            id="search-city"
            placeholder={loadingSede ? "Cargando ciudades..." : "Tu ciudad"}
            value={ciudadSeleccionada.slug}
            onChange={(v) => setCiudadSeleccionada({ id: v, slug: v })}
            options={cityOptions}
            disabled={loadingSede}
          />

          <Button
            className={cn(
              "shrink-0 rounded-2xl px-6 py-7",
              "bg-sky-custom-500 font-headOffice-regular text-base tracking-widest text-white",
              "transition-all duration-200",
              "hover:bg-sky-custom-700 hover:shadow-lg hover:shadow-sky-custom-500/20",
              "active:scale-[0.98]",
              "focus-visible:outline focus-visible:outline-sky-custom-300",
              "w-full cursor-pointer uppercase md:w-auto"
            )}
            aria-label="Buscar vehículos"
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}
