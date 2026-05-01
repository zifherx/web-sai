import { SORT_OPTION_TYPE } from "@/types/catalogo.types"
import { IOptionSelect } from "@/types/searchSelect.types"

export const SORT_OPTIONS: IOptionSelect[] = [
  { value: "precio-asc", label: "Menor a mayor precio" },
  { value: "precio-desc", label: "Mayor a menor precio" },
  { value: "nombre-asc", label: "A -> Z" },
  { value: "nombre-desc", label: "Z -> A" },
]

export const DEFAULT_SORT_CATALOGO: SORT_OPTION_TYPE = "precio-asc"

export const PRICE_RANGES: IOptionSelect[] = [
  { value: "todos", label: "Todos los precios" },
  { value: "0_20000", label: "Hasta $20,000" },
  { value: "20000_40000", label: "$20,000 — $40,000" },
  { value: "40000_60000", label: "$40,000 — $60,000" },
  { value: "60000_80000", label: "$60,000 — $80,000" },
  { value: "80000_100000", label: "$80,000 — $100,000" },
  { value: "100000_999999", label: "Más de $100,000" },
]

export const INITIAL_PAGE_SIZE = 12
export const LOAD_MORE_SIZE = 3

export const TIPO_CAMBIO = process.env.TIPO_CAMBIO || 3.742
