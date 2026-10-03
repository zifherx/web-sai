import { MAINTENANCE_VIEW_PROPS } from "@/types/site-settings.types"
import { Wrench } from "lucide-react"
import { MaintenanceGameToggle } from "./Maintenance-Game-Toggle"

const DEFAULT_MESSAGE =
  "Estamos realizando trabajos de mantenimiento en nuestra plataforma. Volveremos a estar en línea muy pronto."

export function MaintenanceView({ message }: MAINTENANCE_VIEW_PROPS) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-custom-100 px-4 py-16">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex flex-col items-center gap-4 bg-blue-custom-500 px-8 py-12 text-center text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <Wrench size={40} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <p className="font-headOffice-medium text-sm tracking-widest text-white/80 uppercase">
              Automotores Inka
            </p>
            <h1 className="mt-2 font-headOffice-bold text-3xl leading-tight md:text-4xl">
              Estamos en el taller
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 px-6 py-8 text-center md:px-10">
          <p className="max-w-xl font-textOffice-regular text-sm leading-relaxed text-gray-custom-900 md:text-base">
            {message ?? DEFAULT_MESSAGE}
          </p>

          <MaintenanceGameToggle />

          <p className="font-textOffice-regular text-xs text-gray-custom-700">
            ¿Necesitas ayuda? Escríbenos a{" "}
            <a
              href="mailto:contacto@automotoresinka.pe"
              className="text-sky-custom-500 hover:underline"
            >
              contacto@automotoresinka.pe
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
