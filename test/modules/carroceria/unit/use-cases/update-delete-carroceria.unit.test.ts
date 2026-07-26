import { DeleteCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/delete-carroceria.use-case"
import { UpdateCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/update-carroceria.use-case"

import { CarroceriaNotFoundError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"
import { makeCarroceria } from "@/test/helpers/entity.factory"
import { beforeEach, describe, expect, it, vi } from "vitest"

function makeMockRepository(): ICarroceriaRepository {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findBySlug: vi.fn(),
    findActive: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}

// ── UpdateCarroceriaUseCase ───────────────────────────────────────────────────

describe("UpdateCarroceriaUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: UpdateCarroceriaUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new UpdateCarroceriaUseCase(repository)
  })

  it("retorna el DTO actualizado cuando el update es exitoso", async () => {
    const updated = makeCarroceria({ id: "abc123", name: "SUV Actualizado" })
    vi.mocked(repository.update).mockResolvedValue(updated)

    const result = await useCase.execute("abc123", { name: "SUV Actualizado" })

    expect(result.name).toBe("SUV Actualizado")
    expect(repository.update).toHaveBeenCalledWith("abc123", {
      name: "SUV Actualizado",
    })
  })

  it("lanza CarroceriaNotFoundError cuando el repositorio retorna null", async () => {
    vi.mocked(repository.update).mockResolvedValue(null)

    await expect(
      useCase.execute("id-inexistente", { name: "Test" })
    ).rejects.toThrow(CarroceriaNotFoundError)
  })

  it("el error tiene statusCode 404", async () => {
    vi.mocked(repository.update).mockResolvedValue(null)

    const error = await useCase
      .execute("id-inexistente", { name: "Test" })
      .catch((e) => e)

    expect(error.statusCode).toBe(404)
  })

  it("permite actualización parcial — solo isActive", async () => {
    const updated = makeCarroceria({ isActive: false })
    vi.mocked(repository.update).mockResolvedValue(updated)

    await useCase.execute("abc123", { isActive: false })

    expect(repository.update).toHaveBeenCalledWith("abc123", {
      isActive: false,
    })
  })
})

// ── DeleteCarroceriaUseCase ───────────────────────────────────────────────────

describe("DeleteCarroceriaUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: DeleteCarroceriaUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new DeleteCarroceriaUseCase(repository)
  })

  it("retorna el DTO de la entidad eliminada", async () => {
    const deleted = makeCarroceria({ id: "abc123", name: "Sedán" })
    vi.mocked(repository.delete).mockResolvedValue(deleted)

    const result = await useCase.execute("abc123")

    expect(result.id).toBe("abc123")
    expect(result.name).toBe("Sedán")
    expect(repository.delete).toHaveBeenCalledWith("abc123")
  })

  it("lanza CarroceriaNotFoundError cuando el repositorio retorna null", async () => {
    vi.mocked(repository.delete).mockResolvedValue(null)

    await expect(useCase.execute("id-inexistente")).rejects.toThrow(
      CarroceriaNotFoundError
    )
  })

  it("el error tiene statusCode 404", async () => {
    vi.mocked(repository.delete).mockResolvedValue(null)

    const error = await useCase.execute("id-inexistente").catch((e) => e)

    expect(error.statusCode).toBe(404)
  })

  it("llama al repositorio con exactamente el id recibido", async () => {
    const deleted = makeCarroceria()
    vi.mocked(repository.delete).mockResolvedValue(deleted)

    await useCase.execute("el-id-exacto")

    expect(repository.delete).toHaveBeenCalledExactlyOnceWith("el-id-exacto")
  })
})
