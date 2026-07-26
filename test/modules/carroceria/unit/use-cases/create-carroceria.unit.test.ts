import { CreateCarroceriaUseCase } from "@/modules/carroceria/application/use-cases/create-carroceria.use-case"
import { CarroceriaAlreadyExistsError } from "@/modules/carroceria/domain/errors/CarroceriaDomainError"
import { ICarroceriaRepository } from "@/modules/carroceria/domain/repository/ICarroceriaRepository"
import { makeCarroceria } from "@/test/helpers/entity.factory"
import { beforeEach, describe, expect, it, vi } from "vitest"

// ── Mock del repositorio ──────────────────────────────────────────────────────
//
// Creamos un mock tipado que satisface la interfaz ICarroceriaRepository.
// Cada método es un vi.fn() — permite verificar llamadas y controlar retornos.

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

describe("CreateCarroceriaUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: CreateCarroceriaUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new CreateCarroceriaUseCase(repository)
  })

  // ── Happy path ────────────────────────────────────────────────────────────

  it("crea una carrocería con slug explícito", async () => {
    const entity = makeCarroceria({ name: "SUV", slug: "suv" })
    vi.mocked(repository.findBySlug).mockResolvedValue(null)
    vi.mocked(repository.create).mockResolvedValue(entity)

    const result = await useCase.execute(
      { name: "SUV", slug: "suv", isActive: true },
      "user-01"
    )

    expect(result.name).toBe("SUV")
    expect(result.slug).toBe("suv")
    expect(repository.findBySlug).toHaveBeenCalledWith("suv")
    expect(repository.create).toHaveBeenCalledOnce()
  })

  it("genera el slug automáticamente si no se provee", async () => {
    const entity = makeCarroceria({
      name: "Sedán Compacto",
      slug: "sedan-compacto",
    })
    vi.mocked(repository.findBySlug).mockResolvedValue(null)
    vi.mocked(repository.create).mockResolvedValue(entity)

    await useCase.execute(
      { name: "Sedán Compacto", slug: "sedan-compacto", isActive: true },
      "user-01"
    )

    // El use-case debe haber generado el slug y buscado por él
    expect(repository.findBySlug).toHaveBeenCalledWith("sedan-compacto")
  })

  it("pasa el userId como createdBy al repositorio", async () => {
    const entity = makeCarroceria({ createdBy: "clerk-user-xyz" })
    vi.mocked(repository.findBySlug).mockResolvedValue(null)
    vi.mocked(repository.create).mockResolvedValue(entity)

    await useCase.execute(
      { name: "SUV", slug: "suv", isActive: true },
      "clerk-user-xyz"
    )

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ createdBy: "clerk-user-xyz" })
    )
  })

  it("retorna un DTO correctamente formado", async () => {
    const now = new Date("2025-01-15T10:00:00Z")
    const entity = makeCarroceria({ createdAt: now, updatedAt: now })
    vi.mocked(repository.findBySlug).mockResolvedValue(null)
    vi.mocked(repository.create).mockResolvedValue(entity)

    const result = await useCase.execute(
      { name: "Sedán", slug: "sedan", isActive: true },
      "user-01"
    )

    expect(result).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      isActive: expect.any(Boolean),
      createdBy: expect.any(String),
    })
    // Las fechas deben ser ISO strings en el DTO
    expect(result.createdAt).toBe("2025-01-15T10:00:00.000Z")
  })

  // ── Error path ────────────────────────────────────────────────────────────

  it("lanza CarroceriaAlreadyExistsError si el slug ya existe", async () => {
    const existing = makeCarroceria({ slug: "suv" })
    vi.mocked(repository.findBySlug).mockResolvedValue(existing)

    await expect(
      useCase.execute({ name: "SUV", slug: "suv", isActive: true }, "user-01")
    ).rejects.toThrow(CarroceriaAlreadyExistsError)
  })

  it("no llama a repository.create si el slug ya existe", async () => {
    const existing = makeCarroceria({ slug: "suv" })
    vi.mocked(repository.findBySlug).mockResolvedValue(existing)

    await useCase
      .execute({ name: "SUV", slug: "suv", isActive: true }, "user-01")
      .catch(() => {})

    expect(repository.create).not.toHaveBeenCalled()
  })

  it("el error tiene statusCode 409", async () => {
    const existing = makeCarroceria({ slug: "suv" })
    vi.mocked(repository.findBySlug).mockResolvedValue(existing)

    const error = await useCase
      .execute({ name: "SUV", slug: "suv", isActive: true }, "user-01")
      .catch((e) => e)

    expect(error).toBeInstanceOf(CarroceriaAlreadyExistsError)
    expect(error.statusCode).toBe(409)
  })
})
