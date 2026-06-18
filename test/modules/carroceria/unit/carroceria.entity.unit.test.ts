import { CarroceriaEntity } from "@/modules/carroceria/domain/entities/Carroceria"
import { makeCarroceria } from "@/test/helpers/entity.factory"
import { describe, expect, it } from "vitest"

describe("CarroceriaEntity", () => {
  describe("isPublishable()", () => {
    it("retorna true cuando isActive es true", () => {
      const entity = makeCarroceria({ isActive: true })
      expect(entity.isPublishable()).toBe(true)
    })

    it("retorna false cuando isActive es false", () => {
      const entity = makeCarroceria({ isActive: false })
      expect(entity.isPublishable()).toBe(false)
    })

    describe("generateSlug()", () => {
      it("convierte a minúsculas", () => {
        expect(CarroceriaEntity.generateSlug("SEDAN")).toBe("sedan")
      })

      it("reemplaza espacios por guiones", () => {
        expect(CarroceriaEntity.generateSlug("pick up")).toBe("pick-up")
      })

      it("colapsa múltiples espacios en un solo guión", () => {
        expect(CarroceriaEntity.generateSlug("pick   up")).toBe("pick-up")
      })

      it("elimina tildes y diacríticos", () => {
        expect(CarroceriaEntity.generateSlug("Sedán Compacto")).toBe(
          "sedan-compacto"
        )
      })

      it("elimina caracteres especiales", () => {
        expect(CarroceriaEntity.generateSlug("Coupé & SUV!")).toBe("coupe-suv")
      })

      it("elimina espacios al inicio y al final antes de procesar", () => {
        expect(CarroceriaEntity.generateSlug("  SUV  ")).toBe("suv")
      })

      it("genera slug vacío para string vacío", () => {
        expect(CarroceriaEntity.generateSlug("")).toBe("")
      })

      it("caso real — Sedán Compacto", () => {
        expect(CarroceriaEntity.generateSlug("Sedán Compacto")).toBe(
          "sedan-compacto"
        )
      })

      it("caso real — Pick-Up 4x4", () => {
        expect(CarroceriaEntity.generateSlug("Pick-Up 4x4")).toBe("pick-up-4x4")
      })
    })

    // Constructor
    describe("constructor", () => {
      it("expone todas las propiedades correctamente", () => {
        const now = new Date("2026-06-14T10:00:00Z")
        const entity = new CarroceriaEntity(
          "abc123",
          "SUV",
          "suv",
          true,
          "user-01",
          now,
          now
        )

        expect(entity.id).toBe("abc123")
        expect(entity.name).toBe("SUV")
        expect(entity.slug).toBe("suv")
        expect(entity.isActive).toBe(true)
        expect(entity.createdBy).toBe("user-01")
        expect(entity.createdAt).toBe(now)
        expect(entity.updatedAt).toBe(now)
      })

      it("acepta createdAt y updatedAt como opcionales", () => {
        const entity = new CarroceriaEntity(
          "id-1",
          "Hatchback",
          "hatchback",
          true,
          "user-01"
        )
        expect(entity.createdAt).toBeUndefined()
        expect(entity.updatedAt).toBeUndefined()
      })
    })
  })
})
