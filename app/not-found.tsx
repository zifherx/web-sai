import { cn } from "@/lib"
import { AlertTriangle, Home } from "lucide-react"
import Link from "next/link"
import { BackButton } from "../components/shared/Back-Button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-custom-100 px-4 py-16">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* Header con color */}
        <div className="flex flex-col items-center gap-4 bg-blue-custom-500 px-8 py-12 text-center text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <AlertTriangle size={40} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="font-headOffice-bold text-7xl leading-none tracking-tight">
              404
            </p>
            <p className="mt-2 font-headOffice-medium text-lg text-white/90">
              Página no encontrada
            </p>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-col gap-6 px-8 py-8 text-center">
          {/* Mensaje automotriz */}
          <div>
            <h1 className="font-headOffice-bold text-xl text-gray-custom-900">
              ¡Te has salido de la pista!
            </h1>
            <p className="mt-2 font-textOffice-regular text-sm leading-relaxed text-gray-custom-700">
              La página que buscas se ha quedado sin combustible o ha tomado un
              desvío equivocado. No te preocupes, te ayudamos a volver al camino
              correcto.
            </p>
          </div>

          {/* Separador decorativo con ícono */}
          <div className="relative flex items-center gap-4">
            <div className="flex-1 border-t border-gray-custom-300/50" />
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-custom-100">
              <span className="font-headOffice-bold text-xs text-sky-custom-500">
                KM
              </span>
            </div>
            <div className="flex-1 border-t border-gray-custom-300/50" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            {/* Volver al inicio — CTA principal */}
            <Link
              href="/"
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl py-3.5",
                "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
                "transition-all duration-200 hover:bg-sky-custom-700"
              )}
            >
              <Home size={16} aria-hidden="true" />
              Ir al inicio
            </Link>

            {/* Volver — CTA secundario */}
            <BackButton label="Volver a la página anterior" />
          </div>

          {/* Sugerencia */}
          <p className="font-textOffice-regular text-xs text-gray-custom-500">
            Si el problema persiste, contáctanos en{" "}
            <a
              href="mailto:contacto@automotoresinka.pe"
              className="text-sky-custom-500 hover:underline"
            >
              contacto@automotoresinka.pe
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
