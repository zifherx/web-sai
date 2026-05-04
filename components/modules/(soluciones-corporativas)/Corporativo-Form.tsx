"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  CORPORATIVO_PERIODO_OPTIONS,
  CORPORATIVO_SECTOR_OPTIONS,
  CorporativoData,
  CorporativoSchema,
} from "@/constants"
import { useActiveMarcas } from "@/hooks"
import { cn, groupCn, toastError, toastSuccess } from "@/lib"
import { CORPORATIVO_FORM_PROPS } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Barcode,
  Building,
  CheckLine,
  ChevronsUpDown,
  Handshake,
  Mail,
  Phone,
  Send,
  Shield,
  ShoppingCart,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { useCrearLeadCorporativo } from "../../../hooks/mutations/use-lead-corporativo.mutations"

export function CorporativoForm({ formulario }: CORPORATIVO_FORM_PROPS) {
  const router = useRouter()
  const { heading, legal } = formulario
  const { data: marcas } = useActiveMarcas()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CorporativoData>({
    resolver: zodResolver(CorporativoSchema),
    defaultValues: {
      aceptaPolitica: false,
    },
  })

  const { mutate: crearLead, isPending } = useCrearLeadCorporativo({
    onSuccess: () => {
      toastSuccess.corporativo()
      router.push(`/comercial/soluciones-corporativas/gracias`)
    },
    onError: (err) => {
      toastError.corporativo(err.message)
      console.error("[CorporativoForm]", err.message)
    },
  })

  const isDisabled = isPending || isSubmitting

  const onSubmit = (data: CorporativoData) => {
    crearLead({
      nombres: data.nombres,
      apellidos: "", // el form corporativo no tiene apellidos
      correoElectronico: data.email,
      celular: data.celular,
      dni: data.dni,
      razonSocial: "",
      ruc: data.ruc ?? "",
      marcaText: data.marca,
      ciudad: "",
      intencionCompra: data.periodoCompra,
      sector: data.sector,
    })
  }

  return (
    <section className="w-full bg-sky-custom-50 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <h2 className="mb-10 text-center font-headOffice-bold text-3xl text-sky-custom-500 sm:text-6xl">
          {heading}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Nombres */}
          <Controller
            control={control}
            name="nombres"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-input-nombres"
                  className="font-headOffice-medium text-base text-blue-custom-500"
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
                    placeholder="Nombres"
                    aria-invalid={fieldState.invalid}
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

          {/* DNI + Pase Fiscal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="dni"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-dni"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    DNI
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
                      id="form-input-dni"
                      placeholder="DNI"
                      autoComplete="off"
                      maxLength={8}
                      disabled={isDisabled}
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
            <Controller
              control={control}
              name="paseFiscal"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-razon-social"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    Razón Social
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
                      id="form-input-razon-social"
                      placeholder="Razón Social"
                      autoComplete="off"
                      disabled={isDisabled}
                    />

                    <InputGroupAddon className="text-blue-custom-500">
                      <Building size={16} />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* RUC + Marca */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="ruc"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-ruc"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    RUC
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
                      id="form-input-ruc"
                      placeholder="RUC"
                      autoComplete="off"
                      maxLength={11}
                      disabled={isDisabled}
                    />

                    <InputGroupAddon className="text-blue-custom-500">
                      <CheckLine size={16} />
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
              name="marca"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-marca"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    Marca <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={groupCn(fieldState.invalid, isDisabled)}
                  >
                    <select
                      {...field}
                      id="form-input-marca"
                      disabled={isDisabled}
                      className={cn(
                        "flex-1 cursor-pointer appearance-none bg-transparent px-4 py-2",
                        "font-textOffice-regular text-sm focus:outline-none",
                        !field.value && "text-blue-custom-500"
                      )}
                    >
                      <option value="">Marca</option>
                      {marcas &&
                        marcas.map((m) => (
                          <option key={m.id} value={m.slug}>
                            {m.name}
                          </option>
                        ))}
                    </select>
                    <InputGroupAddon className="text-blue-custom-500">
                      <Shield size={16} />
                    </InputGroupAddon>
                    <InputGroupAddon
                      className="text-blue-custom-500"
                      align="inline-end"
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
          </div>

          {/* Celular + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="celular"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-celular"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    Celular
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
                      id="form-input-celular"
                      placeholder="N° Celular"
                      autoComplete="off"
                      pattern="[0-9]*"
                      maxLength={9}
                      disabled={isDisabled}
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
                    htmlFor="form-input-email"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    E-mail
                    <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={cn(
                      "h-12 rounded-lg border border-blue-custom-500 bg-white",
                      "text-base text-blue-custom-500",
                      "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                      isDisabled ? "cursor-not-allowed opacity-50" : "",
                      "placeholder:text-base placeholder:text-blue-custom-500"
                    )}
                  >
                    <InputGroupInput
                      {...field}
                      id="form-input-email"
                      placeholder="E-mail"
                      autoComplete="off"
                      type="email"
                      disabled={isDisabled}
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

          {/* Sector + Período de Compra */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="sector"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-sector"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    Sector <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={groupCn(fieldState.invalid, isDisabled)}
                  >
                    <select
                      {...field}
                      id="form-input-sector"
                      disabled={isDisabled}
                      className={cn(
                        "flex-1 cursor-pointer appearance-none bg-transparent px-4 py-2",
                        "font-textOffice-regular text-sm focus:outline-none",
                        !field.value && "text-blue-custom-500"
                      )}
                    >
                      <option value="">Seleccione un sector</option>
                      {CORPORATIVO_SECTOR_OPTIONS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <InputGroupAddon className="text-blue-custom-500">
                      <Handshake size={16} />
                    </InputGroupAddon>
                    <InputGroupAddon
                      className="text-blue-custom-500"
                      align="inline-end"
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
              name="periodoCompra"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-input-compra"
                    className="font-headOffice-medium text-base text-blue-custom-500"
                  >
                    Periodo de Compra{" "}
                    <span className="text-red-custom-500">*</span>
                  </FieldLabel>
                  <InputGroup
                    className={groupCn(fieldState.invalid, isDisabled)}
                  >
                    <select
                      {...field}
                      id="form-input-compra"
                      disabled={isDisabled}
                      className={cn(
                        "flex-1 cursor-pointer appearance-none bg-transparent px-4 py-2",
                        "font-textOffice-regular text-sm focus:outline-none",
                        !field.value && "text-blue-custom-500"
                      )}
                    >
                      <option value="">Seleccione un periodo de compra</option>
                      {CORPORATIVO_PERIODO_OPTIONS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <InputGroupAddon className="text-blue-custom-500">
                      <ShoppingCart size={16} />
                    </InputGroupAddon>
                    <InputGroupAddon
                      className="text-blue-custom-500"
                      align="inline-end"
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
          </div>

          {/* Política */}
          <Controller
            control={control}
            name="aceptaPolitica"
            render={({ field, fieldState }) => (
              <div className="mt-3 flex flex-col gap-1">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-sky-custom-500"
                  />
                  <span className="font-textOffice-regular text-xs leading-relaxed text-gray-custom-700">
                    {legal} <span className="text-red-custom-500">*</span>
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

          {/* Submit */}
          <Button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-12 py-6 sm:w-fit",
              "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
              "transition-all duration-200 hover:bg-sky-custom-700 active:scale-105",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {isDisabled ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{" "}
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} /> Enviar Solicitud
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
