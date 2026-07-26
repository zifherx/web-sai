import { CreateCitaUseCase } from "@/modules/cita/application/use-cases/create-cita.use-case"
import { GetAllCitasUseCase } from "@/modules/cita/application/use-cases/get-all-citas.use-case"
import { GetCitaByIdUseCase } from "@/modules/cita/application/use-cases/get-cita-by-id.use-case"
import { MongooseCitaRepository } from "@/modules/cita/infrastructure/mongoose/MongooseCitaRepository"
import { CitaModel } from "@/modules/cita/infrastructure/mongoose/MongooseCitaSchema"
import { MongooseClienteRepository } from "@/modules/cliente/infrastructure/mongoose/MongooseClienteRepository"
import { ClienteModel } from "@/modules/cliente/infrastructure/mongoose/MongooseClienteSchema"
import { ResendEmailAdapter } from "@/modules/email/infrastructure/adapters/resend-email.adapter"
import { MongooseSedeRepository } from "@/modules/sede/infrastructure/mongoose/MongooseSedeRepository"
import { SedeModel } from "@/modules/sede/infrastructure/mongoose/MongooseSedeSchema"

export function citaFactory() {
  const citaRepository = new MongooseCitaRepository(CitaModel)
  const clienteRepository = new MongooseClienteRepository(ClienteModel)
  const sedeRepository = new MongooseSedeRepository(SedeModel)
  const emailAdapter = new ResendEmailAdapter()
  // const emailAdapter = new FakeEmailAdapter()

  return {
    getAll: new GetAllCitasUseCase(citaRepository),
    getById: new GetCitaByIdUseCase(citaRepository),
    create: new CreateCitaUseCase(
      citaRepository,
      clienteRepository,
      sedeRepository,
      emailAdapter
    ),
  }
}
