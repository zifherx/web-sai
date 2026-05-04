import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

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

export interface ICorporativoValueLabel {
  value: string
  label: string
}

export type CORPORATIVO_FORM_PROPS = {
  formulario: IFormCorporativo
}

export type GENERAL_ICON = LucideIcon | IconType

export interface IProximosPasosGracias {
  icon: GENERAL_ICON
  text: string
}
