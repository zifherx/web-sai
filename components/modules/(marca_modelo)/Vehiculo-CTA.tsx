import { cn } from "@/lib/utils"
import { VEHICULO_CTA_PROPS } from "@/types/marcamodelo.types"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function VehiculoCTA({ imagenActiva, vehiculo }: VEHICULO_CTA_PROPS) {
  return (
    <section className="w-full overflow-hidden bg-sky-custom-500">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-2 md:py-0">
          {/* Texto izquierdo */}
          <div className="flex flex-col gap-6 py-0 md:py-16">
            <div>
              <p className="font-textOffice-regular text-sm text-white/80">
                ¿Aún no estás seguro de cotizar?
              </p>
              <h2 className="mt-2 font-headOffice-bold text-2xl leading-tight text-white md:text-3xl lg:text-4xl">
                ¡Entérate de información exclusiva sobre este {vehiculo.name}!
              </h2>
            </div>

            <Link
              href={`/cotizacion?modelo=${vehiculo.slug}`}
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-xl",
                "bg-white px-8 py-4",
                "font-headOffice-bold text-sm tracking-widest text-sky-custom-500 uppercase",
                "transition-all duration-200 hover:bg-white/90 hover:shadow-lg",
                "focus-visible:outline focus-visible:outline-white"
              )}
            >
              Cotiza Ahora
              <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>

          {/* Imagen derecha — emerge desde abajo */}
          <div className="relative flex items-end justify-center">
            <div className="relative h-65 w-full md:h-80">
              <Image
                src={imagenActiva || vehiculo.imageUrl}
                alt={vehiculo.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
