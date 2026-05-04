"use client"

import { ReclamoCharCounter } from "@/components/shared/Reclamo-Char-Counter"
import { ReclamoSectionCard } from "@/components/shared/Reclamo-Section-Card"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  CHAR_LIMITS_RECLAMO,
  LISTA_TIPO_SOLICITUD_RECLAMOS,
  NOTAS_LEGALES_RECLAMOS,
} from "@/constants"
import { cn } from "@/lib"
import { RECLAMO_DETALLE_PROPS } from "@/types"
import { CheckCircle, FileText, Loader2, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Controller } from "react-hook-form"

export function ReclamoDetalle({ form, isLoading }: RECLAMO_DETALLE_PROPS) {
  const {
    control,
    watch,
    formState: { isSubmitting },
  } = form
  const detalle = watch("detalleSolicitud") ?? ""
  const pedido = watch("pedidoSolicitud") ?? ""

  return (
    <ReclamoSectionCard
      numero={3}
      title="Detalle de la Reclamación y/o Pedido del Consumidor"
      icon={<FileText size={20} />}
    >
      <div className="flex flex-col gap-5">
        {/* Tipo de solicitud */}
        <div>
          <p className="mb-3 font-headOffice-medium text-sm text-gray-custom-900">
            Tipo de Solicitud
            <span className="ml-1 text-red-custom-500">*</span>
          </p>
          <Controller
            control={control}
            name="tipoSolicitud"
            render={({ field, fieldState }) => (
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                {LISTA_TIPO_SOLICITUD_RECLAMOS.map((opt) => (
                  <FieldLabel
                    key={opt.value}
                    htmlFor={`input-radiogroup-${opt.value}`}
                    className="font-headOffice-medium text-blue-custom-500"
                  >
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="cursor-pointer"
                    >
                      <FieldContent>{opt.label}</FieldContent>
                      <RadioGroupItem
                        value={opt.value}
                        id={`input-radiogroup-${opt.value}`}
                        aria-invalid={fieldState.invalid}
                        className="text-blue-custom-700 data-[state=selected]:text-blue-custom-700"
                      />
                    </Field>
                  </FieldLabel>
                ))}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </RadioGroup>
            )}
          />
        </div>

        {/* Detalle de la solicitud */}
        <Controller
          control={control}
          name="detalleSolicitud"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-detalleSolicitud"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Detalle de la Solicitud{" "}
                <span className="text-red-custom-500">*</span>
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
                  id="input-detalleSolicitud"
                  placeholder="Describe detalladamente tu reclamo o queja, incluyendo fechas, circunstancias y cualquier información relevante..."
                  autoComplete="off"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                  maxLength={CHAR_LIMITS_RECLAMO.detalleSolicitud}
                  className="min-h-20"
                />
                <InputGroupAddon
                  align="inline-start"
                  className="text-blue-custom-500"
                >
                  <MessageCircle size={16} />
                </InputGroupAddon>
              </InputGroup>
              <div>
                <ReclamoCharCounter
                  current={detalle.length}
                  max={CHAR_LIMITS_RECLAMO.detalleSolicitud}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Pedido del consumidor */}
        <Controller
          control={control}
          name="pedidoSolicitud"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-pedidoSolicitud"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Pedido del Consumidor{" "}
                <span className="text-red-custom-500">*</span>
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
                  id="input-pedidoSolicitud"
                  placeholder="Especifica que solicitas como solución a tu reclamo o queja (reembolso, cambio, reparación, disculpas, etc)..."
                  autoComplete="off"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                  maxLength={CHAR_LIMITS_RECLAMO.pedidoSolicitud}
                  className="min-h-20"
                />
                <InputGroupAddon
                  align="inline-start"
                  className="text-blue-custom-500"
                >
                  <MessageCircle size={16} />
                </InputGroupAddon>
              </InputGroup>
              <div>
                <ReclamoCharCounter
                  current={pedido.length}
                  max={CHAR_LIMITS_RECLAMO.pedidoSolicitud}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Divider */}
        <div className="h-px w-full bg-gray-custom-300/40" />

        {/* Checkbox de conformidad */}
        <Controller
          control={control}
          name="isConforme"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label className="border-sky-custom-200 flex cursor-pointer items-start gap-3 rounded-xl border bg-sky-custom-50 p-4">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-sky-custom-500"
                />
                <div>
                  <p className="font-headOffice-medium text-sm text-gray-custom-900">
                    Acepto los términos y condiciones del presente reclamo
                  </p>
                  <p className="mt-1 font-textOffice-regular text-xs text-gray-custom-900">
                    Al marcar esta casilla, confirmo que la información
                    proporcionada es veraz y acepto los{" "}
                    <Link
                      href="/legal/terminos-condiciones"
                      target="_blank"
                      className="text-sky-custom-500 underline hover:text-sky-custom-700"
                    >
                      Términos de Servicio
                    </Link>{" "}
                    y la{" "}
                    <Link
                      href="/legal/copyright"
                      target="_blank"
                      className="text-sky-custom-500 underline hover:text-sky-custom-700"
                    >
                      Política de Privacidad
                    </Link>
                    .
                  </p>
                </div>
              </label>
              {fieldState.invalid && (
                <p className="pl-1 font-textOffice-regular text-xs text-red-custom-500">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Notas legales */}
        <div className="flex flex-col gap-2">
          {NOTAS_LEGALES_RECLAMOS.map((nota, i) => (
            <p
              key={i}
              className="font-textOffice-regular text-xs leading-relaxed text-gray-custom-900"
            >
              * {nota}
            </p>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl py-4",
            "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
            "transition-all duration-200 hover:bg-sky-custom-700 active:scale-[0.98]",
            "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Enviando reclamo...
            </>
          ) : (
            <>
              <CheckCircle size={18} /> Generar Reclamo
            </>
          )}
        </button>
      </div>
    </ReclamoSectionCard>
  )
}
