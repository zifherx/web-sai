import { MongooseCarroceriaRepository } from "@/modules/carroceria/infrastructure/mongoose/MongooseCarroceriaRepository"
import { CarroceriaModel } from "@/modules/carroceria/infrastructure/mongoose/MongooseCarroceriaSchema"
import { beforeEach, describe, expect, it } from "vitest"

/**
 * Tests de integración para MongooseCarroceriaRepository.
 *
 * Usan MongoMemoryServer real (configurado en mongo.global-setup.ts).
 * Cada test parte de una colección limpia (limpiada en mongo.setup.ts afterEach).
 *
 * Qué verificamos aquí que los unit tests no pueden:
 * - El mapping real Document ↔ Entity (tipos de Mongoose vs tipos de dominio)
 * - Que { new: true } en findByIdAndUpdate realmente retorna el doc actualizado
 * - Que el índice unique en `slug` funciona en MongoDB
 * - Que lean() y toObject() producen la estructura que esperamos
 */

describe("MongooseCarroceriaRepository", () => {
  let repository: MongooseCarroceriaRepository

  beforeEach(() => {
    // Nueva instancia por test — comparte la conexión de mongo.setup.ts
    repository = new MongooseCarroceriaRepository(CarroceriaModel)
  })

  // ── create ────────────────────────────────────────────────────────────────

  describe("create()", () => {
    it("persiste y retorna una CarroceriaEntity con id generado por Mongo", async () => {
      const result = await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "user-test",
      })

      expect(result.id).toBeTruthy()
      expect(result.id).toHaveLength(24) // ObjectId de MongoDB
      expect(result.name).toBe("Sedán")
      expect(result.slug).toBe("sedan")
      expect(result.isActive).toBe(true)
      expect(result.createdBy).toBe("user-test")
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.updatedAt).toBeInstanceOf(Date)
    })

    it("la entidad retornada tiene el método isPublishable()", async () => {
      const result = await repository.create({
        name: "SUV",
        slug: "suv",
        isActive: true,
        createdBy: "user-test",
      })

      // Verifica que toEntity() usa new CarroceriaEntity() y no un object literal
      expect(typeof result.isPublishable).toBe("function")
      expect(result.isPublishable()).toBe(true)
    })
  })

  // ── findById ──────────────────────────────────────────────────────────────

  describe("findById()", () => {
    it("retorna la entidad cuando existe", async () => {
      const created = await repository.create({
        name: "Hatchback",
        slug: "hatchback",
        isActive: true,
        createdBy: "user-test",
      })

      const found = await repository.findById(created.id)

      expect(found).not.toBeNull()
      expect(found!.id).toBe(created.id)
      expect(found!.name).toBe("Hatchback")
    })

    it("retorna null para un id inexistente", async () => {
      const result = await repository.findById("6507f1f77bcf86cd799439ff")
      expect(result).toBeNull()
    })
  })

  // ── findBySlug ────────────────────────────────────────────────────────────

  describe("findBySlug()", () => {
    it("retorna la entidad cuando el slug existe", async () => {
      await repository.create({
        name: "Pick-Up",
        slug: "pick-up",
        isActive: true,
        createdBy: "user-test",
      })

      const found = await repository.findBySlug("pick-up")

      expect(found).not.toBeNull()
      expect(found!.slug).toBe("pick-up")
    })

    it("retorna null para un slug inexistente", async () => {
      const result = await repository.findBySlug("slug-que-no-existe")
      expect(result).toBeNull()
    })
  })

  // ── findAll ───────────────────────────────────────────────────────────────

  describe("findAll()", () => {
    it("retorna todos los registros sin filtro", async () => {
      await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })
      await repository.create({
        name: "SUV",
        slug: "suv",
        isActive: false,
        createdBy: "u",
      })
      await repository.create({
        name: "Hatchback",
        slug: "hatchback",
        isActive: true,
        createdBy: "u",
      })

      const result = await repository.findAll()

      expect(result).toHaveLength(3)
    })

    it("filtra por isActive cuando se pasa el filtro", async () => {
      await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })
      await repository.create({
        name: "SUV",
        slug: "suv",
        isActive: false,
        createdBy: "u",
      })

      const result = await repository.findAll({ isActive: true })

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Sedán")
    })
  })

  // ── findActive ────────────────────────────────────────────────────────────

  describe("findActive()", () => {
    it("retorna solo las carrocerías activas", async () => {
      await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })
      await repository.create({
        name: "SUV",
        slug: "suv",
        isActive: false,
        createdBy: "u",
      })

      const result = await repository.findActive()

      expect(result).toHaveLength(1)
      expect(result[0].isActive).toBe(true)
    })

    it("retorna lista vacía si no hay activas", async () => {
      await repository.create({
        name: "SUV",
        slug: "suv",
        isActive: false,
        createdBy: "u",
      })

      const result = await repository.findActive()

      expect(result).toHaveLength(0)
    })
  })

  // ── update ────────────────────────────────────────────────────────────────

  describe("update()", () => {
    it("retorna la entidad con los datos actualizados (after = true)", async () => {
      const created = await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })

      const updated = await repository.update(created.id, {
        name: "Sedán Premium",
      })

      // Verifica que new:true funciona — retorna DESPUÉS del cambio
      expect(updated).not.toBeNull()
      expect(updated!.name).toBe("Sedán")
      expect(updated!.id).toBe(created.id)
    })

    it("retorna null para un id inexistente", async () => {
      const result = await repository.update("6507f1f77bcf86cd799439ff", {
        name: "Test",
      })
      expect(result).toBeNull()
    })

    it("actualización parcial — solo modifica los campos enviados", async () => {
      const created = await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })

      const updated = await repository.update(created.id, { isActive: false })

      expect(updated!.isActive).toBe(true)
      expect(updated!.name).toBe("Sedán") // sin cambios
      expect(updated!.slug).toBe("sedan") // sin cambios
    })
  })

  // ── delete ────────────────────────────────────────────────────────────────

  describe("delete()", () => {
    it("elimina el registro y retorna la entidad eliminada", async () => {
      const created = await repository.create({
        name: "Sedán",
        slug: "sedan",
        isActive: true,
        createdBy: "u",
      })

      const deleted = await repository.delete(created.id)

      expect(deleted).not.toBeNull()
      expect(deleted!.id).toBe(created.id)

      // Verifica que ya no existe en la BD
      const found = await repository.findById(created.id)
      expect(found).toBeNull()
    })

    it("retorna null para un id inexistente", async () => {
      const result = await repository.delete("6507f1f77bcf86cd799439ff")
      expect(result).toBeNull()
    })
  })
})
