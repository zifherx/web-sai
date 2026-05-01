import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "../../../lib/utils"
import { VEHICLE_SHOWCASE_PROPS } from "../../../types/showcase.types"
import { FeatureShowcaseCard } from "../../shared/Feature-Showcase-Card"

export function VehicleShowcase({ showcase }: VEHICLE_SHOWCASE_PROPS) {
  const { ctaHref, ctaLabel, features, headingAccent, headingMain, mainImage } =
    showcase

  return (
    <section
      aria-label={`${headingAccent} ${headingMain}`}
      className="w-full py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-headOffice-bold text-xl leading-tight text-sky-custom-500 md:text-4xl">
              {headingAccent}
            </h2>
            <p className="font-headOffice-medium text-xl leading-tight text-gray-custom-900 md:text-4xl">
              {headingMain}
            </p>
          </div>

          <Link
            href={ctaHref}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg sm:rounded-xl",
              "border-2 border-sky-custom-500 px-3 py-1.5 sm:px-6 sm:py-3",
              "font-headOffice-bold text-xs tracking-widest text-sky-custom-500 sm:text-sm",
              "transition-all duration-200",
              "hover:border-blue-custom-500 hover:bg-blue-custom-500 hover:text-white",
              "focus-visible:outline focus-visible:outline-blue-custom-500"
            )}
          >
            {ctaLabel}
            <ChevronRight
              size={16}
              className="text-base leading-none"
              aria-hidden="true"
              strokeWidth={3}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:h-140 md:grid-cols-[55fr_45fr]">
          <div className="group relative h-95 overflow-hidden rounded-2xl md:h-full">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className={cn(
                "object-cover object-center",
                "transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]",
                "group-hover:scale-[1.05]"
              )}
              priority
              draggable={false}
            />
          </div>

          <div className="grid-row-2 grid h-95 grid-cols-2 gap-3 md:h-full">
            {features.map((feature) => (
              <FeatureShowcaseCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
