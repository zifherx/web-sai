import type { Marker as LeafletMarker } from "leaflet"
import { RefObject } from "react"
import { SedeType } from "@/types"

export type SEDE_BUSCADOR_PROPS = {
  ciudades: string[]
  locales: SedeType[]
  ciudadValue: string
  localValue: string
  onCiudadChange: (v: string) => void
  onLocalChange: (v: string) => void
  onSearch: (ciudad: string, local: string) => void
}

export type SEDE_UBICANOS_CARD_PROPS = {
  sede: SedeType
  marcasVentas?: string[]
}

export type SEDE_GRID_PROPS = {
  sedes: SedeType[]
  isLoading: boolean
}

export type UBICANOS_FILTER_PROPS = {
  value: string
  onChange: (v: string) => void
  totalResults: number
  isLoading: boolean
}

export type UBICANOS_SIDEBAR_PROPS = {
  sedes: SedeType[]
  isLoading: boolean
  selectedId: string | null
  onSelectSede: (sede: SedeType) => void
}

export type UBICANOS_MARKER_PROPS = {
  sede: SedeType
  markersRef: RefObject<Record<string, LeafletMarker>>
}

export type UBICANOS_MAP_PROPS = {
  sedes: SedeType[]
  mapCenter: [number, number]
  openPopupId: string | null
  markersRef: RefObject<Record<string, LeafletMarker>>
}
