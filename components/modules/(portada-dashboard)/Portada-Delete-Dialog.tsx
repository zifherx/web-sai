"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeletePortada } from "@/hooks/mutations/use-portada.mutations"
import { PORTADA_DELETE_DIALOG_PROPS } from "@/types"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export function PortadaDeleteDialog({
  onOpenChange,
  open,
  portada,
}: PORTADA_DELETE_DIALOG_PROPS) {
  const [confirmText, setConfirmText] = useState("")
  const deleteMutation = useDeletePortada()

  useEffect(() => {
    if (open) setConfirmText("")
  }, [open])

  if (!portada) return null

  const isConfirmed = confirmText.trim() === portada.name
  const isPending = deleteMutation.isPending

  const handleDelete = () => {
    if (!isConfirmed) return
    deleteMutation.mutate(portada.id, { onSuccess: () => onOpenChange(false) })
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <DialogTitle className="pt-2">Eliminar portada</DialogTitle>
          <DialogDescription>
            Esta acción es <strong>permanente</strong> y no se puede deshacer.
            El registro se borra por completo de la base de datos, no solo se
            desactiva.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="confirm-name">
            Escribe <strong>{portada.name}</strong> para confirmar
          </Label>
          <Input
            id="confirm-name"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={!isConfirmed || isPending}
            onClick={handleDelete}
          >
            {isPending ? "Eliminando..." : "Eliminar permanentemente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
