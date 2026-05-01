import { GENERAL_ICON } from "@/interfaces"

export interface IBeneficioCorporativo {
  id: string
  icon: GENERAL_ICON
  title: string
  description: string
  variant: "light" | "dark"
}

export interface IHeroCorporativo {
  eyebrow: string
  heading: string
  imageSrc: string
  imageAlt: string
}

export interface IIntroCorporativo {
  text: string
}

export interface IFormCorporativo {
  heading: string
  legal: string
}

export type CORPORATIVO_HERO_PROPS = {
  hero: IHeroCorporativo
}

export type CORPORATIVO_INTRO_PROPS = {
  intro: IIntroCorporativo
}

export type CORPORATIVO_BENEFICIOS_PROPS = {
  beneficios: IBeneficioCorporativo[]
}

export interface ICorporativoValueLabel {
  value: string
  label: string
}

export type CORPORATIVO_FORM_PROPS = {
  formulario: IFormCorporativo
}
