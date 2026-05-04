import {
  ICarroceriaFilters,
  ISedeFilters,
  IVehiculoFilters,
} from "@/types/api.types"

export const portadaKeys = {
  all: () => ["portada"] as const,
  active: () => ["portada", "active"] as const,
  detail: (id: string) => ["portada", id] as const,
}

export const marcaKeys = {
  all: () => ["marca"] as const,
  active: () => ["marca", "active"] as const,
  detail: (id: string) => ["marca", id] as const,
  slug: (slug: string) => ["marca", "slug", slug] as const,
}

export const carroceriaKeys = {
  all: () => ["carroceria"] as const,
  list: (filters?: ICarroceriaFilters) =>
    ["carroceria", "list", filters ?? {}] as const,
  active: () => ["carroceria", "active"] as const,
  detail: (id: string) => ["carroceria", "detail", id] as const,
  slug: (slug: string) => ["carroceria", "slug", slug] as const,
}

export const sedeKeys = {
  all: () => ["sede"] as const,
  list: (filters?: ISedeFilters) => ["sede", "list", filters ?? {}] as const,
  active: (filters?: Omit<ISedeFilters, "isActive">) =>
    ["sede", "active", filters ?? {}] as const,
  detail: (id: string) => ["sede", "detail", id] as const,
  slug: (slug: string) => ["sede", "slug", slug] as const,
  talleres: () => ["sede", "talleres"] as const,
  byCiudad: (ciudad: string) => ["sede", "ciudad", ciudad] as const,
}

export const vehiculoKeys = {
  all: () => ["vehiculo"] as const,
  list: (filters?: IVehiculoFilters) =>
    ["vehiculo", "list", filters ?? {}] as const,
  active: (filters?: Omit<IVehiculoFilters, "isActive">) =>
    ["vehiculo", "active", filters ?? {}] as const,
  detail: (id: string) => ["vehiculo", "detail", id] as const,
  slug: (slug: string) => ["vehiculo", "slug", slug] as const,
  byMarca: (marcaId: string) => ["vehiculo", "marca", marcaId] as const,
}

export const reclamoKeys = {
  all: () => ["reclamo"] as const,
  list: () => ["reclamo", "list"] as const,
  detail: (id: string) => ["reclamo", "detail", id] as const,
}

export const cotizacionKeys = {
  all: () => ["cotizacion"] as const,
  list: () => ["cotizacion", "list"] as const,
  detail: (id: string) => ["cotizacion", "detail", id] as const,
  byFecha: (from: string, to: string) =>
    ["cotizacion", "list", { from, to }] as const,
  bySede: (sedeId: string) => ["cotizacion", "sede", sedeId] as const,
}

export const citaKeys = {
  all: () => ["cita"] as const,
  list: () => ["cita", "list"] as const,
  detail: (id: string) => ["cita", "detail", id] as const,
  bySede: (sedeId: string) => ["cita", "sede", sedeId] as const,
  byServicio: (tipo: string) => ["cita", "servicio", tipo] as const,
}
