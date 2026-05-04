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
    scheduleExtended,
    scheduleRegular,
    id,
  } = sede

  if (!coordenadasMapa?.latitud || !coordenadasMapa?.longitud) return null

  const scheduleLines = [
    `Lunes a Viernes de ${scheduleRegular}`,
    `Sábado de ${scheduleExtended}`,
  ].filter(Boolean)

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
      <Popup autoClose maxWidth={520}>
        <div className="flex w-60 gap-4 p-1 md:w-120">
          {/* Imagen — oculta en mobile */}
          <div className="hidden shrink-0 md:block">
            <div className="relative h-36 w-44 overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="176px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="font-headOffice-bold text-base leading-tight text-sky-custom-500">
              {name}
            </h2>

            <div>
              <p className="font-textOffice-regular text-xs text-gray-custom-700">
                {address}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1 font-headOffice-medium text-xs text-gray-custom-900">
                <Clock size={12} /> Horario de atención
              </p>
              {scheduleLines.map((line, i) => (
                <p
                  key={i}
                  className="font-textOffice-regular text-xs text-gray-custom-700"
                >
                  {line}
                </p>
              ))}
            </div>

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
