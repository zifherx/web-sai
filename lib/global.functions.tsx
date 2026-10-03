import { MaintenanceToggleCard } from "@/components/modules/(site-settings-dashboard)/Maintenance-Toggle-Card"
import { cn } from "@/lib/utils"
import { hasPermission } from "@/shared/infrastructure/auth/permissions"
import { IMarcaRef, IPriceRange } from "@/types"
import { SettingsTab } from "@/types/site-settings.types"
import { Wrench } from "lucide-react"

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

export const getInitials = (nombre: string): string => {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part: any) => part[0].toUpperCase() ?? "")
    .join("")
}

export const formatSegment = (segment: string): string => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const buildPath = (segments: string[], index: number): string => {
  return "/" + segments.slice(0, index + 1).join("/")
}

export function toGlobalPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export const SETTINGS_TABS: SettingsTab[] = [
  {
    value: "mantenimiento",
    label: "Mantenimiento",
    description:
      "Reemplaza todo el sitio público por una página de mantenimiento",
    icon: Wrench,
    permission: { siteSettings: ["read"] },
    content: <MaintenanceToggleCard />,
  },
]

export function getVisibleSettingsTabs(rol: string): SettingsTab[] {
  return SETTINGS_TABS.filter(
    (tab) => !tab.permission || hasPermission(rol, tab.permission)
  )
}

export const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
})
