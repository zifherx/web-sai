export interface IBitacoraRequest {
  body: string
  authorization: string
  accept: string
}

export interface IBitacoraResponse {
  body: string
  code: number
  statusText: string
}

export class BitacoraEntity {
  constructor(
    public readonly id: string,
    public readonly request: IBitacoraRequest,
    public readonly response: IBitacoraResponse,
    public readonly method: string,
    public readonly url: string,
    public readonly date: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
