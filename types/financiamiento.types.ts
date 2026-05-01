import { ReactNode } from "react"
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
} from "../constants/financiamiento.constant"
import { GENERAL_ICON } from "../interfaces"

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
