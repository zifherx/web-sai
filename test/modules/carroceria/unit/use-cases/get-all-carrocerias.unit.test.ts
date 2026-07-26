import { GetActiveCarroceriasUseCase } from "@/modules/carroceria/application/use-cases/get-active-carrocerias.use-case"
import { GetAllCarroceriasUseCase } from "@/modules/carroceria/application/use-cases/get-all-carrocerias.use-case"
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

describe("GetAllCarroceriasUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: GetAllCarroceriasUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new GetAllCarroceriasUseCase(repository)
  })

  it("retorna lista de DTOs cuando hay registros", async () => {
    const entities = [
      makeCarroceria({ id: "1", name: "Sedán" }),
      makeCarroceria({ id: "2", name: "SUV" }),
    ]
    vi.mocked(repository.findAll).mockResolvedValue(entities)

    const result = await useCase.execute()

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe("Sedán")
    expect(result[1].name).toBe("SUV")
  })

  it("retorna lista vacía cuando no hay registros", async () => {
    vi.mocked(repository.findAll).mockResolvedValue([])

    const result = await useCase.execute()

    expect(result).toEqual([])
  })

  it("pasa el filtro al repositorio cuando se provee", async () => {
    vi.mocked(repository.findAll).mockResolvedValue([])

    await useCase.execute({ isActive: "true" })

    expect(repository.findAll).toHaveBeenCalledWith({ isActive: "true" })
  })

  it("llama al repositorio sin filtro cuando no se provee", async () => {
    vi.mocked(repository.findAll).mockResolvedValue([])

    await useCase.execute()

    expect(repository.findAll).toHaveBeenCalledWith(undefined)
  })
})

describe("GetActiveCarroceriasUseCase", () => {
  let repository: ICarroceriaRepository
  let useCase: GetActiveCarroceriasUseCase

  beforeEach(() => {
    repository = makeMockRepository()
    useCase = new GetActiveCarroceriasUseCase(repository)
  })

  it("retorna solo las carrocerías activas", async () => {
    const activas = [
      makeCarroceria({ id: "1", isActive: true }),
      makeCarroceria({ id: "2", isActive: true }),
    ]
    vi.mocked(repository.findActive).mockResolvedValue(activas)

    const result = await useCase.execute()

    expect(result).toHaveLength(2)
    result.forEach((dto) => expect(dto.isActive).toBe(true))
  })

  it("usa findActive del repositorio, no findAll", async () => {
    vi.mocked(repository.findActive).mockResolvedValue([])

    await useCase.execute()

    expect(repository.findActive).toHaveBeenCalledOnce()
    expect(repository.findAll).not.toHaveBeenCalled()
  })
})
