import { cn } from "@/lib/utils"
import { SEDE_UBICANOS_CARD_PROPS } from "@/types/ubicanos.types"
import { Car, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SedeUbicanosCard({
  sede,
  marcasVentas = [],
}: SEDE_UBICANOS_CARD_PROPS) {
  const { address, imageUrl, name, slug, scheduleExtended, scheduleRegular } =
    sede
  const href = `/ubicanos/${slug}`
  const scheduleLines = [
    `Lunes a Viernes de ${scheduleRegular}`,
    `Sábado de ${scheduleExtended}`,
  ].filter(Boolean)

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden",
        "rounded-2xl bg-white",
        "border-2 border-gray-custom-300/50",
        "shadow-sm transition-shadow duration-300 hover:border-sky-custom-300 hover:shadow-lg"
      )}
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("rounded-3xl object-cover object-center p-4")}
          draggable={false}
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <h3 className="font-headOffice-bold text-3xl leading-tight text-gray-custom-900">
          {name}
        </h3>

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
          <p className="pl-6 font-textOffice-regular text-sm leading-snug text-gray-custom-700">
            {address}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2">
            <Clock
              size={16}
              className="shrink-0 text-sky-custom-500"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="font-headOffice-medium text-base text-sky-custom-500">
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

        {marcasVentas.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Car
                size={16}
                className="shrink-0 text-sky-custom-500"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="font-headOffice-medium text-base text-sky-custom-500">
                Marcas autorizadas
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {marcasVentas.map((marca) => (
                <span
                  key={marca}
                  className="rounded-sm bg-sky-custom-50 px-3 py-1 font-textOffice-medium text-xs text-gray-custom-900"
                >
                  {marca}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          href={href}
          className={cn(
            "mt-auto block w-full rounded-xl",
            "bg-sky-custom-500 px-4 py-4",
            "text-center font-headOffice-bold text-base tracking-widest text-white uppercase",
            "transition-all duration-200",
            "hover:bg-blue-custom-700",
            "focus-visible:outline focus-visible:outline-sky-custom-300"
          )}
        >
          Contacta al Taller
        </Link>
      </div>
    </article>
  )
}
