import { ReclamoSectionCard } from "@/components/shared/Reclamo-Section-Card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  LISTA_DEPARTAMENOS_RECLAMOS,
  TIPO_DOCUMENTO_RECLAMO_OPTIONS,
} from "@/constants"
import { cn, groupCn } from "@/lib"
import { IDepartamento, RECLAMO_CONSUMER_PROPS } from "@/types"
import {
  AlertCircle,
  Barcode,
  ChevronsUpDown,
  FileText,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react"
import { useState } from "react"
import { Controller } from "react-hook-form"

export function ReclamoConsumer({ form }: RECLAMO_CONSUMER_PROPS) {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form
  const [departamentoSeleccionado, setDepartamentoSeleccionado] =
    useState<IDepartamento | null>(null)

  // const tipoDocumento = watch("tipoDocumento")
  const hasContactError = (errors as any).contactInfo

  return (
    <ReclamoSectionCard
      numero={1}
      title="Identificación del Consumidor Reclamante"
      icon={<User size={20} />}
    >
      <div className="flex flex-col gap-5">
        {/* Tipo + Número documento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="tipoDocumento"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-tipo-doc"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Tipo de Documento{" "}
                  <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={groupCn(fieldState.invalid, isSubmitting)}
                >
                  <select
                    {...field}
                    id="input-tipo-doc"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "flex-1 cursor-pointer appearance-none bg-transparent px-2 py-2 sm:px-4",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700"
                    )}
                  >
                    <option value="">Selecciona un documento</option>
                    {TIPO_DOCUMENTO_RECLAMO_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <InputGroupAddon className="text-blue-custom-500">
                    <FileText size={16} />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    className="text-blue-custom-500"
                  >
                    <ChevronsUpDown size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="numeroDocumento"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-num-doc"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Número de Documento{" "}
                  <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                  aria-invalid={fieldState.invalid}
                >
                  <InputGroupInput
                    {...field}
                    id="input-num-doc"
                    placeholder="Número de Documento"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    minLength={8}
                    maxLength={15}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <Barcode size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Nombres + Apellidos */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="nombres"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-nombres"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Nombres <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-nombres"
                    placeholder="Ingresa tus nombres completos"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <User size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="apellidos"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-apellidos"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Apellidos <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-apellidos"
                    placeholder="Ingresa tus apellidos completos"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <User size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Alerta de contacto */}
        <div className="border-sky-custom-200 flex items-start gap-3 rounded-xl border bg-sky-custom-50 px-4 py-3">
          <Info size={18} className="mt-0.5 shrink-0 text-sky-custom-500" />
          <p className="font-textOffice-regular text-sm text-sky-custom-700">
            <strong>Información de contacto:</strong> Completa al menos uno:
            email, celular o dirección.
          </p>
        </div>

        {hasContactError && (
          <div className="border-red-custom-300 bg-red-custom-50 flex items-center gap-2 rounded-xl border px-4 py-3">
            <AlertCircle size={16} className="shrink-0 text-red-custom-500" />
            <p className="font-textOffice-regular text-sm text-red-custom-500">
              {(errors as any).contactInfo?.message}
            </p>
          </div>
        )}

        {/* Email + Celular */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-email"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  E-mail{" "}
                  <span className="text-gray-custom-700">(Opcional)</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-email"
                    placeholder="ejemplo@dominio.com"
                    type="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <Mail size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="celular"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-celular"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Celular{" "}
                  <span className="text-gray-custom-700">(Opcional)</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-celular"
                    placeholder="N° Celular"
                    type="tel"
                    autoComplete="tel"
                    maxLength={9}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <Phone size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Departamento + Provincia + Distrito */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            control={control}
            name="departamento"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-departamento"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Departamento
                </FieldLabel>
                <InputGroup
                  className={groupCn(fieldState.invalid, isSubmitting)}
                >
                  <select
                    {...field}
                    id="input-departamento"
                    onChange={(e) => {
                      field.onChange(e)
                      const d = LISTA_DEPARTAMENOS_RECLAMOS.find(
                        (dep) => dep.value === e.target.value
                      )
                      setDepartamentoSeleccionado(d ?? null)
                      setValue("provincia", "")
                    }}
                    className={cn(
                      "flex-1 cursor-pointer appearance-none bg-transparent px-2 py-2 sm:px-4",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700"
                    )}
                  >
                    <option value="">Selecciona departamento</option>
                    {LISTA_DEPARTAMENOS_RECLAMOS.map(({ id, name, value }) => (
                      <option key={id} value={value}>
                        {name}
                      </option>
                    ))}
                  </select>

                  <InputGroupAddon className="text-blue-custom-500">
                    <MapPin size={16} />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    className="text-blue-custom-500"
                  >
                    <ChevronsUpDown size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="provincia"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-provincia"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Provincia
                </FieldLabel>
                <InputGroup
                  className={groupCn(fieldState.invalid, isSubmitting)}
                >
                  <select
                    {...field}
                    disabled={!departamentoSeleccionado}
                    className={cn(
                      "flex-1 cursor-pointer appearance-none bg-transparent px-2 py-2 sm:px-4",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700",
                      !departamentoSeleccionado &&
                        "cursor-not-allowed opacity-50"
                    )}
                  >
                    <option value="">Selecciona provincia</option>
                    {departamentoSeleccionado?.provincias.map(
                      ({ id, name, value }) => (
                        <option key={id} value={value}>
                          {name}
                        </option>
                      )
                    )}
                  </select>

                  <InputGroupAddon className="text-blue-custom-500">
                    <MapPin size={16} />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    className="text-blue-custom-500"
                  >
                    <ChevronsUpDown size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="distrito"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-distrito"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Distrito
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isSubmitting ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="input-distrito"
                    placeholder="Escribe tu distrito"
                    autoComplete="off"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <MapPin size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Dirección */}
        <Controller
          control={control}
          name="direccion"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-direccion"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Dirección{" "}
                <span className="text-gray-custom-700">(Opcional)</span>
              </FieldLabel>
              <InputGroup
                className={cn(
                  "h-12 rounded-lg border border-blue-custom-500 bg-white",
                  "text-blue-custom-500",
                  "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                )}
              >
                <InputGroupTextarea
                  {...field}
                  id="input-direccion"
                  placeholder="Av./Jr./Calle, N°, Urb., Referencia"
                  autoComplete="off"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                />
                <InputGroupAddon className="text-blue-custom-500">
                  <MessageCircle size={16} />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </ReclamoSectionCard>
  )
}
