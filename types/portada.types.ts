import { PortadaType } from "./api.types"

export type PortadaStatusFilter = "all" | "active" | "inactive"
export type PortadaViewMode = "table" | "cards"

export type PORTADA_FILTERS_PROPS = {
  search: string
  onSearchChange: (value: string) => void
  status: PortadaStatusFilter
  onStatusChange: (value: PortadaStatusFilter) => void
  view: PortadaViewMode
  onViewChange: (value: PortadaViewMode) => void
  onCreate: () => void
  total: number
}

export type PORTADA_STATUS_BADGE_PROPS = {
  isActive: boolean
}

export type PORTADA_ROW_ACTIONS_PROPS = {
  portada: PortadaType
  onEdit: (portada: PortadaType) => void
  onToggleActive: (portada: PortadaType) => void
  onDelete: (portada: PortadaType) => void
}

export type PORTADA_TABLE_PROPS = {
  portadas: PortadaType[]
  onEdit: (portada: PortadaType) => void
  onToggleActive: (portada: PortadaType) => void
  onDelete: (portada: PortadaType) => void
}

export type PORTADA_CARDS_PROPS = {
  portadas: PortadaType[]
  onEdit: (portada: PortadaType) => void
  onToggleActive: (portada: PortadaType) => void
  onDelete: (portada: PortadaType) => void
}

export type PORTADA_EMPTY_STATE_PROPS = {
  hasFilters: boolean
  onCreate: () => void
  onClearFilters: () => void
}

export type PORTADA_SKELETON_PROPS = {
  view: PortadaViewMode
}

export type PORTADA_FORM_DIALOG_PROPS = {
  open: boolean
  onOpenChange: (open: boolean) => void
  portada: PortadaType | null
}

export type PORTADA_DELETE_DIALOG_PROPS = {
  open: boolean
  onOpenChange: (open: boolean) => void
  portada: PortadaType | null
}
