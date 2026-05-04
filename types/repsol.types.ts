export interface IRepsolHero {
  eyebrow: string
  heading: string
  imageSrc: string
  imageAlt: string
}

export interface IRepsolInfo {
  headingNeutral: string
  headingAccent: string
  description: string
}

export interface IRepsolVentaja {
  heading: string
  imageSrc: string
  imageAlt: string
  items: IVentaja[]
}

export interface IDescuento {
  tipo: string
  monto: string
}
export interface IVentaja {
  id: string
  label: string
}

export interface IRepsolCTA {
  cta: string
  ctaHref: string
  heading: string
}

export interface IVideo {
  id: string
  src: string
  title: string
}

export interface IRepsolVideo {
  headingNeutral: string
  headingAccent: string
  videoYoutube: IVideo
}

export type REPSOL_HERO_PROPS = {
  hero: IRepsolHero
}

export type REPSOL_INFO_PROPS = {
  info: IRepsolInfo
}

export type REPSOL_VENTAJAS_PROPS = {
  ventajas: IRepsolVentaja
}

export type REPSOL_CTA_PROPS = {
  callToAction: IRepsolCTA
}

export type REPSOL_VIDEO_PROPS = {
  video: IRepsolVideo
}
