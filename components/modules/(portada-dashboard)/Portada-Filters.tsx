"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  PORTADA_FILTERS_PROPS,
  PortadaStatusFilter,
  PortadaViewMode,
} from "@/types"
import { LayoutGrid, Plus, Search, Table2 } from "lucide-react"

export function PortadaFilters({
  onCreate,
  onSearchChange,
  onStatusChange,
  onViewChange,
  search,
  status,
  total,
  view,
}: PORTADA_FILTERS_PROPS) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange(value as PortadaStatusFilter)
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas ({total})</SelectItem>
            <SelectItem value="active">Activas</SelectItem>
            <SelectItem value="inactive">Inactivas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) =>
            value && onViewChange(value as PortadaViewMode)
          }
          variant="outline"
        >
          <ToggleGroupItem value="table" aria-label="Vista de tabla">
            <Table2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="cards" aria-label="Vista de tarjetas">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Button onClick={onCreate} className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Nueva portada
        </Button>
      </div>
    </div>
  )
}
