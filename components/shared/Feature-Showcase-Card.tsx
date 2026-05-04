import { cn } from "@/lib/"
import { FEATURE_SHOWCASE_CARD_PROPS } from "@/types"
import Image from "next/image"

export function FeatureShowcaseCard({ feature }: FEATURE_SHOWCASE_CARD_PROPS) {
  const { description, imageAlt, imageSrc, title } = feature

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl">
      <div className="relative h-full w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, 22vw"
          className={cn(
            "object-cover object-center",
            "transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]",
            "group-hover:scale-[1.07]"
          )}
          draggable={false}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-linear-to-t from-black/72 via-black/18 to-transparent",
          "transition-opacity duration-300",
          "group-hover:opacity-90"
        )}
      />

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 p-4">
        <h3 className="font-headOffice-bold text-base leading-tight text-white md:text-lg">
          {title}
        </h3>
        <p className="mt-1 font-textOffice-regular text-xs leading-snug text-white/82 md:text-sm">
          {description}
        </p>
      </div>
    </div>
  )
}
