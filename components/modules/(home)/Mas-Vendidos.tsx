/* eslint-disable react-hooks/refs */
"use client"

import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useActiveMarcas } from "../../../hooks/queries/use-marca"
import { useActiveVehiculos } from "../../../hooks/queries/use-vehiculo"
import { cn } from "../../../lib/utils"
import { VehicleHomeCard } from "../../shared/Vehicle-Home-Card"
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel"
import { Skeleton } from "../../ui/skeleton"

export function MasVendidos() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  const { data: vehiculos, isLoading: loadingVehiculos } = useActiveVehiculos({
    isNuevo: true,
  })

  const { data: marcas } = useActiveMarcas()

  const marcaMap = Object.fromEntries((marcas ?? []).map((m) => [m.id, m.name]))

  const skeletonItems = Array(4).fill(null)

  return (
    <section className="w-full bg-gray-custom-100 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-headOffice-bold text-xl leading-tight text-gray-custom-900 md:text-4xl">
              Revisa nuestros
            </h2>
            <p className="font-headOffice-medium text-xl leading-tight text-sky-custom-500 md:text-4xl">
              modelos más vendidos
            </p>
          </div>

          <Link
            href={"/catalogo"}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg md:rounded-xl",
              "border-2 border-sky-custom-500 px-3 py-1.5 md:px-6 md:py-3",
              "font-headOffice-bold text-xs tracking-widest text-sky-custom-500 md:text-sm",
              "transition-all duration-200",
              "hover:border-blue-custom-500 hover:bg-blue-custom-500 hover:text-white",
              "focus-visible:outline focus-visible:outline-blue-custom-500"
            )}
          >
            VER MÁS
            <ChevronRight
              size={16}
              className="text-base leading-none"
              aria-hidden="true"
              strokeWidth={3}
            />
          </Link>
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {loadingVehiculos &&
              skeletonItems.map((_, i) => (
                <CarouselItem
                  key={`skeletonm-${i}`}
                  className="basis-full pl-4 sm:basis-1/2 md:basis-1/3"
                >
                  <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm">
                    <Skeleton className="mb-4 h-52 w-full rounded-xl" />
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-1/3" />
                    <div className="flex items-end justify-between">
                      <div>
                        <Skeleton className="mb-1 h-3 w-12" />
                        <Skeleton className="h-6 w-28" />
                      </div>
                      <Skeleton className="h-9 w-24 rounded-xl" />
                    </div>
                  </div>
                </CarouselItem>
              ))}

            {!loadingVehiculos &&
              vehiculos?.map((vehiculo) => (
                <CarouselItem
                  key={vehiculo.id}
                  className="basis-full pl-4 sm:basis-1/2 md:basis-1/3"
                >
                  <VehicleHomeCard
                    vehiculo={vehiculo}
                    marcaNombre={marcaMap[vehiculo.marcaId]}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
