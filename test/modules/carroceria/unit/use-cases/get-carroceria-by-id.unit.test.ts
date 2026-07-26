import { GetCarroceriaByIdUseCase } from "@/modules/carroceria/application/use-cases/get-carroceria-by-id.use-case"
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

describe("GetCarroceriaByIdUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: GetCarroceriaByIdUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new GetCarroceriaByIdUseCase(repository)
  })

  it("retorna el DTO cuando la carrocería existe", async () => {
    const entity = makeCarroceria({ id: "abc123", name: "SUV" })
    vi.mocked(repository.findById).mockResolvedValue(entity)

    const result = await useCase.execute("abc123")

    expect(result.id).toBe("abc123")
    expect(result.name).toBe("SUV")
    expect(repository.findById).toHaveBeenCalledWith("abc123")
  })

  it("lanza CarroceriaNotFoundError cuando no existe", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null)

    await expect(useCase.execute("id-inexistente")).rejects.toThrow(
      CarroceriaNotFoundError
    )
  })

  it("el error incluye el id y tiene statusCode 404", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null)

    const error = await useCase.execute("id-inexistente").catch((e) => e)

    expect(error.statusCode).toBe(404)
    expect(error.message).toContain("id-inexistente")
  })

  it("llama al repositorio con exactamente el id recibido", async () => {
    const entity = makeCarroceria()
    vi.mocked(repository.findById).mockResolvedValue(entity)

    await useCase.execute("el-id-exacto")

    expect(repository.findById).toHaveBeenCalledExactlyOnceWith("el-id-exacto")
  })
})
