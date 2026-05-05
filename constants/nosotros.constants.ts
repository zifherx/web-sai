import { ICodigoConducta, IPilaresSAI, IValoresSection } from "@/types"
import { Award, Handshake, Heart, ShieldCheck, Users } from "lucide-react"

export const PILARES_SAI: IPilaresSAI[] = [
  {
    id: 1,
    title: "Misión",
    content:
      "Brindar soluciones integrales de transporte automotriz, ofreciendo productos y servicios de alta calidad que satisfagan las necesidades y expectativas de nuestros clientes.",
    imageSrc: "mision.jpg",
  },
  {
    id: 2,
    title: "Visión",
    content:
      "Ser reconocidos como el referente y líder indiscutible en el rubro automotriz, destacando por nuestra excelencia en el servicio, calidad de nuestros productos y la satisfacción total de nuestros clientes.",
    imageSrc: "vision.jpg",
  },
  {
    id: 3,
    title: "Políticas de Calidad",
    content:
      "Compromiso de calidad enfocado en la satisfacción total del cliente, cumpliendo los compromisos en la venta de unidades, repuestos y servicio técnico.",
    imageSrc: "calidad.jpg",
  },
]

export const VALORES_SAI: IValoresSection = {
  headingNeutral: "Nuestros",
  headingAccent: "valores",
  subtitle:
    "Te invitamos a vivir nuestros valores, en cada acción y decisión que tomes",
  valores: [
    {
      id: "pasion",
      icon: Heart,
      title: "PASIÓN",
      description: "Trabajamos con ganas, disfrutamos lo que hacemos.",
      variant: "light",
    },
    {
      id: "excelencia",
      icon: Award,
      title: "EXCELENCIA",
      description: "Hacemos las cosas bien, y a la primera.",
      variant: "dark",
    },
    {
      id: "respeto",
      icon: Handshake,
      title: "RESPETO",
      description: "Vemos y valoramos al otro como persona.",
      variant: "light",
    },
    {
      id: "colaboracion",
      icon: Users,
      title: "COLABORACIÓN",
      description: "Enfrentamos los desafíos como un solo equipo.",
      variant: "dark",
    },
    {
      id: "integridad",
      icon: ShieldCheck,
      title: "INTEGRIDAD",
      description: "Generamos confianza haciendo lo correcto.",
      variant: "light",
    },
  ],
}

export const CODIGOS_CONDUCTA_SAI: ICodigoConducta = {
  headingNeutral: "Códigos de",
  headingAccent: "conducta Automotores Inka",
  codigos: [
    {
      id: "codigo-01",
      text: "Es la guía que nos acompaña para llevar a cabo **nuestros negocios de manera correcta.** Rige todas las decisiones y acciones, ya sea al interior de nuestra empresa como ante el mercado, a la hora de vender nuestros productos y relacionarnos con nuestros **clientes, proveedores, autoridades y competidores.**",
    },
    {
      id: "codigo-02",
      text: "Cada uno de quienes conforman el equipo de Automotores Inka está comprometido con adoptar y actuar en virtud de estos códigos de conducta, manteniendo así una **cultura de excelencia ética.**",
    },
    {
      id: "codigo-03",
      text: "Automotores Inka es una garantía y un respaldo de **actuar ético para todas las personas** con las que nos relacionamos.",
    },
  ],
}
