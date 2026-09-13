import { PortadaType } from "@/types/api.types"

export interface ICarouselCorporativoSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
}

export interface ICarouselCorporativo {
  autoplayInterval: number
  slides: ICarouselCorporativoSlide[]
}

export type CIRCLE_PROGRESS_PROPS = {
  value: number
  className?: string
}

export type SLIDE_CARD_PROPS = {
  slide: ICarouselCorporativoSlide
  isActive?: boolean
}

export type YOUTUBE_VIDEO_FRAME_PROPS = {
  title: string
  videoSource: string
}

export type JSONLD_PROPS = {
  data: Record<string, unknown>
}

interface GaleriaSeoItem {
  imageUrl: string
  name?: string
}

export interface HorarioIndividual {
  opens: string
  closes: string
}

export interface VehiculoSeoSchema {
  name: string
  slug: string
  imageUrl: string
  precioBase: number
  isNuevo: boolean
  isGLP: boolean
  galeria?: GaleriaSeoItem[]
}

export interface SedeSeoSchema {
  id: string
  name: string
  address: string
  ciudad: string
  imageUrl: string
  coordenadasMapa?: { latitud: string; longitud: string }
  horarioVentas: { scheduleRegular: string; scheduleExtended: string }
  linkHowArrived?: string
}

export interface SedeTallerSeoSchema {
  id: string
  name: string
  address: string
  ciudad: string
  imageUrl: string
  coordenadasMapa?: { latitud: string; longitud: string }
  horarioTaller: { scheduleRegular: string; scheduleExtended: string }
}

export type HOME_VIEW_PROPS = {
  initialPortadas: PortadaType[]
}
