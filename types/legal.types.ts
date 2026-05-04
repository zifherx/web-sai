export interface ILegalParrafo {
  id: string
  text: string
}

export interface ILegalSection {
  id: string
  title?: string // opcional: algunas secciones no tienen subtítulo
  parrafos: ILegalParrafo[]
  indentLevel?: 0 | 1 | 2
}

export interface ILegalSubsection {
  id: string
  heading: string
  sections: ILegalSection[]
}

export interface ILegalPage {
  heading: string
  sections: ILegalSection[]
  subsections?: ILegalSubsection[]
}

export type LEGAL_ARTICLE_PROPS = {
  page: ILegalPage
}

export type LEGAL_SECTION_PROPS = {
  section: ILegalSection
}

export type LEGAL_PARRAFO_PROPS = {
  parrafo: ILegalParrafo
}
