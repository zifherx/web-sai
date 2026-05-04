import { Step1Data, Step2Data, Step3Data, Step4Data } from "@/constants"
import { GENERAL_ICON } from "@/types"
import { ReactNode } from "react"

export interface IWizardStepForm {
  number: number
  label: string
  sublabel: string
}

export interface ILabelValue {
  label: string
  value: string
}

export interface IBooleanLabel {
  value: boolean
  label: string
}

export type WIZARD_SIDEBAR_PROPS = {
  currentStep: number
  stepsCompleted: Record<number, boolean>
  onStepClick: (step: number) => void
}

export type STEP1_MARCA_PROPS = {
  onNext: (data: Step1Data) => void
  initialData: Step1Data | null
}

export interface IMarcaSelect {
  id: string
  name: string
  slug: string
  idNovaly: number
}

export type STEP2_MODELO_PROPS = {
  marca: Step1Data
  onNext: (data: Step2Data) => void
  onBack: () => void
  initialData: Step2Data | null
}

export interface IModeloSelect {
  id: string
  name: string
  slug: string
  precioBase: number
}

export type STEP3_SEDE_PROPS = {
  onNext: (data: Step3Data) => void
  onBack: () => void
  initialData: Step3Data | null
}

export interface ISedeParam {
  id: string
  name: string
  ciudad: string
  idTiendaNovaly: number
}

export interface IResumenContacto {
  marcaNombre: string
  vehiculoNombre: string
  sedeNombre: string
}

export type STEP4_CONTACTO_PROPS = {
  resumen: IResumenContacto
  onSubmit: (data: Step4Data) => void
  onBack: () => void
  isLoading: boolean
}

export type FORM_FIELD_CONTACTO = {
  label: string
  required?: boolean
  error?: string
  icon?: GENERAL_ICON
  children: ReactNode
}

export type CHECKBOX_FIELD_PROPS = {
  label: ReactNode
  error?: string
  [key: string]: unknown
}

export interface IParamsCotizacionVehicular {
  marcaId?: string
  marcaSlug?: string
  marcaNombre?: string
  marcaIdNovaly?: string
  vehiculoId?: string
  vehiculoSlug?: string
  vehiculoNombre?: string
  precioBase?: string
}

export type FINANCIA_TU_AUTO_PAGE_PROPS = {
  searchParams: Promise<IParamsCotizacionVehicular>
}

export type FINANCIAMIENTO_VIEW_PROPS = {
  initialMarcaId?: string
  initialMarcaSlug?: string
  initialMarcaNombre?: string
  initialMarcaIdNovaly?: number
  initialVehiculoId?: string
  initialVehiculoSlug?: string
  initialVehiculoNombre?: string
  initialPrecioBase?: number
}

export interface IGraciasFinanciamientoParams {
  id?: string
}

export type FINANCIAMIENTO_GRACIAS_PAGE_PROPS = {
  searchParams: Promise<IGraciasFinanciamientoParams>
}

export type FINANCIAMIENTO_GRACIAS_VIEW_PROPS = {
  cotizacionId?: string
}

export interface PROXIMOS_PASOS_GRACIAS_FINANCIAMIENTO {
  icon: GENERAL_ICON
  text: string
}
