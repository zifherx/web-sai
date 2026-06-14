import { CarroceriaEntity } from "@/modules/carroceria/domain/entities/Carroceria"

type CarroceriaOverrides = Partial<{
  id: string
  name: string
  slug: string
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}>

export function makeCarroceria(
  overrides: CarroceriaOverrides = {}
): CarroceriaEntity {
  return new CarroceriaEntity(
    overrides.id ?? "6507f1f77bcf86cd799439011",
    overrides.name ?? "Sedán",
    overrides.slug ?? "sedan",
    overrides.isActive ?? true,
    overrides.createdBy ?? "user-test-01",
    overrides.createdAt ?? new Date("2025-01-15T10:00:00Z"),
    overrides.updatedAt ?? new Date("2025-01-15T10:00:00Z")
  )
}
