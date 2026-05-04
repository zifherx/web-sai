export interface LeadCorporativoType {
  // Datos de contacto
  nombres: string
  apellidos: string
  dni?: string
  correoElectronico: string
  celular: string
  // Datos de empresa
  razonSocial?: string
  ruc?: string
  // Información adicional
  marcaId?: string
  marcaText?: string
  ciudad?: string
  intencionCompra?: string
  sector?: string
}

export interface LeadCorporativoResponseType {
  id: string
  nombres: string
  ruc: string
  createdAt?: string
}

export interface ICreateLeadCorporativoOption {
  onSuccess?: (data: LeadCorporativoResponseType) => void
  onError?: (err: Error) => void
}
