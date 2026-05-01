import { IPriceRange } from "../types/catalogo.types"
import { cn } from "./utils"

export const precioFormateadoUSD = (value: number) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export const precioFormateadoPEN = (value: number) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value)
}

export const parseBoldText = (text: string) => {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-headOffice-bold text-gray-custom-900">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export const parsePriceRange = (value: string): IPriceRange => {
  if (!value || value === "todos") return {}
  const [min, max] = value.split("_").map(Number)
  return { min, max }
}

export const groupCn = (invalid: boolean, disabled: boolean) =>
  cn(
    "h-12 rounded-lg border bg-white",
    invalid ? "border-red-custom-500" : "border-blue-custom-500",
    disabled ? "cursor-not-allowed opacity-50" : ""
  )
