"use client"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  INTENCION_COMPRA_OPTIONS,
  Step4Data,
  Step4Schema,
  TIPO_DOCUMENTO_OPTIONS,
  TRATAMIENTO_DATOS_OFERTAS_COMERCIALES,
} from "@/constants"
import { cn, groupCn } from "@/lib/"
import { STEP4_CONTACTO_PROPS } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ChevronLeft,
  ChevronsUpDown,
  FileText,
  Hash,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"

export function Step4Contacto({
  onBack,
  onSubmit,
  resumen,
  isLoading = false,
}: STEP4_CONTACTO_PROPS) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<Step4Data>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      aceptaPolitica: false,
      autorizaMarketing: false,
    },
  })

  const isDisabled = isLoading || isSubmitting

  return (
    <div className="p-4 md:p-8">
      <div className="rounded-2xl bg-gray-custom-100 px-2 py-4 md:px-5 md:py-8">
        <button
          onClick={onBack}
          disabled={isDisabled}
          className="mb-4 flex cursor-pointer items-center gap-1 font-textOffice-regular text-sm text-gray-custom-700 transition-colors hover:text-sky-custom-500"
        >
          <ChevronLeft size={14} /> Cambiar concesionario
        </button>

        <h2 className="font-headOffice-bold text-xl tracking-wide text-sky-custom-500 md:text-4xl md:tracking-wider">
          Completa tus datos
        </h2>
        <p className="mt-1 font-textOffice-regular text-lg leading-5 tracking-tight text-gray-custom-900 md:text-xl md:leading-6">
          Últimos detalles para contactarte y procesar tu solicitud
        </p>
      </div>

      {/* Resumen de selección */}
      <div className="mt-4 flex gap-4 rounded-xl bg-sky-custom-50 px-5 py-3 font-textOffice-regular text-xs text-gray-custom-700">
        <span>
          🏷️ <b>{resumen.marcaNombre}</b>
        </span>
        <span>
          🚗 <b>{resumen.vehiculoNombre}</b>
        </span>
        <span>
          📍 <b>{resumen.sedeNombre}</b>
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <FieldGroup>
          {/* Nombres y Apellidos */}
          <Controller
            control={control}
            name="nombres"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-input-nombres"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Nombres y Apellidos
                  <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isDisabled ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <InputGroupInput
                    {...field}
                    id="form-input-nombres"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nombres"
                    autoComplete="off"
                    disabled={isDisabled}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    className={groupCn(fieldState.invalid, isDisabled)}
                  >
                    <select
                      {...field}
                      id="input-tipo-doc"
                      disabled={isDisabled}
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        "flex-1 cursor-pointer appearance-none bg-transparent px-4 py-2",
                        "font-textOffice-regular text-sm focus:outline-none",
                        !field.value && "text-gray-custom-500"
                      )}
                    >
                      <option value="">Tipo de Documento</option>
                      {TIPO_DOCUMENTO_OPTIONS.map((opt) => (
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
                      isDisabled ? "cursor-not-allowed opacity-50" : ""
                    )}
                  >
                    <InputGroupInput
                      {...field}
                      id="input-num-doc"
                      placeholder="Número de Documento"
                      disabled={isDisabled}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      minLength={8}
                      maxLength={15}
                    />
                    <InputGroupAddon className="text-blue-custom-500">
                      <Hash size={16} />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="celular"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="input-celular"
                    className="font-headOffice-medium text-blue-custom-500"
                  >
                    Celular <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={cn(
                      "h-12 rounded-lg border border-blue-custom-500 bg-white",
                      "text-blue-custom-500",
                      "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                      isDisabled ? "cursor-not-allowed opacity-50" : ""
                    )}
                  >
                    <InputGroupInput
                      {...field}
                      id="input-celular"
                      placeholder="9XXXXXXXX"
                      type="tel"
                      autoComplete="tel"
                      maxLength={9}
                      disabled={isDisabled}
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

            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="input-email"
                    className="font-headOffice-medium text-blue-custom-500"
                  >
                    E-mail <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={cn(
                      "h-12 rounded-lg border border-blue-custom-500 bg-white",
                      "text-blue-custom-500",
                      "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                      isDisabled ? "cursor-not-allowed opacity-50" : ""
                    )}
                  >
                    <InputGroupInput
                      {...field}
                      id="input-email"
                      placeholder="E-mail"
                      type="email"
                      autoComplete="off"
                      disabled={isDisabled}
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
          </div>

          {/* ── Intención de compra ── */}
          <Controller
            control={control}
            name="intencionCompra"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-intencion"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Intención de compra{" "}
                  <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={cn(
                    "h-12 rounded-lg border border-blue-custom-500 bg-white",
                    "text-blue-custom-500",
                    "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                    isDisabled ? "cursor-not-allowed opacity-50" : ""
                  )}
                >
                  <select
                    {...field}
                    id="input-intencion"
                    disabled={isDisabled}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "flex-1 appearance-none bg-transparent px-4 py-2",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700"
                    )}
                  >
                    <option value="">¿Cuándo planeas comprar?</option>
                    {INTENCION_COMPRA_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
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

          {/* ── Checkboxes legales ── */}
          <div className="flex flex-col gap-3 pt-1">
            <Controller
              control={control}
              name="aceptaPolitica"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isDisabled}
                      aria-invalid={fieldState.invalid}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-sky-custom-500 disabled:opacity-50"
                    />
                    <span className="text-justify font-textOffice-regular text-xs leading-relaxed text-gray-custom-700">
                      Mediante el envío del formulario declaro que he leído la
                      autorización y acepta la{" "}
                      <a
                        href="/legal/politica-datos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-sky-custom-500"
                      >
                        Política de Protección de Datos Personales
                      </a>{" "}
                      y el tratamiento de mis datos personales a Automotores
                      Inka. Debe aceptar el tratamiento de Datos Personales.{" "}
                      <span className="text-red-custom-500">*</span>
                    </span>
                  </label>
                  {fieldState.invalid && (
                    <p className="pl-6 font-textOffice-regular text-xs text-red-custom-500">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex cursor-pointer items-start gap-2.5">
              <span className="text-justify font-textOffice-bold text-xs leading-relaxed text-gray-custom-900">
                Automotores Inka podrá enviarme información sobre sus
                promociones y ofertas comerciales de sus productos y servicios,
                conforme a la Cláusula de Datos Personales.
              </span>
            </div>

            {/* Opciones de radio de marketing */}
            <div className="flex flex-col gap-2 pl-3">
              {TRATAMIENTO_DATOS_OFERTAS_COMERCIALES.map((opt) => (
                <label
                  key={String(opt.value)}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="autorizaMarketing-radio"
                    value={String(opt.value)}
                    disabled={isDisabled}
                    onChange={() => setValue("autorizaMarketing", opt.value)}
                    className="h-4 w-4 accent-sky-custom-500 disabled:opacity-50"
                  />
                  <span className="font-textOffice-regular text-xs text-gray-custom-700">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl py-4",
              "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
              "transition-all duration-200 hover:bg-sky-custom-700 active:scale-[0.98]",
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {isDisabled ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando solicitud...
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" />
                Enviar Solicitud
              </>
            )}
          </button>
        </FieldGroup>
      </form>
    </div>
  )
}
