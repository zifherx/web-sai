import { BrandCarousel } from "@/components/modules/(home)/Brand-Carousel"
import { CarruselCorporativo } from "@/components/modules/(home)/Carrusel-Corporativo"
import { HeroSection } from "@/components/modules/(home)/Hero-Section"
import { MasVendidos } from "@/components/modules/(home)/Mas-Vendidos"
import { ServiceShowcase } from "@/components/modules/(home)/Service-Showcase"
import { TalleresAutorizados } from "@/components/modules/(home)/Talleres-Autorizados"
import { VehicleSearchBar } from "@/components/modules/(home)/Vehicle-SearchBar"
import { VehicleShowcase } from "@/components/modules/(home)/Vehicle-Showcase"
import { MIATA_MX5_SHOWCASE, SERVICE_SHOWCASE } from "@/constants"

export function HomeView() {
  return (
    <div>
      <div className="relative pb-0 sm:pb-20">
        <HeroSection />
        <VehicleSearchBar />
      </div>
      <BrandCarousel />
      <MasVendidos />
      <ServiceShowcase service={SERVICE_SHOWCASE} />
      <TalleresAutorizados />
      <VehicleShowcase showcase={MIATA_MX5_SHOWCASE} />
      <CarruselCorporativo />
    </div>
  )
}
