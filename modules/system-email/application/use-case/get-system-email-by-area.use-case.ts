import { SystemEmailByAreaResponseDTO } from "@/modules/system-email/application/dto/system-email.dto"
import { SystemEmailMapper } from "@/modules/system-email/application/ports/system-email.mapper"
import { SystemEmailArea } from "@/modules/system-email/domain/entities/System-Email"
import { SystemEmailNotFoundError } from "@/modules/system-email/domain/errors/SystemEmailDomainError"
import { ISystemEmailRepository } from "@/modules/system-email/domain/repositories/ISystemEmailRepository"

/**
 * Caso de uso para obtener el email activo de un área del sistema.
 *
 * Usado internamente por otros módulos (ej. envío de notificaciones)
 * y potencialmente expuesto como endpoint CMS para verificar configuración.
 *
 * Retorna `SystemEmailByAreaResponseDTO` (solo area + email) en lugar del
 * DTO completo, para no exponer metadata interna de configuración.
 *
 * Lanza `SystemEmailNotFoundError` si no hay email activo para esa área,
 * permitiendo al consumidor decidir si es un error crítico o un caso tolerado.
 */
export class GetSystemEmailByAreaUseCase {
  constructor(private readonly repository: ISystemEmailRepository) {}

  async execute(
    area: SystemEmailArea | string
  ): Promise<SystemEmailByAreaResponseDTO> {
    const item = await this.repository.findByArea(area)
    if (!item) throw new SystemEmailNotFoundError(area)
    return SystemEmailMapper.toAreaDTO(item)
  }
}
