"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PORTADA_ROW_ACTIONS_PROPS } from "@/types"
import { MoreHorizontal, Pencil, Power, PowerOff, Trash2 } from "lucide-react"

export function PortadaRowActions({
  onDelete,
  onEdit,
  onToggleActive,
  portada,
}: PORTADA_ROW_ACTIONS_PROPS) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => onEdit(portada)}>
          <Pencil className="h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleActive(portada)}>
          {portada.isActive ? (
            <>
              <PowerOff className="h-4 w-4" />
              Desactivar
            </>
          ) : (
            <>
              <Power className="h-4 w-4" />
              Activar
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(portada)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
