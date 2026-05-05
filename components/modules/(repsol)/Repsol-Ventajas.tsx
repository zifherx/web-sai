import { cn } from "@/lib"
import { REPSOL_VENTAJAS_PROPS } from "@/types"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"

export function RepsolVentajas({ ventajas }: REPSOL_VENTAJAS_PROPS) {
  const { heading, imageAlt, imageSrc, items } = ventajas

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* ── Lista de ventajas (izquierda) ── */}
          <div>
            <h2 className="mb-8 font-headOffice-bold text-3xl text-sky-custom-500 md:text-5xl">
              {heading}
            </h2>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3",
                    "bg-gray-custom-100",
                    "rounded-xl px-5 py-4",
                    "font-headOffice-light text-sm font-semibold text-gray-custom-900 md:text-lg"
                  )}
                >
                  <BadgeCheck
                    size={24}
                    className="shrink-0 text-gray-custom-900"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Imagen (derecha) ── */}
          <div className="relative h-72 overflow-hidden rounded-2xl md:h-100">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
