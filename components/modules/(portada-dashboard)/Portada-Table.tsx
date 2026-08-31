"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PORTADA_TABLE_PROPS } from "@/types"
import Image from "next/image"
import { PortadaRowActions } from "./Portada-Row-Actions"
import { PortadaStatusBadge } from "./Portada-Status-Badge"

export function PortadaTable({
  onDelete,
  onEdit,
  onToggleActive,
  portadas,
}: PORTADA_TABLE_PROPS) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Creado por</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {portadas.map((portada) => (
            <TableRow key={portada.id}>
              <TableCell>
                <div className="relative h-12 w-20 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={portada.imageUrl}
                    alt={portada.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{portada.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {portada.slug}
              </TableCell>
              <TableCell>
                <PortadaStatusBadge isActive={portada.isActive} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {portada.createdBy || "—"}
              </TableCell>
              <TableCell>
                <PortadaRowActions
                  portada={portada}
                  onEdit={onEdit}
                  onToggleActive={onToggleActive}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
