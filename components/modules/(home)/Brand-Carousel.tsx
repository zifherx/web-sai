/* eslint-disable react-hooks/refs */
"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"
import { useActiveMarcas } from "../../../hooks/queries/use-marca"
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel"
import { Skeleton } from "../../ui/skeleton"

export function BrandCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const { data: items, isLoading, isError, error } = useActiveMarcas()

  if (isError) {
    console.error("❌ [Brand-Carousel] Error al cargar marcas", error)
    return null
  }

  return (
    <section className="w-full bg-[#ECF1F9] py-16 md:pt-32 md:pb-16">
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <h2 className="mb-3 text-center font-headOffice-bold text-3xl md:text-4xl">
          <span className="text-gray-custom-900">Elige alguna de</span>{" "}
          <span className="text-sky-custom-500">nuestras marcas</span>
        </h2>
        <p className="text-base text-gray-500">
          Contamos con la mayor oferta de marcas del mercado. Desliza y escoge
          la marca de tu preferencia
        </p>
      </div>

      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="mx-auto max-w-7xl"
      >
        <CarouselContent>
          {isLoading &&
            Array(12)
              .fill(null)
              .map((_, i) => (
                <CarouselItem
                  key={`skeleton-${i}`}
                  className="basis-1/2 md:basis-32"
                >
                  <Skeleton className="h-30 w-30 rounded-sm" />
                </CarouselItem>
              ))}

          {!isLoading &&
            items?.map((item) => (
              <CarouselItem key={item.id} className="basis-4/12 md:basis-32">
                <Image
                  src={item.imageUrl}
                  alt={`Marca ${item.name}`}
                  width={160}
                  height={160}
                  className="cursor-pointer object-contain drop-shadow-md"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
