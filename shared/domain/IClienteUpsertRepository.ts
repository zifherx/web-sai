export interface IUpsertClienteData {
  name: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  email: string
  usoDatosPersonales: boolean
  aceptaPromociones: boolean
}

export interface IUpsertClienteResult {
  cliente: { id: string }
}

export interface IClienteUpsertPort {
  upsert(data: IUpsertClienteData): Promise<IUpsertClienteResult>
}
