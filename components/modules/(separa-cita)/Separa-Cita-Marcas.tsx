"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useActiveMarcas } from "@/hooks"
import Image from "next/image"

export function SeparaCitaMarcas() {
  const { data: marcas, isLoading } = useActiveMarcas()

  return (
    <div className="w-full">
      <p className="mb-4 font-headOffice-medium text-sm tracking-widest text-gray-custom-900 uppercase">
        Marcas disponibles
      </p>

      <div className="grid grid-cols-3 gap-3 md:grid-cols-3">
        {isLoading &&
          Array(9)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}

        {!isLoading &&
          marcas?.map((marca) => (
            <div
              key={marca.id}
              title={marca.name}
              className="flex items-center justify-center rounded-xl border border-gray-custom-300/40 bg-white p-3"
            >
              <Image
                src={marca.imageUrl}
                alt={marca.name}
                width={80}
                height={40}
                className="h-28 w-full object-contain drop-shadow-sm"
                draggable={false}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
