import { GENERAL_ICON } from "@/types"

export interface IPilaresSAI {
  id: number
  title: string
  content: string
  imageSrc: string
}

export type PILARES_CARD_PROPS = {
  contenido: IPilaresSAI
}

export interface IValorSAI {
  id: string
  icon: GENERAL_ICON
  title: string
  description: string
  variant: "light" | "dark"
}

export type VALORES_CARD_PROPS = {
  valor: IValorSAI
}

export interface IValoresSection {
  headingNeutral: string
  headingAccent: string
  subtitle: string
  valores: IValorSAI[]
}

export interface ITextConducta {
  id: string
  text: string
}

export interface ICodigoConducta {
  headingNeutral: string
  headingAccent: string
  codigos: ITextConducta[]
}

export type CODIGO_CONDUCTA_CARD_PROPS = {
  codigo: ITextConducta
}
