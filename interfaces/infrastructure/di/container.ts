import type { ICarroceriaRepository } from "@/interfaces/domain/carroceria/carroceria.repository.port"
import type { IClienteRepository } from "@/interfaces/domain/cliente/cliente.repository.port"
import type { ICotizacionRepository } from "@/interfaces/domain/cotizacion/cotizacion.repository.port"
import type { IMarcaRepository } from "@/interfaces/domain/marca/marca.repository.port"
import type { IPortadaRepository } from "@/interfaces/domain/portada/portada.repository.port"
import type { IReclamoRepository } from "@/interfaces/domain/reclamo/reclamo.repository.port"
import type { ISedeRepository } from "@/interfaces/domain/sede/sede.repository.port"
import type { IVehiculoRepository } from "@/interfaces/domain/vehiculo/vehiculo.repository.port"

interface ServiceRegistry {
  IPortadaRepository: IPortadaRepository
  IMarcaRepository: IMarcaRepository
  ICarroceriaRepository: ICarroceriaRepository
  IVehiculoRepository: IVehiculoRepository
  ISedeRepository: ISedeRepository
  IReclamoRepository: IReclamoRepository
  ICotizacionRepository: ICotizacionRepository
  IClienteRepository: IClienteRepository
  // Se agregan nuevos
}

type ServiceKey = keyof ServiceRegistry

export class DIContainer {
  private static instance: DIContainer
  private readonly services = new Map<ServiceKey, ServiceRegistry[ServiceKey]>()

  private constructor() {}

  static getInstance(): DIContainer {
    return (DIContainer.instance ??= new DIContainer())
  }

  register<K extends ServiceKey>(key: K, service: ServiceRegistry[K]): void {
    this.services.set(key, service)
  }

  get<K extends ServiceKey>(key: K): ServiceRegistry[K] {
    const service = this.services.get(key)
    if (!service) throw new Error(`[DI] "${key}" no registrado`)
    return service as ServiceRegistry[K]
  }

  has(key: ServiceKey): boolean {
    return this.services.has(key)
  }
}
