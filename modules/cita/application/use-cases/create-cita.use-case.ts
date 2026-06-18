import {
  CitaResponseDTO,
  CreateCitaDTO,
} from "@/modules/cita/application/dto/cita.dto"
import { CitaMapper } from "@/modules/cita/application/ports/cita.mapper"
import { CitaEntity } from "@/modules/cita/domain/entities/Cita"
import { ICitaRepository } from "@/modules/cita/domain/repository/ICitaRepository"
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
    private readonly clienteRepository: IClienteUpsertPort
  ) {}

  async execute(dto: CreateCitaDTO): Promise<CitaResponseDTO> {
    // 1. Upsert del cliente
    const { cliente } = await this.clienteRepository.upsert({
      name: dto.nombres,
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      celular: dto.celular,
      email: dto.email,
      usoDatosPersonales: true,
      aceptaPromociones: false,
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
      whatsappContact: "",
    })

    return CitaMapper.toDTO(created)
  }
}
