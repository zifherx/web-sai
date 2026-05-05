import { IFooter } from "@/types"

export const FOOTER_CONSTANTS: IFooter = {
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
        { label: "Financiamiento", href: "/comercial/financiamiento" },
        {
          label: "Flota corporativa",
          href: "/comercial/soluciones-corporativas",
        },
        { label: "Agenda una cita", href: "/posventa/separa-tu-cita" },
        { label: "Talleres / Mantenimiento", href: "/posventa/talleres" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Accesibilidad", href: "/legal/accesibilidad" },
        { label: "Copyright", href: "/legal/copyright" },
        { label: "Promociones", href: "/legal/promociones" },
        {
          label: "Términos y condiciones",
          href: "/legal/terminos-condiciones",
        },
      ],
    },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/dealer.automotoresinka",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/automotoresinka",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/automotoresinka",
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@automotoresinka",
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
