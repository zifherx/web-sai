"use client"

import { BreadcrumbVehiculo } from "@/components/shared/Breadcrumb-Vehiculo"
import { ColorPicker } from "@/components/shared/Color-Picker"
import { RUTA_TEST_DRIVE, TIPO_CAMBIO } from "@/constants"

import { cn, precioFormateadoPEN, precioFormateadoUSD } from "@/lib"
import { VEHICULO_HERO_PROPS } from "@/types"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function VehiculoHero({
  colorActivo,
  colores,
  imagenActiva,
  marcaSlug,
  onColorChange,
  vehiculo,
  marca,
}: VEHICULO_HERO_PROPS) {
  const precioBaseUSD = precioFormateadoUSD(vehiculo.precioBase)
  const precioBasePEN = precioFormateadoPEN(
    vehiculo.precioBase * Number(TIPO_CAMBIO)
  )
  const marcaNombre = marca?.name ?? marcaSlug.toUpperCase()
  const cotizarParams = new URLSearchParams({
    marcaId: marca?.id ?? "",
    marcaSlug: marcaSlug,
    marcaIdNovaly: marca?.idNovaly.toString() ?? "",
    marcaNombre: marcaNombre,
    vehiculoId: vehiculo.id,
    vehiculoSlug: vehiculo.slug,
    vehiculoNombre: vehiculo.name,
    precioBase: String(vehiculo.precioBase),
  })

  const cotizarHref = `/comercial/financiamiento?${cotizarParams.toString()}`

  return (
    <section className="w-full bg-sky-custom-50 py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ── Breadcrumb ── */}
        <BreadcrumbVehiculo
          marca={marcaNombre}
          marcaSlug={marcaSlug}
          modelo={vehiculo.name}
        />

        {/* ── Layout: info izquierda | imagen derecha ── */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            {/* Nombre y marca */}
            <div>
              <h1 className="font-headOffice-bold text-4xl leading-tight text-blue-custom-500 md:text-5xl lg:text-6xl">
                {vehiculo.name}
              </h1>
              <p className="mt-2 font-headOffice-bold text-xl tracking-widest text-gray-custom-700 uppercase">
                {marcaNombre}
              </p>
            </div>

            {/* Precios USD | PEN */}
            <div className="flex items-baseline gap-4">
              <span className="font-headOffice-bold text-xl text-gray-custom-900 md:text-4xl">
                {precioBaseUSD}
              </span>
              <span className="font-headOffice-regular text-xl text-gray-custom-700">
                |
              </span>
              <span className="font-headOffice-bold text-xl text-gray-custom-900 md:text-4xl">
                {precioBasePEN}
              </span>
            </div>

            {/* CTAs */}
            <div className="xs:flex-row flex flex-col gap-3">
              <Link
                href={cotizarHref}
                className={cn(
                  "flex max-w-60 items-center justify-center gap-2 rounded-xl",
                  "bg-sky-custom-500 px-8 py-4",
                  "font-headOffice-bold text-sm tracking-widest text-white uppercase",
                  "transition-all duration-200 hover:bg-sky-custom-700",
                  "focus-visible:outline focus-visible:outline-sky-custom-300"
                )}
              >
                Cotiza Ahora
                <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
              </Link>

              <Link
                href={RUTA_TEST_DRIVE}
                target="_blank"
                className={cn(
                  "flex max-w-60 items-center justify-center gap-2 rounded-xl",
                  "border-2 border-sky-custom-500 px-8 py-4",
                  "font-headOffice-bold text-sm tracking-widest text-sky-custom-500 uppercase",
                  "transition-all duration-200 hover:border-blue-custom-500 hover:bg-blue-custom-500 hover:text-white",
                  "focus-visible:outline focus-visible:outline-sky-custom-300"
                )}
              >
                Drive Test
                <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
              </Link>
            </div>

            {/* Selector de colores */}
            {colores.length > 0 && (
              <div className="flex flex-col justify-start gap-5 md:flex-row md:items-center">
                <p className="font-textOffice-regular text-base tracking-wider text-gray-custom-900">
                  Elige el color que va contigo:
                </p>
                <ColorPicker
                  colores={colores}
                  colorActivo={colorActivo}
                  onColorChange={onColorChange}
                />
              </div>
            )}
          </div>

          {/* Columna derecha — imagen del vehículo */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-75 w-full md:h-100 lg:h-115">
              <Image
                src={imagenActiva || "/images/placeholder-vehicle.png"}
                alt={`${vehiculo.name} — ${colorActivo?.label ?? "vista principal"}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center drop-shadow-xl transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
