"use client"

import { cn } from "@/lib"
import { UBICANOS_MARKER_PROPS } from "@/types"
import { icon } from "leaflet"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Marker, Popup } from "react-leaflet"

const customIcon = icon({
  iconUrl: "/assets/marker.svg",
  iconSize: [40, 40],
})

export function UbicanosMarker({ markersRef, sede }: UBICANOS_MARKER_PROPS) {
  const {
    address,
    coordenadasMapa,
    name,
    imageUrl,
    horarioVentas,
    horarioTaller,
    id,
  } = sede

  if (!coordenadasMapa?.latitud || !coordenadasMapa?.longitud) return null

  const scheduleLinesVentas = [
    `Lunes a Viernes de ${horarioVentas.scheduleRegular}`,
    `Sábado de ${horarioVentas.scheduleExtended}`,
  ].filter(Boolean)

  const scheduleLinesTaller = [
    `Lunes a Viernes de ${horarioTaller.scheduleRegular}`,
    `Sábado de ${horarioTaller.scheduleExtended}`,
  ].filter(Boolean)

  const hasHorarioVentas =
    horarioVentas.scheduleRegular || horarioVentas.scheduleExtended
  const hasHorarioTaller =
    horarioTaller.scheduleRegular || horarioTaller.scheduleExtended

  return (
    <Marker
      position={{
        lat: parseFloat(coordenadasMapa.latitud),
        lng: parseFloat(coordenadasMapa.longitud),
      }}
      icon={customIcon}
      ref={(ref) => {
        if (ref) markersRef.current[id] = ref
      }}
    >
      <Popup autoClose maxWidth={580}>
        <div className="flex w-60 gap-2 p-1 md:w-130">
          {/* Imagen — oculta en mobile */}
          <div className="hidden flex-1 shrink-0 md:block">
            <div className="relative h-full w-60 overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="block">
            <h2 className="font-headOffice-bold text-base leading-tight text-sky-custom-500">
              {name}
            </h2>

            <div>
              <p className="font-textOffice-regular text-xs text-gray-custom-700">
                {address}
              </p>
            </div>

            {hasHorarioVentas && (
              <div>
                <p className="flex items-center font-headOffice-medium text-xs text-gray-custom-900">
                  <Clock size={12} className="mr-1" /> Horario de atención
                  Ventas
                </p>
                {scheduleLinesVentas.map((line, i) => (
                  <p
                    key={i}
                    className="font-textOffice-regular text-xs text-gray-custom-700"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {hasHorarioTaller && (
              <div>
                <p className="flex items-center font-headOffice-medium text-xs text-gray-custom-900">
                  <Clock className="mr-1" size={12} /> Horario de atención
                  Postventa
                </p>
                {scheduleLinesTaller.map((line, i) => (
                  <p
                    key={i}
                    className="font-textOffice-regular text-xs text-gray-custom-700"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {sede.linkHowArrived && (
              <Link
                href={sede.linkHowArrived}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-auto flex items-center gap-1",
                  "font-headOffice-medium text-xs text-sky-custom-500",
                  "hover:underline"
                )}
              >
                <MapPin size={12} />
                Cómo llegar
              </Link>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
