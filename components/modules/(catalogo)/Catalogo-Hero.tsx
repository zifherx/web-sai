import Image from "next/image"

export function CatalogoHero() {
  return (
    <section className="relative h-150 w-full overflow-hidden md:h-170">
      <Image
        src="/images/catalogo/banner-auto.png"
        alt="Vehículo Automotores Inka en carretera"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
    </section>
  )
}
