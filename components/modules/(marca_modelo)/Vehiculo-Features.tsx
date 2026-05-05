"use client"

import { SpecItem } from "@/components/shared/Spec-Item"
import { TAB_LABELS } from "@/constants"
import { cn } from "@/lib"
import { ITab, VEHICULO_FEATURES_PROPS } from "@/types"
import { useState } from "react"

export function VehiculoFeatures({ features }: VEHICULO_FEATURES_PROPS) {
  const [activeTab, setActiveTab] = useState<ITab>("feature1")

  const items = features[activeTab] ?? []

  return (
    <section className="w-full bg-gray-custom-100 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Tabs */}
        <div className="mb-14 flex justify-center">
          <div className="inline-flex overflow-hidden rounded-2xl">
            {(["feature1", "feature2"] as ITab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                // aria-selected={activeTab === tab}
                className={cn(
                  "px-10 py-3.5 font-headOffice-medium text-sm transition-all duration-200",
                  activeTab === tab
                    ? "bg-blue-custom-500 text-white"
                    : "bg-sky-custom-300 text-white/80 hover:bg-sky-custom-500"
                )}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de specs */}
        {items.length > 0 ? (
          <div
            className={cn(
              "grid gap-0",
              "divide-x divide-gray-custom-300",
              items.length <= 2
                ? "grid-cols-2"
                : items.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2 md:grid-cols-4"
            )}
          >
            {items.map((spec, i) => (
              <SpecItem key={i} spec={spec} />
            ))}
          </div>
        ) : (
          <p className="text-center font-textOffice-regular text-sm text-gray-custom-500">
            Sin especificaciones disponibles
          </p>
        )}
      </div>
    </section>
  )
}
