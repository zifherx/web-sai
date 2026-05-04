import {
  IColor,
  IFeature,
  IFeatures,
  IGaleriaItem,
  VehiculoType,
} from "./api.types"

export interface IMarcaModelo {
  marca: string
  modelo: string
}

export type MARCA_MODELO_PAGE_PROPS = {
  params: Promise<IMarcaModelo>
}

export type MARCA_MODELO_VIEW_PROPS = {
  marcaSlug: string
  modeloSlug: string
}

export type COLOR_PICKER_PROPS = {
  colores: IColor[]
  colorActivo: IColor | null
  onColorChange: (color: IColor) => void
}

export interface IMarcaOptional {
  id: string
  name: string
  slug: string
  idNovaly: number
}

export type VEHICULO_HERO_PROPS = {
  vehiculo: VehiculoType
  marca?: IMarcaOptional
  marcaSlug: string
  imagenActiva: string
  colorActivo: IColor | null
  colores: IColor[]
  onColorChange: (color: IColor) => void
}

export type BREADCRUMB_VEHICULO_PROPS = IMarcaModelo & {
  marcaSlug: string
}

export type VEHICULO_FEATURES_PROPS = {
  features: IFeatures
}

export type ITab = "feature1" | "feature2"

export type SPEC_ITEM_PROPS = {
  spec: IFeature
}

export type VEHICULO_GALERIA_PROPS = {
  galeria: IGaleriaItem[]
  fichaTecnica: string
  nombre: string
}

export type GALERIA_ITEM_PROPS = {
  img: IGaleriaItem
  nombre: string
  height: string
}

export type VEHICULO_CTA_PROPS = {
  marca?: IMarcaOptional
  marcaSlug: string
  vehiculo: VehiculoType
  imagenActiva: string
}
