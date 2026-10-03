"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useSetMaintenanceMode } from "@/hooks/mutations/use-site.settings.mutations"
import { dateFormatter } from "@/lib/global.functions"
import { cn } from "@/lib/utils"
import { MAINTENANCE_MESSAGE_MAX } from "@/modules/site-settings/application/dto/site-settings.dto"
import { MAINTENANCE_FORM_PROPS } from "@/types/site-settings.types"
import { AlertTriangle, ExternalLink } from "lucide-react"
import { useState } from "react"

export function MaintenanceForm({ settings }: MAINTENANCE_FORM_PROPS) {
  const { mutate, isPending } = useSetMaintenanceMode()
  const [message, setMessage] = useState(settings.maintenanceMessage ?? "")
  const [confirmOpen, setConfirmOpen] = useState(false)

  const enabled = settings.maintenanceMode
  const apply = (next: boolean) => mutate({ enabled: next, message })

  // Activar tumba todo el sitio público: se confirma. Desactivar es inmediato.
  const handleCheckedChange = (next: boolean) =>
    next ? setConfirmOpen(true) : apply(false)

  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-2xl border p-6 transition-colors",
        enabled ? "border-red-custom-100 bg-red-custom-100/10" : "bg-white"
      )}
    >
      {enabled && (
        <div className="flex items-center gap-2 rounded-lg bg-red-custom-500 px-3 py-2 text-sm text-white">
          <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
          <span className="font-textOffice-medium">
            El sitio público está en mantenimiento.
          </span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 underline-offset-2 hover:underline"
          >
            Ver sitio <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-headOffice-bold text-base text-gray-custom-900">
            Modo mantenimiento
          </p>
          <p className="font-textOffice-regular text-sm text-gray-custom-700">
            {enabled
              ? "Activo: los visitantes ven la página de mantenimiento."
              : "Inactivo: el sitio público funciona con normalidad."}
          </p>
          {settings.updatedBy && settings.updatedAt && (
            <p className="mt-1 font-textOffice-regular text-xs text-gray-custom-700">
              Último cambio: {settings.updatedBy.name} ·{" "}
              {dateFormatter.format(new Date(settings.updatedAt))}
            </p>
          )}
        </div>
        <Switch
          checked={enabled}
          disabled={isPending}
          onCheckedChange={handleCheckedChange}
          aria-label="Activar modo mantenimiento"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="maintenance-message"
          className="font-textOffice-medium text-sm text-gray-custom-900"
        >
          Mensaje para los visitantes
        </label>
        <Textarea
          id="maintenance-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAINTENANCE_MESSAGE_MAX}
          placeholder="Opcional. Si lo dejas vacío se muestra el texto por defecto."
          disabled={isPending}
          className="resize-none"
          rows={3}
        />
        <p className="text-right font-textOffice-regular text-xs text-gray-custom-700">
          {message.length}/{MAINTENANCE_MESSAGE_MAX} · se aplica al activar
        </p>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Activar el modo mantenimiento?</AlertDialogTitle>
            <AlertDialogDescription>
              Todo el sitio público (inicio, catálogo, sedes y formularios)
              dejará de estar disponible para los visitantes hasta que lo
              desactives. El panel administrativo seguirá funcionando.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => apply(true)}
              className="bg-red-custom-500 hover:bg-red-custom-700"
            >
              Activar mantenimiento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
