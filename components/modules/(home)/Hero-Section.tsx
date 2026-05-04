"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { useActivePortadas } from "@/hooks/queries/use-portada"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
  const { data: items, isLoading, isError, error } = useActivePortadas()

  if (isError) {
    console.error("❌ [HeroSection] Error al cargar portadas:", error)
    return null
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
            items?.map((item) => (
              <CarouselItem key={item.id}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={2000}
                  height={780}
                  priority
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
