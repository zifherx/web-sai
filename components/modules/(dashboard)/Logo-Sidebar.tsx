"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib"
import { Building2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function LogoSidebar() {
  const { open } = useSidebar()
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="mb-4 flex items-center justify-center px-2">
        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-primary/10",
            open ? "h-16 w-16" : "h-12 w-12"
          )}
        >
          <Building2
            className={cn("text-primary", open ? "h-8 w-8" : "h-6 w-6")}
          />
        </div>
        {open && (
          <div className="ml-3">
            <h1 className="text-base font-bold text-gray-800">
              Automotores Inka
            </h1>
            <p className="text-xs text-gray-500">Panel Administrativo</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`mb-4 flex items-center transition-all duration-200 ${open ? "justify-start px-2" : "justify-center"}`}
    >
      {open ? (
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0">
            <Image
              src="/assets/logos/logo-color.png"
              alt="Logo Automotores Inka"
              fill
              className="rounded-full object-cover"
              priority
              onError={() => setImageError(true)}
              sizes="56px"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base leading-tight font-bold text-gray-800">
              Automotores Inka
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">Panel Administrativo</p>
          </div>
        </div>
      ) : (
        <div className="relative h-10 w-10">
          <Image
            src="/assets/logos/logo-color.png"
            alt="Logo Automotores Inka"
            fill
            className="rounded-full object-cover"
            priority
            onError={() => setImageError(true)}
            sizes="40px"
          />
        </div>
      )}
    </div>
  )
}
