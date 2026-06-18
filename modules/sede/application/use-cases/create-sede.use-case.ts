import type {
  CreateSedeDTO,
  SedeResponseDTO,
} from "@/modules/sede/application/dtos/sede.dto"
import { SedeMapper } from "@/modules/sede/application/ports/sede.mapper"
import { SedeAlreadyExistsError } from "@/modules/sede/domain/errors/SedeDomainError"
import type { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"

export class CreateSedeUseCase {
  constructor(private readonly repository: ISedeRepository) {}

  async execute(dto: CreateSedeDTO, userId: string): Promise<SedeResponseDTO> {
    const existing = await this.repository.findBySlug(dto.slug)
    if (existing) throw new SedeAlreadyExistsError(dto.slug)

    const created = await this.repository.create({
      name: dto.name,
      slug: dto.slug,
      idTiendaNovaly: dto.idTiendaNovaly,
      codexHR: dto.codexHR,
      imageUrl: dto.imageUrl,
      ciudad: dto.ciudad,
      address: dto.address,
      scheduleRegular: dto.scheduleRegular ?? "",
      scheduleExtended: dto.scheduleExtended ?? "",
      horarioVentas: dto.horarioVentas,
      horarioTaller: dto.horarioTaller,
      linkHowArrived: dto.linkHowArrived,
      marcasDisponiblesVentas: dto.marcasDisponiblesVentas,
      marcasDisponiblesTaller: dto.marcasDisponiblesTaller,
      coordenadasMapa: dto.coordenadasMapa,
      celularCitas: dto.celularCitas,
      isTaller: dto.isTaller,
      isActive: dto.isActive,
      createdBy: userId,
    })

    return SedeMapper.toDTO(created)
  }
}
