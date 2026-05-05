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
