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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import {
  useCreatePortada,
  useUpdatePortada,
} from "@/hooks/mutations/use-portada.mutations"
import { cn, toastError, toastSuccess } from "@/lib"
import { UploadButton } from "@/lib/uploadthing"
import {
  portadaFormSchema,
  PortadaFormValues,
} from "@/lib/validations/portada.schema"
import { PORTADA_FORM_DIALOG_PROPS } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Barcode, ImageIcon, Tag, X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

export function PortadaFormDialog({
  onOpenChange,
  open,
  portada,
}: PORTADA_FORM_DIALOG_PROPS) {
  const isEditing = Boolean(portada)
  const createMutation = useCreatePortada()
  const updateMutation = useUpdatePortada()
  const isPending = createMutation.isPending || updateMutation.isPending

  const form = useForm<PortadaFormValues>({
    resolver: zodResolver(portadaFormSchema),
    defaultValues: { name: "", slug: "", imageUrl: "", isActive: true },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: portada?.name ?? "",
        slug: portada?.slug ?? "",
        imageUrl: portada?.imageUrl ?? "",
        isActive: portada?.isActive ?? true,
      })
    }
  }, [open, portada, form])

  const onSubmit = (values: PortadaFormValues) => {
    const payload = {
      name: values.name,
      slug: values.slug ? values.slug : undefined,
      imageUrl: values.imageUrl,
      isActive: values.isActive,
    }

    if (isEditing && portada) {
      updateMutation.mutate(
        { id: portada.id, payload },
        { onSuccess: () => onOpenChange(false) }
      )
    } else {
      createMutation.mutate(payload, { onSuccess: () => onOpenChange(false) })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar portada" : "Nueva portada"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza la información de la portada."
              : "Completa los datos para publicar una nueva portada."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-name"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Nombre
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    form.formState.isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-name"
                    placeholder="Jhonny Bravo"
                    type="text"
                    autoComplete="off"
                    disabled={form.formState.isSubmitting}
                  />
                  <InputGroupAddon>
                    <Tag size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-slug"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Slug
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    form.formState.isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-slug"
                    placeholder="portada-1"
                    type="text"
                    autoComplete="off"
                    disabled={form.formState.isSubmitting}
                  />
                  <InputGroupAddon>
                    <Barcode size={16} />
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Si lo dejas vacío, se genera a partir del nombre.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="imageUrl"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="font-headOffice-medium text-blue-custom-500">
                  Imagen
                </FieldLabel>

                {field.value ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-blue-custom-500 bg-white">
                    <Image
                      src={field.value}
                      alt="Preview de portada"
                      fill
                      className="object-cover"
                    />
                    {!form.formState.isSubmitting && (
                      <button
                        type="button"
                        onClick={() => field.onChange("")}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border bg-background/80 shadow-sm hover:bg-background"
                        aria-label="Quitar imagen"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-blue-custom-500 bg-white py-8",
                      form.formState.isSubmitting
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    )}
                  >
                    <ImageIcon size={24} className="text-blue-custom-500/60" />
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("Respuesta Uploathing: ", res)
                        const url = res?.[0].ufsUrl ?? res?.[0].url
                        if (url) {
                          field.onChange(url)
                          toastSuccess.generic(
                            `Imagen cargada`,
                            `La imagen se subió correctamente vía uploadthing`
                          )
                        }
                      }}
                      onUploadError={(error) => {
                        toastError.generic(
                          `Error al subir la imagen: ${error.message}`
                        )
                      }}
                    />
                  </div>
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="isActive"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex flex-row items-center justify-between rounded-lg border border-blue-custom-500 bg-white p-3">
                  <div className="space-y-0.5">
                    <FieldLabel
                      htmlFor="input-switch-isActive"
                      className="font-headOffice-medium text-blue-custom-500"
                    >
                      Portada Activa
                    </FieldLabel>
                    <FieldDescription>
                      Visible en el sitio público inmediatamente
                    </FieldDescription>
                  </div>
                  <Switch
                    id="input-switch-isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear Portada"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
