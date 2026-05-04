import { IMarcaRef } from "@/types"

export interface CoordenadasVO {
  latitud: string
  longitud: string
}

export class SedeEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly idTiendaNovaly: number,
    public readonly codexHR: string,
    public readonly imageUrl: string,
    public readonly ciudad: string,
    public readonly address: string,
    public readonly scheduleRegular: string,
    public readonly scheduleExtended: string,
    public readonly linkHowArrived: string,
    public readonly marcasDisponiblesVentas: IMarcaRef[],
    public readonly marcasDisponiblesTaller: IMarcaRef[],
    public readonly coordenadasMapa: CoordenadasVO,
    public readonly celularCitas: string,
    public readonly isTaller: boolean,
    public readonly isActive: boolean,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPublishable(): boolean {
    return this.isActive
  }

  hasVentasMarcas(): boolean {
    return this.marcasDisponiblesVentas.length > 0
  }

  hasTaller(): boolean {
    return this.isTaller && this.marcasDisponiblesTaller.length > 0
  }

  hasMapa(): boolean {
    return (
      this.coordenadasMapa.latitud.length > 0 &&
      this.coordenadasMapa.longitud.length > 0
    )
  }
}
