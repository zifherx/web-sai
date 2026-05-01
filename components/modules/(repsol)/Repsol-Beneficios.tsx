import { cn } from "@/lib/utils"
import { REPSOL_BENEFICIOS_PROPS } from "@/types/repsol.types"
import { MapPin } from "lucide-react"
import Image from "next/image"

export function RepsolBeneficios({ beneficios }: REPSOL_BENEFICIOS_PROPS) {
  const { beneficiosAdicionales, cobertura, descuentos, imageAlt, imageSrc } =
    beneficios
  const BeneficioIcon = beneficiosAdicionales.icon

  return (
    <section className="w-full bg-sky-custom-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          {/* ── Imagen izquierda ── */}
          <div className="relative h-80 overflow-hidden rounded-2xl md:h-full md:min-h-160">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* ── Contenido derecho ── */}
          <div className="flex flex-col gap-4">
            {/* Descuentos */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-headOffice-bold text-xl text-sky-custom-500 md:text-3xl">
                Descuentos
              </h3>
              <div className="flex flex-col gap-3">
                {descuentos.map((d) => (
                  <div
                    key={d.tipo}
                    className="flex items-center justify-between gap-2 rounded-xl bg-gray-custom-100 px-2 py-1.5 sm:gap-4 sm:px-4 sm:py-3"
                  >
                    <span
                      className={cn(
                        "shrink-0 rounded-lg bg-sky-custom-300 px-4 py-8",
                        "min-w-24 text-center font-headOffice-medium text-sm text-white sm:min-w-50 sm:text-lg"
                      )}
                    >
                      {d.tipo}
                    </span>
                    <span className="flex items-start font-headOffice-bold text-3xl text-sky-custom-500 md:text-5xl">
                      {d.monto}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cobertura */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-headOffice-bold text-xl text-sky-custom-500 md:text-3xl">
                Cobertura
              </h3>
              <div className="flex flex-wrap gap-4">
                {cobertura.map((c) => (
                  <span
                    key={c.ciudad}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg",
                      "bg-sky-custom-300 px-4 py-2",
                      "font-headOffice-medium text-base text-white"
                    )}
                  >
                    <MapPin size={18} aria-hidden="true" />
                    {c.ciudad}
                  </span>
                ))}
              </div>
            </div>

            {/* Beneficios Adicionales */}
            <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm">
              <BeneficioIcon
                size={35}
                className="shrink-0 text-gray-custom-700"
                strokeWidth={2}
              />
              <span className="font-headOffice-bold text-xl tracking-wider text-gray-custom-900/90 md:text-3xl">
                {beneficiosAdicionales.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
