import { VehiculoType } from "@/types"

export interface ISearchParamsCatalogo {
  marca?: string
  modelo?: string
  precioMin?: string
  precioMax?: string
}

export type CATALOGO_PAGE_PROPS = {
  searchParams: Promise<ISearchParamsCatalogo>
}

export type CATALOGO_VIEW_PROPS = {
  initialMarca?: string
  initialModelo?: string
  initialPrecioMin?: number
  initialPrecioMax?: number
}

export type SORT_OPTION_TYPE =
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc"
  | "nombre-desc"

export interface IPriceRange {
  min?: number
  max?: number
}

export interface IMarcaSearch {
  id: string
  name: string
  slug: string
}

export type CATALOGO_BUSCAR_PROPS = {
  marcas: IMarcaSearch[]
  modelos: VehiculoType[]
  marcaValue: string
  modeloValue: string
  precioValue: string
  loadingMarcas: boolean
  onMarcaChange: (v: string) => void
  onModeloChange: (v: string) => void
  onPrecioChange: (v: string) => void
  onBuscar: () => void
}

export type CATALOGO_VEHICULO_CARD_PROPS = {
  vehiculo: VehiculoType
  marcaNombre?: string
  marcaSlug?: string
}

export type CATALOGO_GRID_PROPS = {
  vehiculos: VehiculoType[]
  totalCount: number
  isLoading: boolean
  sort: SORT_OPTION_TYPE
  onSortChange: (value: SORT_OPTION_TYPE) => void
  hasMore: boolean
  onLoadMore: () => void
  marcaMap: Record<string, { name: string; slug: string }>
}
