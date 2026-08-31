"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { useActivePortadas } from "@/hooks"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const { data: items, isLoading, isError, error } = useActivePortadas()

  if (isError) {
    console.error("❌ [HeroSection] Error al cargar portadas:", error)
    return (
      <section className="mb-0 flex h-auto w-full items-center justify-center bg-muted sm:h-160">
        <div className="px-4 text-center text-muted-foreground">
          <p className="text-sm">
            No pudimos cargar las portadas en este momento.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-0 h-auto w-full sm:h-160">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {isLoading &&
            Array(3)
              .fill(null)
              .map((_, i) => (
                <CarouselItem key={`skeleton-${i}`}>
                  <Skeleton className="h-50 w-full rounded-md md:h-195" />
                </CarouselItem>
              ))}

          {!isLoading &&
            items?.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="relative aspect-2000/780 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
