import { cn } from "@/lib/utils"
import { REPSOL_CTA_PROPS } from "@/types/repsol.types"
import Link from "next/link"

export function RepsolCTA({ callToAction }: REPSOL_CTA_PROPS) {
  const { cta, ctaHref, heading } = callToAction

  return (
    <section className="w-full bg-sky-custom-700">
      <div className="mx-auto max-w-5xl px-4 py-4 md:px-8 md:py-10">
        <div className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:py-12 md:text-left">
          {/* Botón CTA */}
          <Link
            href={ctaHref}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-xl",
              "border-2 border-white bg-transparent px-8 py-3.5",
              "font-headOffice-medium text-2xl tracking-widest text-white uppercase",
              "transition-all duration-200 hover:bg-white hover:text-blue-custom-500",
              "focus-visible:outline focus-visible:outline-white"
            )}
          >
            {cta}
          </Link>

          {/* Heading */}
          <h2 className="font-textOffice-bold text-3xl text-white md:text-5xl lg:text-6xl">
            {heading}
          </h2>
        </div>
      </div>
    </section>
  )
}
