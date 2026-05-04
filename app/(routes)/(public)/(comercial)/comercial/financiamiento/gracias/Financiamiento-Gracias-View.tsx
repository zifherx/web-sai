import { cn } from "@/lib"
import {
  FINANCIAMIENTO_GRACIAS_VIEW_PROPS,
  PROXIMOS_PASOS_GRACIAS_FINANCIAMIENTO,
} from "@/types"
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  Phone,
  Tag,
  Users,
} from "lucide-react"
import Link from "next/link"

const PROXIMOS_PASOS_FINANCIAMIENTO_GRACIAS: PROXIMOS_PASOS_GRACIAS_FINANCIAMIENTO[] =
  [
    {
      icon: Phone,
      text: "Un asesor especializado te contactará en las próximas 2 horas hábiles para confirmar los detalles de tu cotización.",
    },
    {
      icon: FileText,
      text: "Recibirás una propuesta personalizada con precios, opciones de financiamiento y condiciones exclusivas para ti.",
    },
    {
      icon: Users,
      text: "Puedes agendar una visita a cualquiera de nuestros concesionarios para ver el vehículo en persona.",
    },
    {
      icon: Clock,
      text: "Si tienes urgencia, llámanos directamente — nuestro equipo está disponible de Lunes a Sábado.",
    },
  ]

export function FinanciamientoGraciasView({
  cotizacionId,
}: FINANCIAMIENTO_GRACIAS_VIEW_PROPS) {
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
                ¡Cotización Registrada!
              </h1>
              <p className="mt-1 font-textOffice-regular text-sm text-white/80">
                Tu solicitud ha sido recibida exitosamente
              </p>
            </div>

            {/* Número de cotización */}
            {cotizacionId && (
              <div className="mt-1 flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2">
                <Tag size={13} className="text-white/80" />
                <span className="font-textOffice-regular text-xs text-white/80">
                  N° de referencia:
                </span>
                <span className="font-headOffice-medium text-sm text-white">
                  {cotizacionId.slice(-8).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-6">
            <p className="text-center font-textOffice-regular text-sm leading-relaxed text-gray-custom-700">
              Gracias por tu interés en{" "}
              <strong className="font-headOffice-medium text-gray-custom-900">
                Automotores Inka
              </strong>
              . Hemos recibido tu solicitud y nuestro equipo de asesores la
              revisará para brindarte la mejor propuesta.
            </p>

            {/* Separador */}
            <div className="relative my-6">
              <div className="border-t border-gray-custom-300/50" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-textOffice-regular text-xs text-gray-custom-500">
                ¿Qué sigue?
              </span>
            </div>

            {/* Pasos */}
            <ul className="flex flex-col gap-3">
              {PROXIMOS_PASOS_FINANCIAMIENTO_GRACIAS.map((paso, i) => {
                const Icon = paso.icon
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-custom-100">
                      <Icon size={13} className="text-sky-custom-500" />
                    </div>
                    <span className="font-textOffice-regular text-sm text-gray-custom-700">
                      {paso.text}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Nota de contacto */}
            <div className="border-sky-custom-200 mt-6 rounded-xl border bg-sky-custom-50 px-4 py-3">
              <p className="font-textOffice-regular text-xs leading-relaxed text-sky-custom-700">
                ¿Prefieres contactarnos directamente? Escríbenos a{" "}
                <a
                  href="mailto:ventas@automotoresinka.pe"
                  className="font-headOffice-medium underline hover:text-sky-custom-900"
                >
                  ventas@automotoresinka.pe
                </a>{" "}
                o visita cualquiera de nuestros concesionarios.
              </p>
            </div>
          </div>

          {/* Footer — CTAs */}
          <div className="flex flex-col gap-2 border-t border-gray-custom-300/40 px-6 py-5">
            <Link
              href="/catalogo"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3.5",
                "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
                "transition-all duration-200 hover:bg-sky-custom-700"
              )}
            >
              <Tag size={16} />
              Seguir explorando el catálogo
            </Link>
            <Link
              href="/"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl border border-gray-custom-300/60 py-3.5",
                "font-headOffice-medium text-sm text-gray-custom-700",
                "transition-all duration-200 hover:border-sky-custom-300 hover:text-sky-custom-500"
              )}
            >
              <Home size={16} />
              Ir al inicio
            </Link>
            <Link
              href="/comercial/financiamiento"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl border border-gray-custom-300/60 py-3.5",
                "font-headOffice-medium text-sm text-gray-custom-700",
                "transition-all duration-200 hover:border-sky-custom-300 hover:text-sky-custom-500"
              )}
            >
              <ArrowLeft size={16} />
              Cotizar otro vehículo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
