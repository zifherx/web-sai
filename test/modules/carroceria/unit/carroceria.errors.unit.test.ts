import {
  CarroceriaAlreadyExistsError,
  CarroceriaNotFoundError,
  CarroceriaUnauthorizedError,
  CarroceriaValidationError,
} from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { DomainError } from "@/shared/domain/domain.error"
import { describe, expect, it } from "vitest"

describe("Carroceria Domain Errors", () => {
  describe("CarroceriaNotFoundError", () => {
    it("extiende DomainError", () => {
      const error = new CarroceriaNotFoundError("abc123")
      expect(error).toBeInstanceOf(DomainError)
    })

    it("tiene statusCode 404", () => {
      const error = new CarroceriaNotFoundError("abc123")
      expect(error.statusCode).toBe(404)
    })

    it("incluye el id en el mensaje", () => {
      const error = new CarroceriaNotFoundError("abc123")
      expect(error.message).toContain("abc123")
    })

    it("tiene el nombre de clase correcto", () => {
      const error = new CarroceriaNotFoundError("abc123")
      expect(error.name).toBe("CarroceriaNotFoundError")
    })
  })

  describe("CarroceriaAlreadyExistsError", () => {
    it("extiende DomainError", () => {
      const error = new CarroceriaAlreadyExistsError("sedan")
      expect(error).toBeInstanceOf(DomainError)
    })

    it("tiene statusCode 409", () => {
      const error = new CarroceriaAlreadyExistsError("sedan")
      expect(error.statusCode).toBe(409)
    })

    it("incluye el slug en el mensaje", () => {
      const error = new CarroceriaAlreadyExistsError("sedan")
      expect(error.message).toContain("sedan")
    })
  })

  describe("UnauthorizedError", () => {
    it("tiene statusCode 401", () => {
      const error = new CarroceriaUnauthorizedError()
      expect(error.statusCode).toBe(401)
    })
  })

  describe("instanceof con withHandler", () => {
    it("todos los errores son instancia de DomainError para el mapeo en withHandler", () => {
      const errors = [
        new CarroceriaNotFoundError("id"),
        new CarroceriaAlreadyExistsError("slug"),
        new CarroceriaUnauthorizedError(),
        new CarroceriaValidationError("msg"),
      ]
      errors.forEach((err) => {
        expect(err).toBeInstanceOf(DomainError)
        expect(typeof err.statusCode).toBe("number")
      })
    })
  })
})
