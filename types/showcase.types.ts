export interface IShowcaseFeature {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export interface IVehicleShowcase {
  headingAccent: string
  headingMain: string
  ctaLabel: string
  ctaHref: string
  mainImage: {
    src: string
    alt: string
  }
  features: IShowcaseFeature[]
}

export type FEATURE_SHOWCASE_CARD_PROPS = {
  feature: IShowcaseFeature
}

export type VEHICLE_SHOWCASE_PROPS = {
  showcase: IVehicleShowcase
}

export interface IServiceShowcaseItem {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
}

export interface IServiceShowcase {
  headingNeutral: string
  headingAccent: string
  services: IServiceShowcaseItem[]
}

export type SERVICE_SHOWCASE_PROPS = {
  service: IServiceShowcase
}

export type SERVICE_SHOWCASE_CARD_PROPS = {
  service: IServiceShowcaseItem
  isActive: boolean
  onMouseEnter: () => void
}
