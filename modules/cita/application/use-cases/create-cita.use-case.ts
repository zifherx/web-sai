import {
  CitaResponseDTO,
  CreateCitaDTO,
} from "@/modules/cita/application/dto/cita.dto"
import { CitaMapper } from "@/modules/cita/application/ports/cita.mapper"
import { CitaEntity } from "@/modules/cita/domain/entities/Cita"
import { ICitaRepository } from "@/modules/cita/domain/repository/ICitaRepository"
import { IEmailPort } from "@/modules/email/domain/repository/IEmailRepository"
import { SedeNotFoundError } from "@/modules/sede/domain/errors/SedeDomainError"
import { ISedeRepository } from "@/modules/sede/domain/repositories/ISedeRepository"
import { IClienteUpsertPort } from "@/shared/domain/IClienteUpsertRepository"

/**
 * Caso de uso: Crear una cita de servicio técnico.
 *
 * Flujo:
 * 1. Upsert del cliente por `numeroDocumento` — crea o actualiza el registro.
 * 2. Construye el mensaje de WhatsApp delegando a `CitaEntity.buildWhatsappMessage`.
 * 3. Persiste la cita y retorna el DTO.
 *
 * Endpoint público — accesible sin autenticación Clerk desde el formulario
 * de agendamiento del frontend.
 *
 * Nota sobre `whatsappContact`: actualmente se persiste vacío.
 * El número de celularCitas de la sede podría resolverse inyectando
 * `ISedeRepository` y haciendo `findById(dto.sedeId)`. Se deja como
 * mejora futura cuando se decida si resolverlo en el backend o en el frontend.
 */
export class CreateCitaUseCase {
  constructor(
    private readonly citaRepository: ICitaRepository,
    private readonly clienteRepository: IClienteUpsertPort,
    private readonly sedeRepository: ISedeRepository,
    private readonly emailPort: IEmailPort
  ) {}

  async execute(dto: CreateCitaDTO): Promise<CitaResponseDTO> {
    // 1. Búsqueda de sede
    const sede = await this.sedeRepository.findById(dto.sedeId)
    if (!sede) throw new SedeNotFoundError(dto.sedeId)

    // 1. Upsert del cliente
    const { cliente } = await this.clienteRepository.upsert({
      name: dto.nombres,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      celular: dto.celular,
      email: dto.email,
      usoDatosPersonales: true,
      aceptaPromociones: true,
    })

    // 2. Construir mensaje de WhatsApp — lógica de dominio en la entidad
    const whatsappMessage = CitaEntity.buildWhatsappMessage({
      nombre: dto.nombres,
      marca: dto.marcaFlat,
      placa: dto.placa,
      kilometraje: dto.kilometraje,
      tipoServicio: dto.tipoServicio,
      ciudadSede: dto.ciudadSede,
      comentario: dto.comentario ?? "",
    })

    // 3. Persistir la cita
    const created = await this.citaRepository.create({
      clienteId: cliente.id,
      placa: dto.placa.toUpperCase(),
      kilometraje: dto.kilometraje,
      marcaId: dto.marcaId,
      modeloId: dto.modeloId ?? "",
      marcaFlat: dto.marcaFlat,
      modeloFlat: dto.modeloFlat ?? "",
      sedeId: dto.sedeId,
      ciudadSede: dto.ciudadSede,
      tipoServicio: dto.tipoServicio,
      comentario: dto.comentario ?? "",
      whatsappMessage,
      whatsappContact: sede.celularCitas,
    })

    if (sede.correoCitas) {
      const resultado = await this.emailPort.sendCita({
        areaEmail: sede.correoCitas,
        clienteEmail: dto.email,
        clienteNombre: dto.nombres,
        tipoDocumento: dto.tipoDocumento,
        numeroDocumento: dto.numeroDocumento,
        celular: dto.celular,
        placa: created.placa,
        kilometraje: dto.kilometraje,
        marcaFlat: dto.marcaFlat,
        modeloFlat: dto.modeloFlat ?? "",
        tipoServicio: dto.tipoServicio,
        comentario: dto.comentario ?? "",
        sedeName: sede.name,
        sedeCiudad: sede.ciudad,
        sedeAddress: sede.address,
        citaId: created.id,
        fechaRegistro: created.createdAt ?? new Date(),
      })

      if (!resultado.success) {
        console.error("[CreateCitaUseCase] email falló:", {
          citaId: created.id,
          error: resultado.error,
        })
      }
    }

    return CitaMapper.toDTO(created)
  }
}
