import {
  IRepsolCTA,
  IRepsolHero,
  IRepsolInfo,
  IRepsolVentaja,
  IRepsolVideo,
} from "@/types"

export const REPSOL_HERO: IRepsolHero = {
  eyebrow: "Con Automotores Inka",
  heading: "Ahorra en cada viaje",
  imageSrc: "/images/repsol/banner-repsol-2.png",
  imageAlt: "Grifo Repsol — Ahorra en cada viaje con Automotores Inka",
}

export const REPSOL_INFO: IRepsolInfo = {
  headingNeutral: "Descubre",
  headingAccent: "nuestros beneficios",
  description:
    "Ahorra más en cada carga de combustible con nuestros descuentos exclusivos, además de acceder a beneficios adicionales pensados para ti, que hacen cada recarga más conveniente y rentable.",
}

export const REPSOL_VENTAJAS: IRepsolVentaja = {
  heading: "Ventajas",
  imageSrc: "/images/repsol/gasoil-station.jpg",
  imageAlt: "Persona en grifo con su smartphone — ventajas Repsol",
  items: [
    { id: "ahorro", label: "Ahorro en combustible" },
    { id: "variedad", label: "Variedad de combustibles cubiertos" },
    { id: "descuentos", label: "Descuentos exclusivos" },
    {
      id: "cobertura",
      label: "Cobertura en las principales ciudades del país",
    },
  ],
}

export const REPSOL_CTA: IRepsolCTA = {
  cta: "ÚNETE AHORA",
  ctaHref:
    "https://repsolperu.everilion.com/ILIONX45/Custom/RepsolPeru/Fidelizacion/LoginProgramaFidelizacion.aspx",
  heading: "Y obtén beneficios",
}

export const REPSOL_VIDEO: IRepsolVideo = {
  headingNeutral: "¿Cómo registrarse",
  headingAccent: "correctamente?",
  videoYoutube: {
    id: "video-01",
    src: "https://www.youtube.com/embed/TeOQkZHOoxw",
    title: "Primera Solicitud Repsol Más",
  },
}
