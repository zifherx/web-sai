import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa"
import { FooterConstants } from "../interfaces"

export const FOOTER_CONSTANTS: FooterConstants = {
  brand: {
    logoSrc: "/assets/logos/logo-blanco.png",
    logoAlt: "Automotores Inka",
    href: "/",
  },
  sections: [
    {
      heading: "Nosotros",
      links: [
        { label: "La empresa", href: "/nosotros/empresa" },
        { label: "Úbicanos", href: "/nosotros/ubicanos" },
        {
          label: "Trabaja con nosotros",
          href: "https://pe.computrabajo.com/sociedad%20de%20automotores%20inka%20sac/empleos",
        },
      ],
    },
    {
      heading: "Servicios",
      links: [
        { label: "Financiamiento", href: "/servicios/financiamiento" },
        {
          label: "Flota corporativa",
          href: "/comercial/soluciones-corporativas",
        },
        // { label: "Asesoría personalizada", href: "/servicios/asesoria" },
        { label: "Talleres / Mantenimiento", href: "/servicios/talleres" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Accesibilidad", href: "/legal/accesibilidad" },
        { label: "Copyright", href: "/legal/copyright" },
        { label: "Promociones", href: "/legal/promociones" },
        { label: "Términos y condiciones", href: "/legal/terminos" },
      ],
    },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/dealer.automotoresinka",
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/automotoresinka",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/automotoresinka",
      icon: FaLinkedinIn,
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@automotoresinka",
      icon: FaTiktok,
    },
  ],
  complaints: {
    label: "LIBRO DE\nRECLAMACIONES",
    href: "/libro-de-reclamaciones",
    icon: "complaints-book",
  },
  bottomBar: {
    copyright: `© ${new Date().getFullYear()} SOCIEDAD AUTOMOTORES INKA S.A.C.`,
    designedBy: {
      label: "DISEÑADO POR",
      author: "ZIPHONEX",
      href: "https://ziphonex.com",
    },
  },
}
