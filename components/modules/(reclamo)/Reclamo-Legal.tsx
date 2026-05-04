import {
  BookOpen,
  Clock,
  MessageSquare,
  Phone,
  Scale,
  Shield,
} from "lucide-react"
import Link from "next/link"

const RECLAMO_LEGAL_ITEMS = [
  {
    icon: Clock,
    title: "Plazo de respuesta",
    desc: "El proveedor tiene 15 días hábiles para responder a su reclamo.",
  },
  {
    icon: Shield,
    title: "Código de Protección al Consumidor",
    desc: "Ley N° 29571 garantiza sus derechos como consumidor.",
  },
  {
    icon: Scale,
    title: "INDECOPI",
    desc: "Puede presentar su denuncia ante INDECOPI si no obtiene respuesta.",
  },
  {
    icon: MessageSquare,
    title: "Sin requisito previo",
    desc: "Este reclamo no es requisito para acudir a otras vías de solución.",
  },
  {
    icon: BookOpen,
    title: "Datos mínimos requeridos",
    desc: "Nombre, DNI, contacto, fecha y detalle del reclamo son obligatorios.",
  },
  {
    icon: Phone,
    title: "Línea gratuita INDECOPI",
    desc: "224-7777 — Atención para consultas y orientación al consumidor.",
  },
]

export function ReclamoLegal() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-custom-300/40 bg-gray-custom-100 px-6 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-custom-300 text-white">
          <Scale size={20} />
        </div>
        <h2 className="font-headOffice-bold text-base text-gray-custom-900">
          Marco Legal — Protección del Consumidor
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {RECLAMO_LEGAL_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-custom-100">
                  <Icon size={16} className="text-gray-custom-900" />
                </div>
                <div>
                  <p className="font-headOffice-bold text-sm text-gray-custom-900">
                    {item.title}
                  </p>
                  <p className="font-textOffice-regular text-xs text-gray-custom-700">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 border-t border-gray-custom-300/40 pt-4 text-center">
          <p className="font-textOffice-regular text-sm text-gray-custom-700">
            Para más información sobre tus derechos:{" "}
            <Link
              href="https://www.indecopi.gob.pe"
              target="_blank"
              className="font-headOffice-medium text-sky-custom-500 hover:underline"
            >
              www.indecopi.gob.pe
            </Link>{" "}
            |{" "}
            <Link
              href="tel:224-7777"
              className="font-headOffice-medium text-sky-custom-500 hover:underline"
            >
              Línea gratuita: 224-7777
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
