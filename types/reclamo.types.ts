import { ReclamoData } from "@/constants"
import { ReclamoResponseType, SedeType } from "@/types"
import type { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"

export interface ITipoBien {
  label: string
  value: string
}

export interface ITipoDocumentoReclamoOption {
  value: string
  label: string
}

export interface IMonedaOption {
  value: string
  label: string
}

export interface ICharLimit {
  descripcionBien: number
  detalleSolicitud: number
  pedidoSolicitud: number
}

export type RECLAMO_CHAR_COUNTER_PROPS = {
  current: number
  max: number
  label?: string
}

export type RECLAMO_SECTION_CARD_PROPS = {
  numero: number
  title: string
  icon: ReactNode
  children: ReactNode
}

export type RECLAMO_CONSUMER_PROPS = {
  form: UseFormReturn<ReclamoData>
}

export type RECLAMO_PRODUCTO_PROPS = {
  form: UseFormReturn<ReclamoData>
  sedeSeleccionada: SedeType | null
  onSedeChange: (sede: SedeType | null) => void
}

export type RECLAMO_DETALLE_PROPS = {
  form: UseFormReturn<ReclamoData>
  isLoading: boolean
}

export interface IProvincia {
  id: number
  name: string
  value: string
}

export interface IDepartamento {
  id: number
  name: string
  value: string
  provincias: IProvincia[]
}

export interface IReclamoTipoSolicitud {
  label: string
  value: string
  desc: string
}

export interface ICreateReclamoOption {
  onSuccess: (data: ReclamoResponseType) => void
  onError?: (err: Error) => void
}

export interface IGraciasReclamo {
  nro?: string
}

export type GRACIAS_PAGE_RECLAMO_PROPS = {
  searchParams: Promise<IGraciasReclamo>
}

export type GRACIAS_VIEW_RECLAMO_PROPS = {
  numeroReclamo: string
}

export interface ISendEmailPayload {
  numeroReclamo: string
  numeroDocumento: string
  nombres: string
  email?: string
  pdfBase64: string
}
