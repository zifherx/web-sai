import {
  CreateVehiculoDTO,
  VehiculoResponseDTO,
} from "@/modules/vehiculo/application/dto/vehiculo.dto"
import { VehiculoMapper } from "@/modules/vehiculo/application/ports/vehiculo.mapper"
import { VehiculoAlreadyExistsError } from "@/modules/vehiculo/domain/errors/VehiculoDomainError"
import { IVehiculoRepository } from "@/modules/vehiculo/domain/repositories/IVehiculoRepository"

export class CreateVehiculoUseCase {
  constructor(private readonly repository: IVehiculoRepository) {}

  async execute(
    dto: CreateVehiculoDTO,
    userId: string
  ): Promise<VehiculoResponseDTO> {
    const existing = await this.repository.findBySlug(dto.slug)
    if (existing) throw new VehiculoAlreadyExistsError(dto.slug)

    const created = await this.repository.create({
      name: dto.name,
      slug: dto.slug,
      codigoFlashdealer: dto.codigoFlashdealer,
      imageUrl: dto.imageUrl,
      precioBase: dto.precioBase,
      fichaTecnica: dto.fichaTecnica,
      marcaId: dto.marcaId,
      carroceriaId: dto.carroceriaId,
      isEntrega48H: dto.isEntrega48H,
      isGLP: dto.isGLP,
      isLiquidacion: dto.isLiquidacion,
      isNuevo: dto.isNuevo,
      isActive: dto.isActive,
      colores: dto.colores,
      features: dto.features,
      galeria: dto.galeria,
      createdBy: userId,
    })

    return VehiculoMapper.toDTO(created)
  }
}
