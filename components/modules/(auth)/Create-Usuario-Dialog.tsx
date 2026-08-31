"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { useCreateUsuario } from "@/hooks/mutations/use-usuarios.mutations"
import { Tag } from "lucide-react"
import { cn, groupCn } from "../../../lib"
import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { Field, FieldError, FieldLabel } from "../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group"

const createUsuarioFormSchema = z.object({
  email: z.email("Ingresa un correo válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  nombre: z.string().min(2, "Ingresa el nombre completo"),
  rol: z.enum(["admin", "editor", "sede"]),
})

type CreateUsuarioFormValues = z.infer<typeof createUsuarioFormSchema>

export function CreateUsuarioDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const createUsuario = useCreateUsuario()

  const form = useForm<CreateUsuarioFormValues>({
    resolver: zodResolver(createUsuarioFormSchema),
    defaultValues: { email: "", password: "", nombre: "", rol: "editor" },
  })

  function onSubmit(values: CreateUsuarioFormValues) {
    createUsuario.mutate(values, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo usuario</DialogTitle>
          <DialogDescription>
            El usuario podrá iniciar sesión de inmediato con estas credenciales.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="nombre"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-nombre"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Nombre completo
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
                    id="input-nombre"
                    placeholder="Don Omar"
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
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Correo</FieldLabel>
                <InputGroup>
                  <InputGroupInput type="email" {...field} />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Contraseña temporal</FieldLabel>
                <InputGroup>
                  <InputGroupInput type="password" {...field} />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="rol"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-rol"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Rol
                </FieldLabel>
                <InputGroup
                  className={groupCn(
                    fieldState.invalid,
                    form.formState.isSubmitting
                  )}
                >
                  <select
                    {...field}
                    id="input-rol"
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "flex-1 cursor-pointer appearance-none bg-transparent px-2 py-2 sm:px-4",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700"
                    )}
                  >
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="sede">Sede</option>
                  </select>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={createUsuario.isPending}>
              {createUsuario.isPending ? "Creando..." : "Crear usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
