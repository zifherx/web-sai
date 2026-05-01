import {
  IRepsolBeneficio,
  IRepsolCTA,
  IRepsolHero,
  IRepsolInfo,
  IRepsolVentaja,
  IRepsolVideo,
} from "@/types/repsol.types"
import { BadgeCheck } from "lucide-react"

export const REPSOL_HERO: IRepsolHero = {
  eyebrow: "Con Automotores Inka",
  heading: "Ahorra en cada viaje",
  imageSrc: "/images/repsol/banner-repsol.png",
  imageAlt: "Grifo Repsol — Ahorra en cada viaje con Automotores Inka",
}

export const REPSOL_INFO: IRepsolInfo = {
  headingNeutral: "Descubre",
  headingAccent: "nuestros beneficios",
  description:
    "Ahorra más en cada carga de combustible con nuestros descuentos exclusivos, además de acceder a beneficios adicionales pensados para ti, que hacen cada recarga más conveniente y rentable.",
}

export const REPSOL_BENEFICIOS: IRepsolBeneficio = {
  imageSrc: "/images/repsol/gas-station.jpg",
  imageAlt: "Pistola de combustible en grifo Repsol",
  descuentos: [
    { tipo: "Premier y Regular", monto: "S/ 2.50" },
    { tipo: "Diesel", monto: "S/ 0.50" },
    { tipo: "GLP", monto: "S/ 0.20" },
  ],
  cobertura: [
    { ciudad: "Lima" },
    { ciudad: "Chimbote" },
    { ciudad: "Trujillo" },
    { ciudad: "Chiclayo" },
  ],
  beneficiosAdicionales: {
    label: "Beneficios Adicionales",
    icon: BadgeCheck,
  },
}

export const REPSOL_VENTAJAS: IRepsolVentaja = {
  heading: "Ventajas",
  imageSrc: "/images/repsol/person-station.jpg",
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
  ctaHref: "/financia-tu-auto",
  heading: "Y obtén beneficios",
}

export const REPSOL_VIDEO: IRepsolVideo = {
  headingNeutral: "¿Cómo registrarse",
  headingAccent: "correctamente?",
  videoYoutube: {
    id: "video-01",
    src: "https://www.youtube.com/embed/Ki7mwbj0li0?si=2p8twtnYNMYygW9s",
    title: "Primera Solicitud Repsol Más",
  },
}
