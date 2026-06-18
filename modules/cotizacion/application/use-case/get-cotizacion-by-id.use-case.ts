import { CotizacionResponseDTO } from "@/modules/cotizacion/application/dto/cotizacion.dto"
import { CotizacionMapper } from "@/modules/cotizacion/application/ports/cotizacion.mapper"
import { CotizacionNotFoundError } from "@/modules/cotizacion/domain/errors/CotizacionDomainError"
import { ICotizacionRepository } from "@/modules/cotizacion/domain/repository/ICotizacionRepository"

export class GetCotizacionByIdUseCase {
  constructor(private readonly repository: ICotizacionRepository) {}

  async execute(id: string): Promise<CotizacionResponseDTO> {
    const item = await this.repository.findById(id)
    if (!item) throw new CotizacionNotFoundError(id)
    return CotizacionMapper.toDTO(item)
  }
}
