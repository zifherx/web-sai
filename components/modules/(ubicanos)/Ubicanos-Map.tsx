"use client"

import { UbicanosMarker } from "@/components/shared/Ubicanos-Marker"
import { UBICANOS_MAP_PROPS } from "@/types"
import type { Marker } from "leaflet"
import "leaflet/dist/leaflet.css"
import { RefObject, useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"

function MapController({
  center,
  openPopupId,
  markersRef,
}: {
  center: [number, number]
  openPopupId: string | null
  markersRef: RefObject<Record<string, Marker>>
}) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, 15, { animate: true, duration: 0.8 })
  }, [center, map])

  useEffect(() => {
    if (!openPopupId) return
    const marker = markersRef.current[openPopupId]
    if (marker) marker.openPopup()
  }, [openPopupId, markersRef])

  return null
}

export function UbicanosMap({
  mapCenter,
  markersRef,
  openPopupId,
  sedes,
}: UBICANOS_MAP_PROPS) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  useEffect(() => {
    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div className="md:col-span-2" ref={wrapperRef}>
      <div className="h-100 w-full overflow-hidden rounded-2xl shadow-md md:h-187.5">
        <MapContainer
          ref={mapInstanceRef}
          center={mapCenter}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {sedes.map((sede) => (
            <UbicanosMarker key={sede.id} sede={sede} markersRef={markersRef} />
          ))}

          <MapController
            center={mapCenter}
            openPopupId={openPopupId}
            markersRef={markersRef}
          />
        </MapContainer>
      </div>
    </div>
  )
}
