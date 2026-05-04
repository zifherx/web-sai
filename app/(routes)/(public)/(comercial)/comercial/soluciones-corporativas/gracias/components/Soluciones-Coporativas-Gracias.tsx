import { cn } from "@/lib"
import { IProximosPasosGracias } from "@/types"
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  Phone,
  Users,
} from "lucide-react"
import Link from "next/link"

const PROXIMOS_PASOS_SOLUCIONES_CORPORATIVAS: IProximosPasosGracias[] = [
  {
    icon: Phone,
    text: "Un asesor corporativo se pondrá en contacto contigo en las próximas 24 horas hábiles.",
  },
  {
    icon: Users,
    text: "Evaluaremos las necesidades de tu flota y te prepararemos una propuesta personalizada.",
  },
  {
    icon: FileText,
    text: "Recibirás una cotización detallada con los beneficios exclusivos para tu empresa.",
  },
  {
    icon: Clock,
    text: "Coordinamos una reunión a la hora que mejor se adapte a tu agenda.",
  },
]

export function SolucionesCoporativasGracias() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-custom-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 bg-blue-custom-500 px-8 py-10 text-center text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <CheckCircle2 size={44} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-headOffice-bold text-2xl md:text-3xl">
                ¡Solicitud Recibida!
              </h1>
              <p className="mt-1 font-textOffice-regular text-sm text-white/80">
                Tu consulta corporativa ha sido registrada exitosamente
              </p>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-6">
            <p className="text-center font-textOffice-regular text-sm leading-relaxed text-gray-custom-700">
              Gracias por tu interés en las{" "}
              <strong className="font-headOffice-medium text-gray-custom-900">
                Soluciones Corporativas Automotores Inka
              </strong>
              . Nuestro equipo especializado en flotas empresariales revisará tu
              solicitud y te contactará a la brevedad.
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
              {PROXIMOS_PASOS_SOLUCIONES_CORPORATIVAS.map((paso, i) => {
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

            {/* Nota adicional */}
            <div className="border-sky-custom-200 mt-6 rounded-xl border bg-sky-custom-50 px-4 py-3">
              <p className="font-textOffice-regular text-xs leading-relaxed text-sky-custom-700">
                Para consultas inmediatas puedes contactarnos directamente al{" "}
                <a
                  href="tel:+51900000000"
                  className="font-headOffice-medium underline hover:text-sky-custom-900"
                >
                  (01) 000-0000
                </a>{" "}
                o escribirnos a{" "}
                <a
                  href="mailto:marketing.corporativo@automotoresinka.com"
                  className="font-headOffice-medium underline hover:text-sky-custom-900"
                >
                  marketing.corporativo@automotoresinka.com
                </a>
              </p>
            </div>
          </div>

          {/* Footer — CTAs */}
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
              href="/comercial/soluciones-corporativas"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl border border-gray-custom-300/60 py-3.5",
                "font-headOffice-medium text-sm text-gray-custom-700",
                "transition-all duration-200 hover:border-sky-custom-300 hover:text-sky-custom-500"
              )}
            >
              <ArrowLeft size={16} />
              Volver a Soluciones Corporativas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
