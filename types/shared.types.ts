import { ICarouselCorporativoSlide } from "@/interfaces"

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
