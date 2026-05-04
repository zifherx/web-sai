import { IMarcaRef, IPriceRange } from "@/types"
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

export const parseMarca = (item: any): IMarcaRef => {
  if (typeof item === "string") {
    return {
      id: item,
      name: "",
      slug: "",
      imageUrl: "",
    }
  }

  return {
    id: item._id?.toString() ?? "",
    name: item.name ?? "",
    slug: item.slug ?? "",
    imageUrl: item.imageUrl ?? "",
  }
}

export const toObjectMarcaIds = (marcas: { id: string }[]): string[] => {
  return marcas.map((m) => m.id).filter(Boolean)
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const uint8 = new Uint8Array(buffer)
  const CHUNK = 8192 // 8KB — bien por debajo del límite
  let binary = ""

  for (let i = 0; i < uint8.length; i += CHUNK) {
    const slice = uint8.subarray(i, i + CHUNK)
    binary += String.fromCharCode(...slice) // spread de 8KB → seguro
  }

  return btoa(binary)
}
