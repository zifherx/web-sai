"use client"

import { SearchSelect } from "@/components/shared/Search-Select"
import { Button } from "@/components/ui/button"
import { useActiveMarcas, useActiveVehiculos, useSedesByMarca } from "@/hooks"
import { cn, toastError } from "@/lib"
import { IOptionSelect } from "@/types"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

interface SelectedItem {
  id: string
  slug: string
  name: string
}

const EMPTY: SelectedItem = { id: "", slug: "", name: "" }

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
  const { data: sedesByMarca, isLoading: loadingSede } = useSedesByMarca(
    marcaSeleccionada.name
  )

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
    if (!marcaSeleccionada.id || !sedesByMarca) return []

    const seen = new Set<string>()

    return sedesByMarca
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
  }, [marcaSeleccionada.id, sedesByMarca])

  const handleBrandChange = (value: string) => {
    const marca = itemsMarca?.find((m) => m.slug === value)
    setMarcaSeleccionada(
      marca ? { id: marca.id, slug: marca.slug, name: marca.name } : EMPTY
    )
    setModeloSeleccionado(EMPTY)
    setCiudadSeleccionada(EMPTY)
  }

  const handleModelChange = (slug: string) => {
    const modelo = itemsVehiculo?.find((v) => v.slug === slug)
    setModeloSeleccionado(
      modelo ? { id: modelo.id, slug: modelo.slug, name: modelo.name } : EMPTY
    )
  }

  const handleCityChange = (value: string) => {
    const sedeEncontrada = sedesByMarca?.find(
      (s) => s.ciudad.toLowerCase() === value
    )
    setCiudadSeleccionada(
      sedeEncontrada
        ? { id: sedeEncontrada.id, slug: value, name: sedeEncontrada.ciudad }
        : { id: "", slug: value, name: value }
    )
  }

  const handleSearch = () => {
    const tieneMarca = !!marcaSeleccionada.id
    const tieneModelo = !!modeloSeleccionado.id
    const tieneCiudad = !!ciudadSeleccionada.slug

    if (tieneCiudad && !tieneMarca) {
      toastError.generic(`Selecciona primero una marca para ciltrar por ciudad`)
      return
    }

    // Escenario 4: Marca + Modelo + Ciudad => Wizard de financiamiento
    if (tieneMarca && tieneModelo && tieneCiudad) {
      const sedeSeleccionada = sedesByMarca?.find(
        (s) => s.ciudad.toLowerCase() === ciudadSeleccionada.slug
      )

      const params = new URLSearchParams({
        // Step 1 - Marca
        marcaId: marcaSeleccionada.id,
        marcaSlug: marcaSeleccionada.slug,
        marcaNombre: marcaSeleccionada.name,
        // Step 2 - Modelo
        vehiculoId: modeloSeleccionado.id,
        vehiculoSlug: modeloSeleccionado.slug,
        vehiculoNombre: modeloSeleccionado.name,
        // Step 3 - Sede
        ...(sedeSeleccionada && {
          sedeId: sedeSeleccionada.id,
          sedeNombre: sedeSeleccionada.name,
          sedeCiudad: sedeSeleccionada.ciudad,
        }),
      })

      router.push(`/comercial/financiamiento?${params.toString()}`)
      return
    }

    // Escenario 3: Marca + Modelo -> Ficha del vehículo
    if (tieneMarca && tieneModelo) {
      router.push(
        `/catalogo/${marcaSeleccionada.slug}/${modeloSeleccionado.slug}`
      )
      return
    }

    // Escenario 2: Solo marca -> Catálogo filtrado
    if (tieneMarca) {
      router.push(`/catalogo?marca=${marcaSeleccionada.slug}`)
      return
    }

    // Ninguna selección -> catálogo general
    router.push(`/catalogo`)
  }

  const modelPlaceholder = !marcaSeleccionada.id
    ? "Primero elige una marca"
    : loadingVehiculo
      ? "Cargando modelos..."
      : modelOptions.length === 0
        ? "Sin modelos disponibles"
        : "Modelo"

  const cityPlaceholder = !marcaSeleccionada.id
    ? "Elige una marca primero"
    : loadingSede
      ? "Cargando ciudades..."
      : cityOptions.length === 0
        ? "Sin ciudades disponibles"
        : "Tu ciudad"

  return (
    <div
      className={cn(
        "relative -bottom-5 z-20 w-full px-4",
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
          {/* 1. Marca */}
          <SearchSelect
            id="search-brand"
            placeholder="Marca"
            value={marcaSeleccionada.slug}
            onChange={handleBrandChange}
            options={brandOptions}
            disabled={loadingMarca}
          />

          {/* 2. Modelo - deshabilitado hasta que elijan marca */}
          <SearchSelect
            id="search-model"
            placeholder={modelPlaceholder}
            value={modeloSeleccionado.slug}
            onChange={handleModelChange}
            options={modelOptions}
            disabled={!marcaSeleccionada.id || loadingVehiculo}
          />

          {/* 3. Ciudad */}
          <SearchSelect
            id="search-city"
            placeholder={cityPlaceholder}
            value={ciudadSeleccionada.slug}
            onChange={handleCityChange}
            options={cityOptions}
            disabled={!marcaSeleccionada.id || loadingSede}
          />

          <Button
            className={cn(
              "shrink-0 rounded-2xl px-6 py-7",
              "bg-sky-custom-500 font-headOffice-regular text-base tracking-widest text-white",
              "transition-all duration-200",
              "hover:bg-sky-custom-700 hover:shadow-lg hover:shadow-sky-custom-500/20",
              "active:scale-110",
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
