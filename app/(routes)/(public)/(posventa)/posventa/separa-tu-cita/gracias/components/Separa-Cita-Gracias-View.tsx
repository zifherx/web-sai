import { cn } from "@/lib"
import { IProximosPasosCita } from "@/types"
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Home,
  Phone,
  Wrench,
} from "lucide-react"
import Link from "next/link"

const PROXIMOS_PASOS_CITA: IProximosPasosCita[] = [
  { icon: Phone, text: "Nuestro equipo te contactará para confirmar la cita." },
  {
    icon: Clock,
    text: "Llega 10 minutos antes de tu horario para el check-in.",
  },
  {
    icon: Wrench,
    text: "Trae tu tarjeta de propiedad y la última factura de servicio.",
  },
  {
    icon: Clock,
    text: "El tiempo de atención varía según el tipo de servicio.",
  },
]

export function SeparaCitaGraciasView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-custom-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 bg-sky-custom-500 px-8 py-10 text-center text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <CheckCircle2 size={44} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-headOffice-bold text-2xl md:text-3xl">
                ¡Cita Registrada!
              </h1>
              <p className="mt-1 font-textOffice-regular text-sm text-white/80">
                Tu solicitud de servicio ha sido recibida
              </p>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-6">
            <p className="text-center font-textOffice-regular text-sm leading-relaxed text-gray-custom-700">
              Hemos registrado tu cita de servicio. Nuestro equipo se pondrá en
              contacto contigo a la brevedad para confirmar el horario y los
              detalles.
            </p>

            {/* Separador */}
            <div className="relative my-6">
              <div className="border-t border-gray-custom-300/50" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-textOffice-regular text-xs text-gray-custom-500">
                Antes de tu cita
              </span>
            </div>

            {/* Pasos */}
            <ul className="flex flex-col gap-3">
              {PROXIMOS_PASOS_CITA.map((paso, i) => {
                const Icon = paso.icon
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-custom-100">
                      <Icon size={13} className="text-white" />
                    </div>
                    <span className="font-textOffice-regular text-sm text-gray-custom-700">
                      {paso.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-custom-300/40 px-6 py-5">
            <Link
              href="/"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3.5",
                "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
                "transition-all duration-200 hover:bg-sky-custom-700"
              )}
            >
              <Home size={16} />
              Ir al inicio
            </Link>
            <Link
              href="/posventa/separa-tu-cita"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl border border-gray-custom-300/60 py-3.5",
                "font-headOffice-medium text-sm text-gray-custom-700",
                "transition-all duration-200 hover:border-sky-custom-300 hover:text-sky-custom-500"
              )}
            >
              <ArrowLeft size={16} />
              Registrar otra cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
