"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useActiveMarcas } from "@/hooks/queries/use-marca"
import { cn } from "@/lib/"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function VehiculosDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data: marcas, isLoading } = useActiveMarcas()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "flex cursor-pointer items-center gap-1.5 px-3 py-2",
          "font-headOffice-medium text-lg text-sky-custom-500 uppercase",
          "transition-colors duration-150 hover:text-sky-custom-700",
          "rounded-md focus-visible:outline focus-visible:outline-sky-custom-300"
        )}
      >
        Vehículos
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={cn(
            "transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Selecciona una marca"
          className={cn(
            "fixed top-16 right-0 left-0 z-50 mx-auto max-w-7xl",
            "border-2 border-gray-custom-300 bg-white shadow-xl shadow-black/10",
            "rounded-2xl",
            "animate-in duration-200 fade-in-0 slide-in-from-top-5"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
            {isLoading && (
              <div className="grid grid-cols-4 px-4 py-5 md:px-8">
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-xl" />
                  ))}
              </div>
            )}

            {!isLoading && (
              <ul className="grid grid-cols-4 gap-x-2 gap-y-3 sm:grid-cols-8">
                {marcas?.map((marca) => (
                  <li key={marca.id}>
                    <Link
                      href={`/catalogo?marca=${marca.slug}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center",
                        "rounded-xl p-2",
                        "transition-colors duration-150",
                        "hover:bg-gray-custom-100",
                        "focus-visible:outline focus-visible:outline-sky-custom-300"
                      )}
                    >
                      <div className="relative h-24 w-full">
                        <Image
                          src={marca.imageUrl}
                          alt={`Logo ${marca.name}`}
                          fill
                          sizes="100px"
                          className="object-contain object-center drop-shadow-sm"
                          draggable={false}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
