import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { SedeType } from "../../types/api.types"

type TALLER_AUTORIZADO_CARD_PROPS = {
  sede: SedeType
}

export function TallerAutorizadoCard({ sede }: TALLER_AUTORIZADO_CARD_PROPS) {
  const { imageUrl, slug, scheduleExtended, scheduleRegular, name, address } =
    sede

  const href = `/sede/${slug}`

  const scheduleLines = [scheduleRegular, scheduleExtended].filter(Boolean)

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden sm:flex-row",
        "rounded-2xl bg-white",
        "shadow-sm transition-shadow duration-300 hover:shadow-md",
        "h-full p-3 sm:h-80"
      )}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl sm:h-auto sm:w-[45%]">
        <Image
          src={imageUrl}
          alt={`Fotografía del ${name}`}
          fill
          sizes="(max-width: 768px) 45vw, 22vw"
          className={cn(
            "object-cover object-center",
            "transition-transform duration-500 ease-out",
            "group-hover:scale-[1.04]"
          )}
          draggable={false}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 overflow-hidden p-3 sm:p-5">
        <h3 className="font-headOffice-bold text-xl leading-tight text-gray-custom-900 md:text-2xl">
          {name}
        </h3>

        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <MapPin
                size={16}
                className="shrink-0 text-sky-custom-500"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="font-headOffice-medium text-base text-sky-custom-500">
                Ubicación
              </span>
            </div>

            <p className="line-clamp-2 pl-6 font-textOffice-regular text-sm leading-snug text-gray-custom-700">
              {address}
            </p>
          </div>

          {/* Horario */}
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Clock
                size={16}
                className="shrink-0 text-sky-custom-500"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="font-headOffice-medium text-sm text-sky-custom-500">
                Horario de Atención
              </span>
            </div>

            <div className="pl-6">
              {scheduleLines.map((line, i) => (
                <p
                  key={i}
                  className="font-textOffice-regular text-sm leading-snug text-gray-custom-700"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={href}
          className={cn(
            "block w-full rounded-xl",
            "bg-sky-custom-500 px-4 py-3.5",
            "text-center font-headOffice-bold text-base tracking-widest text-white uppercase sm:text-sm",
            "transition-all duration-200",
            "hover:bg-sky-custom-700 hover:shadow-md hover:shadow-sky-custom-500/25",
            "focus-visible:outline focus-visible:outline-sky-custom-300"
          )}
        >
          Contacta al Taller
        </Link>
      </div>
    </div>
  )
}
