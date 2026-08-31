import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib"
import { PORTADA_STATUS_BADGE_PROPS } from "@/types"

export function PortadaStatusBadge({ isActive }: PORTADA_STATUS_BADGE_PROPS) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5",
        isActive
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
          : "border-stone-200 bg-stone-50 text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-emerald-500" : "bg-stone-400"
        )}
      />
      {isActive ? "Activa" : "Inactiva"}
    </Badge>
  )
}
