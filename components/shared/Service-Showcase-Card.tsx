"use client"

import { cn } from "@/lib/utils"
import { SERVICE_SHOWCASE_CARD_PROPS } from "@/types/showcase.types"
import Image from "next/image"

export function ServiceShowcaseCard({
  isActive,
  onMouseEnter,
  service,
}: SERVICE_SHOWCASE_CARD_PROPS) {
  const { description, imageAlt, imageSrc, title } = service

  return (
    <div
      role="group"
      aria-label={title}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl",
        "transition-all duration-500 ease-in-out",
        "w-full",
        isActive ? "h-72" : "h-32",
        "sm:h-105 sm:w-auto",
        isActive ? "sm:flex-[3_3_0%]" : "sm:flex-[1_1_0%]"
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover object-center",
          "transition-transform duration-700 ease-in-out",
          isActive ? "scale-105" : "scale-100"
        )}
        draggable={false}
      />

      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "transition-all duration-500",
          isActive
            ? "bg-linear-to-t from-blue-custom-500/80 via-blue-custom-500/30 to-blue-custom-500/10"
            : "bg-linear-to-t from-blue-custom-500/50 via-blue-custom-500/10 to-transparent"
        )}
        aria-hidden="true"
      />

      <div className="mb:p-8 absolute inset-0 flex flex-col justify-end p-6">
        <h3
          className={cn(
            "font-headOffice-bold leading-tight text-white",
            "transition-all duration-500",
            "text-xl opacity-100",
            isActive
              ? "sm:translate-y-0 sm:text-2xl sm:opacity-100"
              : "sm:-translate-y-1 sm:text-sm sm:opacity-0"
          )}
        >
          {title}
        </h3>

        <div
          className={cn(
            "overflow-hidden",
            "transition-all duration-500 ease-in-out",
            isActive ? "mt-3 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
          )}
        >
          <p className="font-textOffice-regular text-sm leading-relaxed text-white/85 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
