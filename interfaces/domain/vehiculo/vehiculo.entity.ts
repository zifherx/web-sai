export class VehiculoEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly codigoFlashdealer: string,
    public readonly imageUrl: string,
    public readonly precioBase: number,
    public readonly fichaTecnica: string,
    public readonly marcaId: string,
    public readonly carroceriaId: string,
    public readonly isEntrega48H: boolean,
    public readonly isGLP: boolean,
    public readonly isLiquidacion: boolean,
    public readonly isNuevo: boolean,
    public readonly colores: IColorVehicle[],
    public readonly features: IFeatures,
    public readonly galeria: IGalleryVehicle[],
    public readonly isActive: boolean,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPublishable(): boolean {
    return this.isActive && this.imageUrl.length > 0
  }

  hasAvailableColors(): boolean {
    return this.colores.some((a) => a.isActive)
  }

  hasGallery(): boolean {
    return this.galeria.length > 0
  }
}

export interface IColorVehicle {
  label: string
  hex: string
  carColor: string
  isActive: boolean
}

export interface IFeatureVehicle {
  superTitle: string
  mainTitle: string
  subTitle: string
}

export interface IFeatures {
  feature1: IFeatureVehicle[]
  feature2: IFeatureVehicle[]
}

export interface IGalleryVehicle {
  name: string
  imageUrl: string
}
