"use client"

import { ServiceShowcaseCard } from "@/components/shared/Service-Showcase-Card"
import { cn } from "@/lib"
import { SERVICE_SHOWCASE_PROPS } from "@/types"
import { useState } from "react"

export function ServiceShowcase({ service }: SERVICE_SHOWCASE_PROPS) {
  const { headingAccent, headingNeutral, services } = service

  const [activeId, setActiveId] = useState<string>(services[0].id)

  return (
    <section
      className="w-full bg-sky-custom-50 py-12 sm:py-16"
      aria-label="Nuestros Servicios"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="mb-8 text-center font-headOffice-bold text-3xl sm:text-4xl md:text-left">
          <span className="text-gray-custom-900">{headingNeutral}</span>{" "}
          <span className="text-sky-custom-500">{headingAccent}</span>
        </h2>

        <div
          className={cn(
            "flex flex-col gap-3",
            "sm:flex-row sm:overflow-hidden"
          )}
          role="list"
          aria-label="Lista de servicios"
        >
          {services.map((service) => (
            <ServiceShowcaseCard
              key={service.id}
              service={service}
              isActive={service.id === activeId}
              onMouseEnter={() => setActiveId(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
