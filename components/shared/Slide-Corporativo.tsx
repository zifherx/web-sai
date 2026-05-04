import { cn } from "@/lib"
import { SLIDE_CARD_PROPS } from "@/types"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SlideCorporativo({ isActive = true, slide }: SLIDE_CARD_PROPS) {
  const { ctaHref, ctaLabel, description, eyebrow, imageAlt, imageSrc, title } =
    slide

  return (
    <div aria-label={title.replace("\n", " ")} aria-hidden={!isActive}>
      <div className="flex flex-col rounded-2xl sm:flex-row">
        {/* Imagen */}
        <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="rounded-t-xl object-cover object-center sm:rounded-t-none sm:rounded-l-2xl"
            priority={isActive}
            draggable={false}
          />
        </div>

        {/* Texto */}
        <div className="flex w-full flex-col justify-center rounded-b-xl bg-blue-custom-500 px-7 py-8 sm:w-1/2 sm:rounded-r-2xl sm:rounded-b-none sm:px-14 sm:py-12">
          {eyebrow && (
            <p
              className={cn(
                "mb-2 font-headOffice-medium text-lg tracking-wide text-white/90",
                "transition-all delay-100 duration-500",
                isActive
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              )}
            >
              {eyebrow}
            </p>
          )}

          <h2
            className={cn(
              "sm::text-4xl font-headOffice-bold text-2xl leading-tight whitespace-pre-line text-white md:text-5xl",
              "transition-all delay-150 duration-500",
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            {title}
          </h2>

          <p
            className={cn(
              "mt-4 font-textOffice-regular text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base",
              "transition-all delay-200 duration-500",
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            {description}
          </p>

          <div
            className={cn(
              "mt-6 sm:mt-8",
              "transition-all delay-300 duration-500",
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <Link
              href={ctaHref}
              className={cn(
                "inline-flex items-center justify-center gap-1 rounded-lg tracking-widest",
                "w-full bg-white px-6 py-3 sm:w-fit",
                "font-headOffice-medium text-sm text-blue-custom-500",
                "transition-colors duration-200 hover:bg-white/90",
                "focus-visible:outline focus-visible:outline-white"
              )}
            >
              {ctaLabel}
              <ChevronRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
