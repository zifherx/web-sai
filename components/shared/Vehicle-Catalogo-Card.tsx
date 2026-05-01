import { TIPO_CAMBIO } from "@/constants/catalogo.constants"
import {
  precioFormateadoPEN,
  precioFormateadoUSD,
} from "@/lib/global.functions"
import { cn } from "@/lib/utils"
import { CATALOGO_VEHICULO_CARD_PROPS } from "@/types/catalogo.types"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function VehicleCatalogoCard({
  vehiculo,
  marcaNombre,
  marcaSlug,
}: CATALOGO_VEHICULO_CARD_PROPS) {
  const { slug, precioBase, imageUrl, name, isNuevo, isEntrega48H, isGLP } =
    vehiculo
  const href = `/catalogo/${marcaSlug}/${slug}`
  const precioUSD = precioFormateadoUSD(precioBase)
  const precioPEN = precioFormateadoPEN(precioBase * Number(TIPO_CAMBIO))

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden",
        "rounded-xl bg-white",
        "border border-gray-custom-300/40",
        "shadow-sm transition-all duration-300",
        "hover:border-sky-custom-200 hover:shadow-lg"
      )}
    >
      {/* Imagen con badges */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-custom-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "object-contain object-center p-4",
            "transition-transform duration-500 ease-out",
            "group-hover:scale-110"
          )}
          draggable={false}
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isNuevo && (
            <span className="rounded-md bg-red-custom-500 px-2.5 py-1 font-headOffice-bold text-[11px] tracking-wider text-white uppercase">
              Nuevo
            </span>
          )}

          {isEntrega48H && (
            <span className="rounded-md bg-yellow-custom-500 px-2.5 py-1 font-headOffice-bold text-[11px] tracking-wider text-gray-custom-900 uppercase">
              48H
            </span>
          )}
        </div>

        {isGLP && (
          <div className="absolute top-3 right-3">
            <span className="rounded-md bg-green-custom-500 px-2.5 py-1 font-headOffice-bold text-[11px] tracking-wider text-white uppercase">
              GLP
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Nombre y Marca */}
        <div>
          <Link href={href}>
            <h3 className="font-headOffice-bold text-3xl leading-tight text-blue-custom-300 transition-colors group-hover:text-sky-custom-500">
              {name}
            </h3>
          </Link>
          {marcaNombre && (
            <p className="mt-0.5 font-headOffice-medium text-xl tracking-widest text-gray-custom-700 uppercase">
              {marcaNombre}
            </p>
          )}
        </div>

        {/* Precio */}
        <div className="mt-auto">
          <p className="font-textOffice-regular text-sm text-gray-custom-700">
            Desde
          </p>
          <p className="font-headOffice-bold text-2xl text-gray-custom-900">
            {precioUSD} <span className="text-gray-custom">| {precioPEN}</span>
          </p>
          <p className="text-center font-textOffice-regular-italic text-xs text-gray-custom-700">
            *Incluye bonos de financiamiento
          </p>
        </div>

        {/* CTA */}
        <Link
          href={href}
          className={cn(
            "mt-2 flex w-full items-center justify-center gap-2 rounded-xl",
            "bg-blue-custom-300 px-4 py-3.5",
            "font-headOffice-bold text-sm tracking-widest text-white uppercase",
            "transition-all duration-200 hover:bg-blue-custom-500",
            "focus-visible:outline focus-visible:outline-sky-custom-300"
          )}
        >
          Ver Detalles
          <ChevronRight size={15} strokeWidth={3} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
