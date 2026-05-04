import { cn } from "@/lib"
import {
  BarChart3,
  GraduationCap,
  Handshake,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

export const CORPORATIVO_BENEFICIOS = [
  {
    id: "equipo-profesional",
    icon: Users,
    title: "Equipo profesional",
    description:
      "Contamos con asesores especializados en flotas corporativas que te brindan atención personalizada y profesional en todos nuestros procesos.",
    variant: "light",
  },
  {
    id: "generacion-reportes",
    icon: BarChart3,
    title: "Generación de reportes",
    description:
      "Accede a reportes detallados de tu flota: mantenimientos, seguimiento de unidades y cumplimiento de indicadores operativos.",
    variant: "dark",
  },
  {
    id: "capacitaciones",
    icon: GraduationCap,
    title: "Capacitaciones",
    description:
      "Ofrecemos programas de capacitación para conductores y gestores de flota, potenciando el uso eficiente y seguro de los vehículos.",
    variant: "light",
  },
  {
    id: "convenios",
    icon: Handshake,
    title: "Convenios",
    description:
      "Establecemos convenios corporativos en precios, mantenimientos y repuestos exclusivos pensados para maximizar la rentabilidad de tu empresa.",
    variant: "dark",
  },
  {
    id: "gestion",
    icon: Settings,
    title: "Gestión",
    description:
      "Te acompañamos con una plataforma de gestión que integra y administra los procesos técnicos y logísticos de toda tu flota.",
    variant: "light",
  },
  {
    id: "compras",
    icon: ShoppingCart,
    title: "Compras",
    description:
      "Simplificamos ventas, renovaciones y adquisiciones corporativas, facilitando los trámites administrativos y la toma de decisiones.",
    variant: "dark",
  },
]

export function CorporativoBeneficios() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-10 font-headOffice-bold text-3xl text-gray-custom-900 md:text-4xl">
          Beneficios
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CORPORATIVO_BENEFICIOS.map((beneficio) => {
            const Icon = beneficio.icon
            const isDark = beneficio.variant === "dark"
            return (
              <div
                key={beneficio.id}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl p-6",
                  "transition-shadow duration-200 hover:shadow-md",
                  isDark ? "bg-sky-custom-500" : "bg-sky-custom-300"
                )}
              >
                <div
                  className="mt-16 flex h-14 w-14 items-center justify-center rounded-xl bg-white"
                  aria-hidden="true"
                >
                  <Icon
                    size={40}
                    strokeWidth={2}
                    className="text-sky-custom-500"
                  />
                </div>

                <h3 className="font-headOffice-bold text-lg leading-tight text-white md:text-xl">
                  {beneficio.title}
                </h3>

                <p className="font-textOffice-regular text-sm leading-snug text-gray-custom-100">
                  {beneficio.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
