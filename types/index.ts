import {
  IBottomBar,
  IBrand,
  ICarouselCorporativoSlide,
  IContentFooter,
} from "../interfaces"

export type CircleProgressProps = {
  value: number
  className?: string
}

export type FOOTER_PROPS = IContentFooter & {
  brand: IBrand
  bottomBar: IBottomBar
}

export type LOGO_FOOTER_PROPS = {
  brand: IBrand
}

export type CONTENT_FOOTER_PROPS = {
  content: IContentFooter
}

export type BOTTOM_BAR_PROPS = {
  bottom: IBottomBar
}

export type SLIDE_CARD_PROPS = {
  slide: ICarouselCorporativoSlide
  isActive?: boolean
}
