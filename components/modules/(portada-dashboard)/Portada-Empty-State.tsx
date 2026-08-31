import { Button } from "@/components/ui/button"
import { PORTADA_EMPTY_STATE_PROPS } from "@/types"
import { ImageOff, Plus } from "lucide-react"

export function PortadaEmptyState({
  hasFilters,
  onClearFilters,
  onCreate,
}: PORTADA_EMPTY_STATE_PROPS) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
      <ImageOff className="h-10 w-10 text-muted-foreground" />
      <div className="space-y-1">
        <p className="font-medium">
          {hasFilters
            ? "No se encontraron portadas con esos filtros"
            : "Todavía no hay portadas"}
        </p>
        <p className="text-sm text-muted-foreground">
          {hasFilters
            ? "Prueba ajustando la búsqueda o el estado"
            : "Crea la primera portada para el sitio público"}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="outline" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      ) : (
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" />
          Nueva portada
        </Button>
      )}
    </div>
  )
}
