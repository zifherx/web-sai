"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PORTADA_CARDS_PROPS } from "@/types"
import Image from "next/image"
import { PortadaRowActions } from "./Portada-Row-Actions"
import { PortadaStatusBadge } from "./Portada-Status-Badge"

export function PortadaCards({
  onDelete,
  onEdit,
  onToggleActive,
  portadas,
}: PORTADA_CARDS_PROPS) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {portadas.map((portada) => (
        <Card key={portada.id} className="overflow-hidden py-0">
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={portada.imageUrl}
              alt={portada.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
            <div className="absolute top-2 left-2">
              <PortadaStatusBadge isActive={portada.isActive} />
            </div>
          </div>

          <CardContent className="pt-4">
            <p className="truncate font-medium">{portada.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              /{portada.slug}
            </p>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t py-3">
            <span className="text-xs text-muted-foreground">
              {portada.createdBy || "—"}
            </span>
            <PortadaRowActions
              portada={portada}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
