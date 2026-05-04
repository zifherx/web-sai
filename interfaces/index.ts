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
