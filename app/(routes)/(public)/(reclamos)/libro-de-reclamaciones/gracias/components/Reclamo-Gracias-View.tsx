"use client"

import { cn } from "@/lib"
import { GRACIAS_VIEW_RECLAMO_PROPS } from "@/types"
import { CheckCircle2, Clock, FileText, Home, Mail, Scale } from "lucide-react"
import Link from "next/link"

const PROXIMOS_PASOS_RECLAMOS = [
  { icon: FileText, text: "Revisaremos detalladamente tu reclamo." },
  { icon: Mail, text: "Te contactaremos al correo electrónico proporcionado." },
  { icon: Mail, text: "Una copia de tu reclamo llegará a tu correo." },
  { icon: Clock, text: "Resolveremos tu caso en máximo 15 días hábiles." },
]

export function ReclamoGraciasView({
  numeroReclamo,
}: GRACIAS_VIEW_RECLAMO_PROPS) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-custom-50 px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Card principal */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* Header verde */}
          <div className="flex flex-col items-center gap-4 bg-sky-custom-500 px-8 py-10 text-center text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <CheckCircle2 size={44} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-headOffice-bold text-2xl md:text-3xl">
                ¡Reclamo Registrado!
              </h1>
              <p className="mt-1 font-textOffice-regular text-sm text-white/80">
                Tu solicitud ha sido recibida exitosamente
              </p>
            </div>
          </div>

          {/* Número de reclamo */}
          {numeroReclamo && (
            <div className="border-sky-custom-200 mx-6 mt-6 flex items-center justify-between rounded-2xl border bg-sky-custom-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <Scale size={18} className="shrink-0 text-sky-custom-500" />
                <div>
                  <p className="font-textOffice-regular text-xs text-gray-custom-700">
                    Número de reclamo
                  </p>
                  <p className="font-headOffice-bold text-base tracking-wider text-sky-custom-500">
                    {numeroReclamo}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-sky-custom-100 px-3 py-1 font-headOffice-medium text-xs text-sky-custom-500">
                Activo
              </span>
            </div>
          )}

          {/* Cuerpo */}
          <div className="px-6 py-6">
            <p className="text-center font-textOffice-regular text-sm leading-relaxed text-gray-custom-700">
              Hemos recibido tu reclamo y lo estamos procesando. Estaremos en
              contacto contigo a la brevedad posible luego de revisar tu caso.
            </p>

            {/* Separador */}
            <div className="relative my-6">
              <div className="border-t border-gray-custom-300/50" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-textOffice-regular text-xs text-gray-custom-500">
                Próximos pasos
              </span>
            </div>

            {/* Pasos */}
            <ul className="flex flex-col gap-3">
              {PROXIMOS_PASOS_RECLAMOS.map((paso, i) => {
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

            {/* Nota INDECOPI */}
            <div className="mt-6 rounded-xl border border-gray-custom-300/40 bg-gray-custom-100 px-4 py-3">
              <p className="font-textOffice-regular text-xs leading-relaxed text-gray-custom-700">
                Conforme a la Ley N° 29571, el proveedor tiene{" "}
                <strong className="font-headOffice-medium">
                  15 días hábiles
                </strong>{" "}
                para dar respuesta a tu reclamo. Si no recibes respuesta, puedes
                acudir a{" "}
                <Link
                  href="https://www.indecopi.gob.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headOffice-medium text-sky-custom-500 hover:underline"
                >
                  INDECOPI
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Footer — CTA */}
          <div className="border-t border-gray-custom-300/40 px-6 py-5">
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
          </div>
        </div>
      </div>
    </div>
  )
}
