import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterSection {
  heading: string
  links: FooterLink[]
}

export type GENERAL_ICON = LucideIcon | IconType

export interface IBrand {
  logoSrc: string
  logoAlt: string
  href: string
}

export interface IComplaint {
  label: string
  href: string
  icon: string
}

export interface IContentFooter {
  sections: FooterSection[]
  social: SocialNetwork[]
  complaints: IComplaint
}

export interface SocialNetwork {
  name: string
  href: string
  icon: GENERAL_ICON
}

export interface IDesignedBy {
  label: string
  author: string
  href: string
}

export interface IBottomBar {
  copyright: string
  designedBy: IDesignedBy
}

export interface FooterConstants extends IContentFooter {
  brand: IBrand
  bottomBar: IBottomBar
}

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
