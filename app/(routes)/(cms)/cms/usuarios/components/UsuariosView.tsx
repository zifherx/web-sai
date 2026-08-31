"use client"

import { CreateUsuarioDialog } from "@/components/modules/(auth)/Create-Usuario-Dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUsuarios } from "@/hooks/queries/use-usuarios"
import { Plus } from "lucide-react"
import { useState } from "react"

const ROL_LABEL: Record<string, string> = {
  admin: "Administrador",
  editor: "Editor",
  sede: "Sede",
}
const ROL_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  admin: "default",
  editor: "secondary",
  sede: "outline",
}

export function UsuariosView() {
  const { data: usuarios, isLoading } = useUsuarios()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            Administra quién puede acceder al CMS y con qué rol.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo usuario
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Sede</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && usuarios?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  Aún no hay usuarios registrados.
                </TableCell>
              </TableRow>
            )}

            {usuarios?.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Badge variant={ROL_VARIANT[usuario.rol]}>
                    {ROL_LABEL[usuario.rol]}
                  </Badge>
                </TableCell>
                <TableCell>{usuario.sedeId ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateUsuarioDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
