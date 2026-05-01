import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { precioFormateadoUSD } from "../../lib/global.functions"
import { cn } from "../../lib/utils"
import { VEHICLE_HOME_CARD_PROPS } from "../../types/vehicle.types"

export function VehicleHomeCard({
  vehiculo,
  marcaNombre,
}: VEHICLE_HOME_CARD_PROPS) {
  const { imageUrl, name, precioBase } = vehiculo
  const href = `/catalogo/${vehiculo.slug}`

  return (
    <div
      className={cn(
        "group flex flex-col",
        "rounded-2xl bg-white p-3",
        "border border-gray-custom-300",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300",
        "hover:border-blue-custom-500",
        "overflow-hidden"
      )}
    >
      <Link
        href={href}
        className="relative block h-52 w-full overflow-hidden rounded-2xl bg-gray-custom-100 p-4"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "object-contain object-center p-4",
            "transition-transform duration-500 ease-out",
            "group-hover:scale-[1.04]"
          )}
          draggable={false}
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between px-3 py-5">
        <div>
          <Link href={href}>
            <h3 className="font-headOffice-bold text-2xl leading-tight text-sky-custom-500 transition-colors group-hover:text-sky-custom-700">
              {name}
            </h3>
          </Link>
          {marcaNombre && (
            <p className="mt-0.5 font-headOffice-medium text-sm tracking-widest text-gray-custom-700 uppercase">
              {marcaNombre}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-textOffice-regular text-sm text-gray-custom-700">
              Desde:
            </p>
            <p className="font-headOffice-bold text-xl text-gray-custom-900">
              {precioFormateadoUSD(precioBase)}
            </p>
          </div>

          <Link
            href={href}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-xl",
              "bg-sky-custom-500 px-4 py-2.5",
              "font-headOffice-bold text-sm text-white",
              "transition-all duration-200",
              "hover:bg-sky-custom-700 hover:shadow-md hover:shadow-sky-custom-500/25",
              "focus-visible:outline focus-visible:outline-sky-custom-300"
            )}
          >
            VER MÁS
            <ChevronRight size={14} strokeWidth={3} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
