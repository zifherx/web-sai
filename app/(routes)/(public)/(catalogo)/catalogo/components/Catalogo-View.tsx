"use client"

import { CatalogoBuscador } from "@/components/modules/(catalogo)/Catalogo-Buscador"
import { CatalogoGrid } from "@/components/modules/(catalogo)/Catalogo-Grid"
import { CatalogoHero } from "@/components/modules/(catalogo)/Catalogo-Hero"
import {
  ALL_BRANDS,
  DEFAULT_SORT_CATALOGO,
  INITIAL_PAGE_SIZE,
  LOAD_MORE_SIZE,
} from "@/constants"
import { useActiveMarcas, useActiveVehiculos } from "@/hooks"
import { parsePriceRange } from "@/lib"
import { CATALOGO_VIEW_PROPS, SORT_OPTION_TYPE, VehiculoType } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

export function CatalogoView({
  initialMarca = "",
  initialModelo = "",
}: CATALOGO_VIEW_PROPS) {
  const router = useRouter()
  const pathname = usePathname()

  // ── Filtros activos (los que afectan la URL y el grid) ────
  const [marcaFiltro, setMarcaFiltro] = useState(initialMarca)
  const [modeloFiltro, setModeloFiltro] = useState(initialModelo)
  const [rangoPrecio, setRangoPrecio] = useState("todos")

  // ── Estado local del buscador (sin aplicar aún) ───────────
  const [marcaBorrador, setMarcaBorrador] = useState(initialMarca)
  const [modeloBorrador, setModeloBorrador] = useState(initialModelo)
  const [precioBorrador, setPrecioBorrador] = useState("todos")

  // ── Ordenamiento y paginación ─────────────────────────────
  const [ordenar, setOrdenar] = useState<SORT_OPTION_TYPE>(
    DEFAULT_SORT_CATALOGO
  )
  const [contadorVisible, setContadorVisible] = useState(INITIAL_PAGE_SIZE)

  const { data: marcas, isLoading: loadingMarcas } = useActiveMarcas()
  const { data: allVehiculos, isLoading: loadingVehiculos } =
    useActiveVehiculos()

  const marcaMap = useMemo(
    () => Object.fromEntries((marcas ?? []).map((m) => [m.id, m])),
    [marcas]
  )

  const modelosDraft = useMemo(() => {
    if (!marcaBorrador) return []
    const marca = marcas?.find((m) => m.slug === marcaBorrador)
    if (!marca) return []
    return (allVehiculos ?? []).filter((v) => v.marcaId === marca.id)
  }, [allVehiculos, marcas, marcaBorrador])

  const handleBuscar = useCallback(() => {
    setMarcaFiltro(marcaBorrador)
    setModeloFiltro(modeloBorrador)
    setRangoPrecio(precioBorrador)
    setContadorVisible(INITIAL_PAGE_SIZE)

    const params = new URLSearchParams()
    if (marcaBorrador && marcaBorrador !== ALL_BRANDS)
      params.set("marca", marcaBorrador)
    if (modeloBorrador) params.set("modelo", modeloBorrador)
    if (precioBorrador && precioBorrador !== "todos") {
      const { min, max } = parsePriceRange(precioBorrador)
      if (min) params.set("precioMin", String(min))
      if (max) params.set("precioMax", String(max))
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [marcaBorrador, modeloBorrador, precioBorrador, pathname, router])

  const vehiculosFiltrados = useMemo((): VehiculoType[] => {
    let resultado = allVehiculos ?? []

    if (marcaFiltro && marcaFiltro !== ALL_BRANDS) {
      const marca = marcas?.find((m) => m.slug === marcaFiltro)
      if (marca) resultado = resultado.filter((v) => v.marcaId === marca.id)
    }

    if (modeloFiltro) {
      resultado = resultado.filter((v) => v.slug === modeloFiltro)
    }

    if (rangoPrecio && rangoPrecio !== "todos") {
      const { min, max } = parsePriceRange(rangoPrecio)
      if (min !== undefined)
        resultado = resultado.filter((v) => v.precioBase >= min)
      if (max !== undefined)
        resultado = resultado.filter((v) => v.precioBase >= max)
    }

    return [...resultado].sort((a, b) => {
      switch (ordenar) {
        case "precio-asc":
          return a.precioBase - b.precioBase
        case "precio-desc":
          return b.precioBase - a.precioBase
        case "nombre-asc":
          return a.name.localeCompare(b.name, "es")
        case "nombre-desc":
          return b.name.localeCompare(a.name, "es")
        default:
          return 0
      }
    })
  }, [allVehiculos, marcas, marcaFiltro, modeloFiltro, rangoPrecio, ordenar])

  const visibleVehiculos = vehiculosFiltrados.slice(0, contadorVisible)
  const hasMore = contadorVisible < vehiculosFiltrados.length

  return (
    <div>
      <div className="relative">
        <CatalogoHero />
        <CatalogoBuscador
          marcas={marcas ?? []}
          modelos={modelosDraft}
          marcaValue={marcaBorrador}
          modeloValue={modeloBorrador}
          precioValue={precioBorrador}
          loadingMarcas={loadingMarcas}
          onMarcaChange={(v) => {
            setMarcaBorrador(v)
            setModeloBorrador("")
          }}
          onModeloChange={setModeloBorrador}
          onPrecioChange={setPrecioBorrador}
          onBuscar={handleBuscar}
        />
      </div>

      <div className="pt-40">
        <CatalogoGrid
          vehiculos={visibleVehiculos}
          totalCount={vehiculosFiltrados.length}
          isLoading={loadingVehiculos}
          sort={ordenar}
          onSortChange={(s) => {
            setOrdenar(s)
            setContadorVisible(INITIAL_PAGE_SIZE)
          }}
          hasMore={hasMore}
          onLoadMore={() => setContadorVisible((prev) => prev + LOAD_MORE_SIZE)}
          marcaMap={marcaMap}
        />
      </div>
    </div>
  )
}
