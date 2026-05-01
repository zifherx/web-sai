import { ICarouselCorporativo } from "../interfaces"
import { IServiceShowcase, IVehicleShowcase } from "../types/showcase.types"

export const CARRUSEL_CORPORATIVO: ICarouselCorporativo = {
  autoplayInterval: 5000,
  slides: [
    {
      id: "soluciones-corporativas",
      eyebrow: "Automotores Inka |",
      title: "Soluciones \nCorporativas",
      description:
        "En Automotores Inka brindamos soluciones corporativas flexibles que se adaptan a la operación de tu empresa. Acompañamos la gestión de tu flota con atención coordinada, respaldo oportuno y servicios diseñados para optimizar tiempos y asegurar la continuidad de tu negocio.",
      ctaLabel: "Únete",
      ctaHref: "/comercial/soluciones-corporativas",
      imageSrc: "/images/fondo-corporativo.png",
      imageAlt: "Concesionaria Automotores Inka",
    },
    {
      id: "beneficio-repsol",
      eyebrow: "Automotores Inka |",
      title: "Descubre nuestros \nBeneficios",
      description:
        "Ahorra más en cada carga de combustible con nuestros descuentos exclusivos, además de acceder a beneficios adicionales pensados para ti, que hacen cada recarga más conveniente y rentable.",
      ctaLabel: "Únete",
      ctaHref: "/comercial/beneficios-repsol",
      imageSrc: "/images/banner-repsol2.png",
      imageAlt:
        "Grifo Repsol - beneficios exclusivos para clientes Automotores Inka",
    },
  ],
}

export const MIATA_MX5_SHOWCASE: IVehicleShowcase = {
  headingAccent: "Mazda MX-5:",
  headingMain: "El placer de la Libertad",
  ctaLabel: "VER MÁS",
  ctaHref: "/catalogo/mazda/mx-5",
  mainImage: {
    src: "/images/showcase/mazda-mx5-main.png",
    alt: "Mazda MX-5 rojo en paisaje montañoso",
  },
  features: [
    {
      id: "asientos-anatomicos",
      title: "Asientos Anatómicos",
      description: "Cubiertas de cuero para una experiencia premium.",
      imageSrc: "/images/showcase/mazda-mx5-interior.png",
      imageAlt: "Interior con asientos anatómicos de cuero del Mada MX-5",
    },
    {
      id: "diseno-descapotable",
      title: "Diseño Descapotable",
      description: "Su techo se puede descapotar con una sola mano.",
      imageSrc: "/images/showcase/mazda-mx5-roof.png",
      imageAlt: "Techo descapotable del Mazda MX-5 visto desde arriba",
    },
    {
      id: "liviano-agil",
      title: "Liviano y Ágil",
      description: "Más aerodinámico y 64 kg más liviano premium.",
      imageSrc: "/images/showcase/mazda-mx5-side.png",
      imageAlt: "Mazda MX-5 gris en carretera de montaña",
    },
    {
      id: "transmision-deportiva",
      title: "Transmisión Deportiva",
      description: "Cuenta con una caja de 6 velocidades.",
      imageSrc: "/images/showcase/mazda-mx5-white.png",
      imageAlt: "Mazda MX-5 blanco mostrando su perfil deportivo",
    },
  ],
}

export const SERVICE_SHOWCASE: IServiceShowcase = {
  headingNeutral: "Nuestros",
  headingAccent: "Servicios",
  services: [
    {
      id: "asesores-especializados",
      title: "Asesores Especializados",
      description:
        "Te ayudamos a elegir el vehículo ideal según tus necesidades y presupuesto, brindándote acompañamiento y confianza durante todo el proceso de compra.",
      imageSrc: "/images/servicios/asesores-especializados.png",
      imageAlt:
        "Asesores especializados asesorando a un cliente en la compra de un vehículo",
      href: "/servicios/asesores",
    },
    {
      id: "post-venta",
      title: "Servicios Post venta",
      description:
        "Servicio orientado a brindarte soporte, mantenimiento y atención continua para asegurar el mejor rendimiento de tu vehículo.",
      imageSrc: "/images/servicios/posventa.png",
      imageAlt:
        "Técnico realizando mantenimiento de vehículo en taller elevado",
      href: "/servicios/post-venta",
    },
    {
      id: "seguros-glp",
      title: "Seguros y GLP",
      description:
        "Asesoría en seguros vehiculares e instalación de GLP, brindando ahorro, seguridad y tranquilidad para tu vehículo.",
      imageSrc: "/images/servicios/seguros-glp.png",
      imageAlt:
        "Manos protegiendo un vehículo en miniatura, representando seguros",
      href: "/servicios/seguros-glp",
    },
    {
      id: "repuestos-accesorios",
      title: "Repuestos y accesorios",
      description:
        "Venta de repuestos y accesorios originales para mantener tu vehículo en óptimas condiciones y con el mejor rendimiento.",
      imageSrc: "/images/servicios/repuestos-accesorios.png",
      imageAlt: "Repuestos y accesorios automotrices originales",
      href: "/servicios/repuestos",
    },
  ],
}
