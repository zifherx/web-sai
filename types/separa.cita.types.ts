import { GENERAL_ICON } from "@/types"

export interface ITipoDocumentoPersona {
  label: string
  value: string
}

export interface ITipoServicioTaller {
  label: string
  value: string
}

export type SEPARA_CITA_PAGE_PROPS = {
  searchParams: Promise<{ ciudad?: string }>
}

export type SEPARA_CITA_VIEW_PROPS = {
  initialCiudad?: string
}

export type SEPARA_CITA_FORM_PROPS = {
  initialCiudad?: string
}

export interface IProximosPasosCita {
  text: string
  icon: GENERAL_ICON
}
