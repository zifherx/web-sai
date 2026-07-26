import { CarroceriaMapper } from "@/modules/carroceria/application/ports/carroceria.mapper"
import { makeCarroceria } from "@/test/helpers/entity.factory"
import { describe, expect, it } from "vitest"

describe("CarroceriaMapper", () => {
  describe("toDTO()", () => {
    it("mapea todos los campos correctamente", () => {
      const now = new Date("2025-01-15T10:00:00Z")
      const entity = makeCarroceria({
        id: "abc123",
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "user-01",
        createdAt: now,
        updatedAt: now,
      })

      const dto = CarroceriaMapper.toDTO(entity)

      expect(dto.id).toBe("abc123")
      expect(dto.name).toBe("Sedán")
      expect(dto.slug).toBe("sedan")
      expect(dto.isActive).toBe(true)
      expect(dto.createdBy).toBe("user-01")
      expect(dto.createdAt).toBe("2025-01-15T10:00:00.000Z")
      expect(dto.updatedAt).toBe("2025-01-15T10:00:00.000Z")
    })

    it("retorna undefined en createdAt y updatedAt si la entidad no los tiene", () => {
      const entity = makeCarroceria({
        createdAt: undefined,
        updatedAt: undefined,
      })
      const dto = CarroceriaMapper.toDTO(entity)

      expect(dto.createdAt).toBe("2025-01-15T10:00:00.000Z")
      expect(dto.updatedAt).toBe("2025-01-15T10:00:00.000Z")
    })

    it("el DTO no expone isPublishable como campo", () => {
      const entity = makeCarroceria()
      const dto = CarroceriaMapper.toDTO(entity)

      expect(dto).not.toHaveProperty("isPublishable")
    })
  })

  describe("toDTOList()", () => {
    it("mapea un array de entidades correctamente", () => {
      const entities = [
        makeCarroceria({ id: "1", name: "Sedán" }),
        makeCarroceria({ id: "2", name: "SUV" }),
        makeCarroceria({ id: "3", name: "Hatchback" }),
      ]

      const dtos = CarroceriaMapper.toDTOList(entities)

      expect(dtos).toHaveLength(3)
      expect(dtos[0].name).toBe("Sedán")
      expect(dtos[1].name).toBe("SUV")
      expect(dtos[2].name).toBe("Hatchback")
    })

    it("retorna array vacío para lista vacía", () => {
      expect(CarroceriaMapper.toDTOList([])).toEqual([])
    })
  })
})
