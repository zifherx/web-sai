import { GaleriaItem } from "@/components/shared/Galeria-Item"
import { cn } from "@/lib"
import { VEHICULO_GALERIA_PROPS } from "@/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function VehiculoGaleria({
  fichaTecnica,
  galeria,
  nombre,
}: VEHICULO_GALERIA_PROPS) {
  if (galeria.length === 0) return null

  const left = galeria.slice(0, 2)
  const center = galeria[2]
  const right = galeria.slice(3, 5)

  return (
    <section className="w-full bg-sky-custom-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-10 text-center font-headOffice-bold text-4xl text-sky-custom-500 md:text-5xl">
          Galería
        </h2>

        <div className="grid grid-cols-1 gap-4 md:h-140 md:grid-cols-[1fr_1.5fr_1fr]">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4 md:h-full">
            {left.map((img, i) => (
              <GaleriaItem
                key={i}
                img={img}
                nombre={nombre}
                height="h-52 md:flex-1"
              />
            ))}
          </div>

          {/* Imagen central — más alta */}
          {center && (
            <GaleriaItem img={center} nombre={nombre} height="h-85 md:h-full" />
          )}

          {/* Columna derecha */}
          <div className="flex flex-col gap-4 md:h-full">
            {right.map((img, i) => (
              <GaleriaItem
                key={i}
                img={img}
                nombre={nombre}
                height="h-52 md:flex-1"
              />
            ))}
          </div>
        </div>

        {/* Ficha técnica CTA */}
        {fichaTecnica && (
          <div className="mt-10 flex justify-center">
            <Link
              href={fichaTecnica}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl",
                "border-2 border-sky-custom-500 px-10 py-3.5",
                "font-headOffice-bold text-sm tracking-widest text-sky-custom-500 uppercase",
                "transition-all duration-200 hover:bg-sky-custom-500 hover:text-white",
                "focus-visible:outline focus-visible:outline-sky-custom-300"
              )}
            >
              Ficha Técnica
              <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
