/* eslint-disable react-hooks/refs */
"use client"

import { useTalleres } from "@/hooks/queries/use-sede"
import Autoplay from "embla-carousel-autoplay"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { cn } from "../../../lib/utils"
import { TallerAutorizadoCard } from "../../shared/Taller-Autorizado-Card"
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel"
import { Skeleton } from "../../ui/skeleton"

export function TalleresAutorizados() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  const { data: talleres, isLoading } = useTalleres()

  const skeletonItems = Array(3).fill(null)

  return (
    <section className="w-full bg-blue-custom-300 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-headOffice-bold text-xl leading-tight text-white md:text-4xl">
              Visita nuestros
            </h2>
            <p className="font-headOffice-medium text-xl leading-tight text-sky-custom-100 md:text-4xl">
              Talleres Autorizados
            </p>
          </div>

          <Link
            href={`/servicios/talleres`}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg sm:rounded-xl",
              "border-2 border-white px-3 py-1.5 sm:px-6 sm:py-3",
              "font-headOffice-bold text-xs tracking-widest text-white sm:text-sm",
              "transition-all duration-200",
              "hover:bg-white hover:text-blue-custom-300",
              "focus-visible:outline focus-visible:outline-white"
            )}
          >
            VER MÁS
            <ChevronRight size={16} strokeWidth={3} aria-hidden="true" />
          </Link>
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {isLoading &&
              skeletonItems.map((_, i) => (
                <CarouselItem
                  key={`skeleton-${i}`}
                  className="basis-full pl-6 md:basis-1/2"
                >
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <Skeleton className="h-56 w-full rounded-none" />
                    <div className="flex flex-col gap-4 p-6">
                      <Skeleton className="h-7 w-3/5" />
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-3/5" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-3/5" />
                      </div>
                      <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                  </div>
                </CarouselItem>
              ))}

            {!isLoading &&
              talleres?.map((sede) => (
                <CarouselItem
                  key={sede.id}
                  className="basis-full pl-6 md:basis-1/2"
                >
                  <TallerAutorizadoCard sede={sede} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
