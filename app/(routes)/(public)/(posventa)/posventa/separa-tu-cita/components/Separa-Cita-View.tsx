"use client"

import { SeparaCitaForm } from "@/components/modules/(separa-cita)/Separa-Cita-Form"
import { SeparaCitaMarcas } from "@/components/modules/(separa-cita)/Separa-Cita-Marcas"
import { SEPARA_CITA_VIEW_PROPS } from "@/types"

export function SeparaCitaView({ initialCiudad = "" }: SEPARA_CITA_VIEW_PROPS) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="font-headOffice-bold text-3xl text-sky-custom-500 uppercase md:text-5xl">
          Registra tu servicio
        </h1>
        <p className="mt-2 font-textOffice-regular text-sm text-gray-custom-900 sm:text-base">
          Agenda tu cita en el taller autorizado más cercano a ti
        </p>

        {/* Banner si viene ciudad preseleccionada */}
        {initialCiudad && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-custom-100 px-5 py-2.5">
            <span className="font-textOffice-regular text-sm text-sky-custom-500">
              📍 Ciudad preseleccionada:
            </span>
            <span className="font-headOffice-medium text-sm text-sky-custom-500 capitalize">
              {initialCiudad}
            </span>
            <span className="font-textOffice-regular text-xs text-gray-custom-900">
              · Puedes cambiarla si lo deseas
            </span>
          </div>
        )}
      </div>

      {/* Grid: form | marcas */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr]">
        {/* Formulario */}
        <SeparaCitaForm initialCiudad={initialCiudad} />

        {/* Logos de marcas */}
        <div className="hidden items-start justify-center sm:flex md:pt-2">
          <SeparaCitaMarcas />
        </div>
      </div>
    </div>
  )
}
