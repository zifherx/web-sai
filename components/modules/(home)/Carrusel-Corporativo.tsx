/* eslint-disable react-hooks/refs */
"use client"

import { SlideCorporativo } from "@/components/shared/Slide-Corporativo"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { CARRUSEL_CORPORATIVO } from "@/constants/home.constants"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const slides = CARRUSEL_CORPORATIVO.slides
const DELAY = CARRUSEL_CORPORATIVO.autoplayInterval ?? 5000

export function CarruselCorporativo() {
  const plugin = useRef(
    Autoplay({ delay: DELAY, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <section
      className="w-full bg-sky-custom-50 py-12 md:py-16"
      aria-label="Carrusel corporativo Automotores Inka"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <SlideCorporativo slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
