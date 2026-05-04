import { CitaService } from "@/interfaces/application/cita/cita.service"
import { MongooseCitaRepository } from "@/interfaces/infrastructure/database/cita/cita.repository"
import { CitaModel } from "@/interfaces/infrastructure/database/cita/cita.schema"
import { MongooseClienteRepository } from "@/interfaces/infrastructure/database/cliente/cliente.repository"
import { ClienteModel } from "@/interfaces/infrastructure/database/cliente/cliente.schema"

export function citaFactory(): CitaService {
  const citaRepo = new MongooseCitaRepository(CitaModel)
  const clienteRepo = new MongooseClienteRepository(ClienteModel)
  return new CitaService(citaRepo, clienteRepo)
}
