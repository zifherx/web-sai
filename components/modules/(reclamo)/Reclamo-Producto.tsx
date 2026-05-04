"use client"

import { ReclamoCharCounter } from "@/components/shared/Reclamo-Char-Counter"
import { ReclamoSectionCard } from "@/components/shared/Reclamo-Section-Card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CHAR_LIMITS_RECLAMO,
  LISTA_TIPO_BIEN_RECLAMOS,
  MONEDA_RECLAMO_OPTIONS,
} from "@/constants"
import { useActiveSedes } from "@/hooks"
import { cn, groupCn } from "@/lib"
import { RECLAMO_PRODUCTO_PROPS, SedeType } from "@/types"
import {
  Barcode,
  ChevronsUpDown,
  DollarSign,
  MapPin,
  MessageCircle,
  ShoppingCart,
} from "lucide-react"
import { useMemo } from "react"
import { Controller } from "react-hook-form"

export function ReclamoProducto({
  form,
  onSedeChange,
}: RECLAMO_PRODUCTO_PROPS) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form
  const { data: sedes = [], isLoading } = useActiveSedes()

  const descripcionWatch = watch("descripcionBien") ?? ""

  const sedesPorCiudad = useMemo(() => {
    const activas = sedes.filter((s) => s.isActive)
    return activas.reduce<Record<string, SedeType[]>>((acc, sede) => {
      if (!acc[sede.ciudad]) acc[sede.ciudad] = []
      acc[sede.ciudad].push(sede)
      return acc
    }, {})
  }, [sedes])

  return (
    <ReclamoSectionCard
      numero={2}
      title="Identificación del Bien Contratado"
      icon={<ShoppingCart size={20} />}
    >
      <div className="flex flex-col gap-5">
        {/* Tipo de bien */}
        <div>
          <p className="text-blue-custom-00 mb-3 font-headOffice-medium text-sm">
            Tipo de Bien
            <span className="ml-1 text-red-custom-500">*</span>
          </p>
          <Controller
            control={control}
            name="tipoBien"
            render={({ field, fieldState }) => (
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                {LISTA_TIPO_BIEN_RECLAMOS.map((opt) => (
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
          {errors.tipoBien && (
            <p className="mt-1 font-textOffice-regular text-xs text-red-custom-500">
              {errors.tipoBien.message}
            </p>
          )}
        </div>

        {/* VIN + Placa + Sede */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            control={control}
            name="vin"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-vin"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  VIN <span className="text-red-custom-500">*</span>
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
                    id="input-vin"
                    placeholder="N° VIN del vehículo"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
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
            name="placa"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-placa"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Placa <span className="text-red-custom-500">*</span>
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
                    id="input-placa"
                    placeholder="N° Placa"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
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
            name="sedeCompra"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                <FieldLabel
                  htmlFor="input-concesionario"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Sede de Compra <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={groupCn(fieldState.invalid, isSubmitting)}
                >
                  <Select
                    name={field.name}
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      setValue("sedeCompra", value)
                      setValue("sedeCodexHR", value)
                      const sede = sedes.find((s) => s.codexHR === value)
                      onSedeChange(sede ?? null)
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      id="input-concesionario"
                      aria-invalid={fieldState.invalid}
                      className={cn(
                        "w-full flex-1 cursor-pointer appearance-none border-none bg-transparent px-2 py-2 sm:px-4",
                        "font-textOffice-medium text-sm selection:border-none focus:outline-none",
                        !field.value && "text-blue-custom-700"
                      )}
                    >
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Cargando sedes..."
                            : "Selecciona una sede"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {sedes.length > 0 &&
                        Object.entries(sedesPorCiudad).map(
                          ([ciudad, items]) => (
                            <SelectGroup key={ciudad}>
                              <SelectLabel>{ciudad}</SelectLabel>
                              {items.map((sede) => (
                                <SelectItem key={sede.id} value={sede.codexHR}>
                                  {sede.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )
                        )}
                    </SelectContent>
                  </Select>

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

        {/* Moneda + Monto */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            control={control}
            name="moneda"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-moneda"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Moneda <span className="text-red-custom-500">*</span>
                </FieldLabel>
                <InputGroup
                  className={groupCn(fieldState.invalid, isSubmitting)}
                >
                  <select
                    {...field}
                    id="input-moneda"
                    className={cn(
                      "flex-1 cursor-pointer appearance-none bg-transparent px-2 py-2 sm:px-4",
                      "font-textOffice-medium text-sm focus:outline-none",
                      !field.value && "text-blue-custom-700"
                    )}
                  >
                    <option value="">Selecciona moneda</option>
                    {MONEDA_RECLAMO_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  <InputGroupAddon className="text-blue-custom-500">
                    <DollarSign size={16} />
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
            name="importeBien"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="input-importe-bien"
                  className="font-headOffice-medium text-blue-custom-500"
                >
                  Importe Reclamado
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
                  <InputGroupInput
                    {...field}
                    id="input-importe-bien"
                    type="number"
                    placeholder="0.00"
                    autoComplete="off"
                    min={0}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon className="text-blue-custom-500">
                    <DollarSign size={16} />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Descripción del bien */}
        <Controller
          control={control}
          name="descripcionBien"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-descripcionBien"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Descripción del Producto o Servicio{" "}
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
                  id="input-descripcionBien"
                  placeholder="Describe detalladamente el producto o servicio adquirido"
                  autoComplete="off"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                  maxLength={CHAR_LIMITS_RECLAMO.descripcionBien}
                  className="min-h-20"
                />
                <InputGroupAddon
                  align="inline-start"
                  className="text-blue-custom-500"
                >
                  <MessageCircle size={16} />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                <ReclamoCharCounter
                  current={descripcionWatch.length}
                  max={CHAR_LIMITS_RECLAMO.descripcionBien}
                />
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </ReclamoSectionCard>
  )
}
