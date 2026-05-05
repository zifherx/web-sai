import { CORPORATIVO_HERO_PROPS } from "@/types"
import Image from "next/image"

export function CorporativoHero({ hero }: CORPORATIVO_HERO_PROPS) {
  const { eyebrow, heading, imageAlt, imageSrc } = hero

  return (
    <section className="relative h-100 w-full overflow-hidden md:h-186">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

      <div className="absolute inset-0 flex flex-col items-start justify-center px-4">
        <div className="mx-auto -mt-30 text-center sm:-mt-52">
          <p className="font-headOffice-medium text-lg text-blue-custom-500 md:text-2xl">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-headOffice-bold text-2xl leading-tight text-blue-custom-500 md:text-6xl lg:text-7xl">
            {heading}
          </h1>
        </div>
      </div>
    </section>
  )
}
