import z from "zod"

export const BitacoraFiltersSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  responseCode: z.coerce.number().optional(),
})

export type BitacoraFiltersDTO = z.infer<typeof BitacoraFiltersSchema>

export type BitacoraRequestDTO = {
  body: string
  authorization: string
  accept: string
}

export type BitacoraResponseDTO = {
  body: string
  code: number
  statusText: string
}

export type BitacoraResponseItemDTO = {
  id: string
  request: BitacoraRequestDTO
  response: BitacoraResponseDTO
  method: string
  url: string
  isSuccess: boolean
  createdAt?: string
}
