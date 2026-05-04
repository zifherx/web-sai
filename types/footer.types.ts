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

export interface SocialNetwork {
  name: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterSection {
  heading: string
  links: FooterLink[]
}

export interface IContentFooter {
  sections: FooterSection[]
  social: SocialNetwork[]
  complaints: IComplaint
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

export interface IFooter extends IContentFooter {
  brand: IBrand
  bottomBar: IBottomBar
}

export type SOCIAL_BUTTON_PROPS = {
  name: string
  href: string
}
