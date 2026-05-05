import { BreadcrumbUbicanos } from "@/components/shared/Breadcrumb-Ubicanos"

export function MapaHero() {
  return (
    <section className="md: w-full bg-[#ECF1F9] py-12 md:py-16">
      <BreadcrumbUbicanos />

      <h1 className="mb-6 text-center font-headOffice-bold text-3xl text-gray-custom-900 md:text-4xl">
        Conoces nuestra red de atención
      </h1>

      <div className="relative h-105 w-full overflow-hidden md:h-125">
        <iframe
          title="Red de atención Automotores Inka"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4!2d-77.0282!3d-12.1219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA3JzE4LjkiUyA3N8KwMDEnNDEuNSJX!5e0!3m2!1ses!2spe!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      </div>

      <div className="h-16 bg-gray-custom-100" />
    </section>
  )
}
