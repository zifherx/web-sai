import {
  ICharLimit,
  IDepartamento,
  IMonedaOption,
  IReclamoTipoSolicitud,
  ITipoBien,
  ITipoDocumentoReclamoOption,
} from "@/types"
import z from "zod/v3"

export const ReclamoSchema = z
  .object({
    // 1. Identificación del consumidor
    tipoDocumento: z.enum(["dni", "ce", "pasaporte", "ruc"], {
      required_error: "Selecciona un tipo de documento",
    }),
    numeroDocumento: z
      .string({ required_error: "El número de documento es requerido" })
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres"),
    nombres: z
      .string({ required_error: "Los nombres son requeridos" })
      .min(2, "Mínimo 2 caracteres"),
    apellidos: z
      .string({ required_error: "Los apellidos son requeridos" })
      .min(2, "Mínimo 2 caracteres"),
    // Contacto (al menos uno requerido — validado con refine)
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    celular: z
      .string()
      .regex(/^9\d{8}$/, "Celular inválido")
      .optional()
      .or(z.literal("")),
    direccion: z.string().optional().or(z.literal("")),
    // Ubicación
    departamento: z.string().optional(),
    provincia: z.string().optional(),
    distrito: z.string().optional(),
    // 2. Identificación del bien
    tipoBien: z.enum(["producto", "servicio"], {
      required_error: "Selecciona el tipo de bien",
    }),
    vin: z.string().optional(),
    placa: z.string().optional(),
    sedeCompra: z.string({ required_error: "Selecciona una sede" }).min(1),
    sedeCodexHR: z.string().optional(),
    moneda: z.string().optional(),
    importeBien: z.number().optional(),
    descripcionBien: z
      .string({ required_error: "La descripción es requerida" })
      .max(220, "Máximo 220 caracteres"),
    // 3. Detalle del reclamo
    tipoSolicitud: z.enum(["reclamo", "queja"], {
      required_error: "Selecciona el tipo de solicitud",
    }),
    detalleSolicitud: z
      .string({ required_error: "El detalle es requerido" })
      .min(10, "Mínimo 10 caracteres")
      .max(500, "Máximo 500 caracteres"),
    pedidoSolicitud: z
      .string({ required_error: "El pedido es requerido" })
      .min(10, "Mínimo 10 caracteres")
      .max(500, "Máximo 500 caracteres"),
    isConforme: z.boolean().refine((v) => v === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine(
    (data) =>
      (data.email && data.email.length > 0) ||
      (data.celular && data.celular.length > 0) ||
      (data.direccion && data.direccion.length > 0),
    {
      message:
        "Debes ingresar al menos un medio de contacto: email, celular o dirección",
      path: ["contactInfo"],
    }
  )

export type ReclamoData = z.infer<typeof ReclamoSchema>

export const TIPO_DOCUMENTO_RECLAMO_OPTIONS: ITipoDocumentoReclamoOption[] = [
  { value: "dni", label: "DNI — Documento Nacional de Identidad" },
  { value: "ce", label: "CE — Carné de Extranjería" },
  { value: "pasaporte", label: "Pasaporte" },
  { value: "ruc", label: "RUC — Registro Único de Contribuyentes" },
]

export const DOC_MAX_LENGTH_RECLAMO: Record<string, number> = {
  dni: 8,
  ce: 12,
  pasaporte: 15,
  ruc: 11,
}

export const MONEDA_RECLAMO_OPTIONS: IMonedaOption[] = [
  { value: "pen", label: "🇵🇪 Soles Peruanos (PEN)" },
  { value: "usd", label: "🇺🇸 Dólares Americanos (USD)" },
]

export const CHAR_LIMITS_RECLAMO: ICharLimit = {
  descripcionBien: 220,
  detalleSolicitud: 500,
  pedidoSolicitud: 500,
}

export const LISTA_DEPARTAMENOS_RECLAMOS: IDepartamento[] = [
  {
    id: 1,
    name: "Amazonas",
    value: "amazonas",
    provincias: [
      {
        id: 1,
        name: "Chachapoyas",
        value: "chachapoyas",
      },
      {
        id: 2,
        name: "Bagua",
        value: "bagua",
      },
      {
        id: 3,
        name: "Bongara",
        value: "bongara",
      },
      {
        id: 4,
        name: "Condorcanqui",
        value: "condorcanqui",
      },
      {
        id: 5,
        name: "Luya",
        value: "luya",
      },
      {
        id: 6,
        name: "Rodriguez de Mendoza",
        value: "rodriguez-de-mendoza",
      },
      {
        id: 7,
        name: "Utcubamba",
        value: "utcubamba",
      },
    ],
  },
  {
    id: 2,
    name: "Ancash",
    value: "ancash",
    provincias: [
      {
        id: 1,
        name: "Huaraz",
        value: "huaraz",
      },
      {
        id: 2,
        name: "Aija",
        value: "aija",
      },
      {
        id: 3,
        name: "Antonio Raymondi",
        value: "antonio-raymondi",
      },
      {
        id: 4,
        name: "Asuncion",
        value: "asuncion",
      },
      {
        id: 5,
        name: "Bolognesi",
        value: "bolognesi",
      },
      {
        id: 6,
        name: "Carhuaz",
        value: "carhuaz",
      },
      {
        id: 7,
        name: "Carlos Fitzcarrald",
        value: "carlos-fitzcarrald",
      },
      {
        id: 8,
        name: "Casma",
        value: "casma",
      },
      {
        id: 9,
        name: "Corongo",
        value: "corongo",
      },
      {
        id: 10,
        name: "Huari",
        value: "huari",
      },
      {
        id: 11,
        name: "Huarmey",
        value: "huarmey",
      },
      {
        id: 12,
        name: "Huaylas",
        value: "huaylas",
      },
      {
        id: 13,
        name: "Mariscal Luzuriaga",
        value: "mariscal-luzuriaga",
      },
      {
        id: 14,
        name: "Ocros",
        value: "ocros",
      },
      {
        id: 15,
        name: "Pallasca",
        value: "pallasca",
      },
      {
        id: 16,
        name: "Pomabamba",
        value: "pomabamba",
      },
      {
        id: 17,
        name: "Recuay",
        value: "recuay",
      },
      {
        id: 18,
        name: "Santa",
        value: "santa",
      },
      {
        id: 19,
        name: "Sihuas",
        value: "Sihuas",
      },
      {
        id: 20,
        name: "Yungay",
        value: "yungay",
      },
    ],
  },
  {
    id: 3,
    name: "Apurimac",
    value: "apurimac",
    provincias: [
      {
        id: 1,
        name: "Abancay",
        value: "abancay",
      },
      {
        id: 2,
        name: "Andahuaylas",
        value: "andahuaylas",
      },
      {
        id: 3,
        name: "Antabamba",
        value: "antabamba",
      },
      {
        id: 4,
        name: "Aymaraes",
        value: "aymaraes",
      },
      {
        id: 5,
        name: "Cotabambas",
        value: "cotabambas",
      },
      {
        id: 6,
        name: "Chincheros",
        value: "chincheros",
      },
      {
        id: 7,
        name: "Grau",
        value: "grau",
      },
    ],
  },
  {
    id: 4,
    name: "Arequipa",
    value: "arequipa",
    provincias: [
      {
        id: 1,
        name: "Arequipa",
        value: "arequipa",
      },
      {
        id: 2,
        name: "Camana",
        value: "camana",
      },
      {
        id: 3,
        name: "Caraveli",
        value: "caraveli",
      },
      {
        id: 4,
        name: "Castilla",
        value: "castilla",
      },
      {
        id: 5,
        name: "Caylloma",
        value: "caylloma",
      },
      {
        id: 6,
        name: "Condesuyos",
        value: "condesuyos",
      },
      {
        id: 7,
        name: "Islay",
        value: "islay",
      },
      {
        id: 8,
        name: "La Union",
        value: "la-union",
      },
    ],
  },
  {
    id: 5,
    name: "Ayacucho",
    value: "ayacucho",
    provincias: [
      {
        id: 1,
        name: "Huamanga",
        value: "huamanga",
      },
      {
        id: 2,
        name: "Cangallo",
        value: "cangallo",
      },
      {
        id: 3,
        name: "Huanca Sancos",
        value: "huanca-sancos",
      },
      {
        id: 4,
        name: "Huanta",
        value: "huanta",
      },
      {
        id: 5,
        name: "La Mar",
        value: "la-mar",
      },
      {
        id: 6,
        name: "Lucanas",
        value: "lucanas",
      },
      {
        id: 7,
        name: "Parinacochas",
        value: "parinacochas",
      },
      {
        id: 8,
        name: "Paucar del Sara Sara",
        value: "paucar-de-sara-sara",
      },
      {
        id: 9,
        name: "Sucre",
        value: "sucre",
      },
      {
        id: 10,
        name: "Victor Fajardo",
        value: "victor-fajardo",
      },
      {
        id: 11,
        name: "Vilcas Huaman",
        value: "vilcas-huaman",
      },
    ],
  },
  {
    id: 6,
    name: "Cajamarca",
    value: "cajamarca",
    provincias: [
      {
        id: 1,
        name: "Cajamarca",
        value: "cajamarca",
      },
      {
        id: 2,
        name: "Cajabamba",
        value: "cajabamba",
      },
      {
        id: 3,
        name: "Celendin",
        value: "celendin",
      },
      {
        id: 4,
        name: "Chota",
        value: "chota",
      },
      {
        id: 5,
        name: "Contumaza",
        value: "contumaza",
      },
      {
        id: 6,
        name: "Cutervo",
        value: "cutervo",
      },
      {
        id: 7,
        name: "Hualgayoc",
        value: "hualgayoc",
      },
      {
        id: 8,
        name: "Jaen",
        value: "jaen",
      },
      {
        id: 9,
        name: "San Ignacio",
        value: "san-ignacio",
      },
      {
        id: 10,
        name: "San Marcos",
        value: "san-marcos",
      },
      {
        id: 11,
        name: "San Miguel",
        value: "san-miguel",
      },
      {
        id: 12,
        name: "San Pablo",
        value: "san-pablo",
      },
      {
        id: 13,
        name: "Santa Cruz",
        value: "santa-cruz",
      },
    ],
  },
  {
    id: 7,
    name: "Callao",
    value: "callao",
    provincias: [],
  },
  {
    id: 8,
    name: "Cusco",
    value: "cusco",
    provincias: [
      {
        id: 1,
        name: "Cusco",
        value: "cusco",
      },
      {
        id: 2,
        name: "Acomayo",
        value: "acomayo",
      },
      {
        id: 3,
        name: "Anta",
        value: "anta",
      },
      {
        id: 4,
        name: "Calca",
        value: "calca",
      },
      {
        id: 5,
        name: "Canas",
        value: "canas",
      },
      {
        id: 6,
        name: "Canchis",
        value: "canchis",
      },
      {
        id: 7,
        name: "Chumbivilcas",
        value: "chumbivilcas",
      },
      {
        id: 8,
        name: "Espinar",
        value: "espinar",
      },
      {
        id: 9,
        name: "La Convencion",
        value: "la-convencion",
      },
      {
        id: 10,
        name: "Paruro",
        value: "paruro",
      },
      {
        id: 11,
        name: "Paucartambo",
        value: "paucartambo",
      },
      {
        id: 12,
        name: "Quispicanchi",
        value: "quispicanchi",
      },
      {
        id: 13,
        name: "Urubamba",
        value: "urubamba",
      },
    ],
  },
  {
    id: 9,
    name: "Huancavelica",
    value: "huancavelica",
    provincias: [
      {
        id: 1,
        name: "Huancavelica",
        value: "huancavelica",
      },
      {
        id: 2,
        name: "Acobamba",
        value: "acobamba",
      },
      {
        id: 3,
        name: "Angaraes",
        value: "angaraes",
      },
      {
        id: 4,
        name: "Castrovirreyna",
        value: "castrovirreyna",
      },
      {
        id: 5,
        name: "Churcampa",
        value: "churcampa",
      },
      {
        id: 6,
        name: "Huaytara",
        value: "huaytara",
      },
      {
        id: 7,
        name: "Tayacaja",
        value: "tayacaja",
      },
    ],
  },
  {
    id: 10,
    name: "Huánuco",
    value: "huanuco",
    provincias: [
      {
        id: 1,
        name: "Huanuco",
        value: "huanuco",
      },
      {
        id: 2,
        name: "Ambo",
        value: "ambo",
      },
      {
        id: 3,
        name: "Dos de Mayo",
        value: "dos-de-mayo",
      },
      {
        id: 4,
        name: "Huacaybamba",
        value: "huacaybamba",
      },
      {
        id: 5,
        name: "Huamalies",
        value: "huamalies",
      },
      {
        id: 6,
        name: "Leoncio Prado",
        value: "leoncio-prado",
      },
      {
        id: 7,
        name: "Marañon",
        value: "maranon",
      },
      {
        id: 8,
        name: "Pachitea",
        value: "pachitea",
      },
      {
        id: 9,
        name: "Puerto Inca",
        value: "puerto-inca",
      },
      {
        id: 10,
        name: "Lauricocha",
        value: "lauricocha",
      },
      {
        id: 11,
        name: "Yarowilca",
        value: "yarowilca",
      },
    ],
  },
  {
    id: 11,
    name: "Ica",
    value: "ica",
    provincias: [
      {
        id: 1,
        name: "Ica",
        value: "ica",
      },
      {
        id: 2,
        name: "Chincha",
        value: "chincha",
      },
      {
        id: 3,
        name: "Nazca",
        value: "nazca",
      },
      {
        id: 4,
        name: "Palpa",
        value: "palpa",
      },
      {
        id: 5,
        name: "Pisco",
        value: "pisco",
      },
    ],
  },
  {
    id: 12,
    name: "Junin",
    value: "junin",
    provincias: [
      {
        id: 1,
        name: "Huancayo",
        value: "huancayo",
      },
      {
        id: 2,
        name: "Concepcion",
        value: "concepcion",
      },
      {
        id: 3,
        name: "Chanchamayo",
        value: "chanchamayo",
      },
      {
        id: 4,
        name: "Jauja",
        value: "jauja",
      },
      {
        id: 5,
        name: "Junin",
        value: "junin",
      },
      {
        id: 6,
        name: "Satipo",
        value: "satipo",
      },
      {
        id: 7,
        name: "Tarma",
        value: "tarma",
      },
      {
        id: 8,
        name: "Yauli",
        value: "yauli",
      },
      {
        id: 9,
        name: "Chupaca",
        value: "chupaca",
      },
    ],
  },
  {
    id: 13,
    name: "La Libertad",
    value: "la-libertad",
    provincias: [
      {
        id: 1,
        name: "Trujillo",
        value: "trujillo",
      },
      {
        id: 2,
        name: "Ascope",
        value: "ascope",
      },
      {
        id: 3,
        name: "Bolivar",
        value: "bolivar",
      },
      {
        id: 4,
        name: "Chepen",
        value: "chepen",
      },
      {
        id: 5,
        name: "Julcan",
        value: "julcan",
      },
      {
        id: 6,
        name: "Otuzco",
        value: "otuzco",
      },
      {
        id: 7,
        name: "Pacasmayo",
        value: "pacasmayo",
      },
      {
        id: 8,
        name: "Pataz",
        value: "pataz",
      },
      {
        id: 9,
        name: "Sanchez Carrion",
        value: "sanchez-carrion",
      },
      {
        id: 10,
        name: "Santiago de Chuco",
        value: "santiago-de-chuco",
      },
      {
        id: 11,
        name: "Gran Chimu",
        value: "gran-chimu",
      },
      {
        id: 12,
        name: "Viru",
        value: "viru",
      },
    ],
  },
  {
    id: 14,
    name: "Lambayeque",
    value: "lambayeque",
    provincias: [
      {
        id: 1,
        name: "Chiclayo",
        value: "chiclayo",
      },
      {
        id: 2,
        name: "Ferreñafe",
        value: "ferreñafe",
      },
      {
        id: 3,
        name: "Lambayeque",
        value: "lambayeque",
      },
    ],
  },
  {
    id: 15,
    name: "Lima",
    value: "lima",
    provincias: [
      {
        id: 1,
        name: "Lima",
        value: "lima",
      },
      {
        id: 2,
        name: "Barranca",
        value: "Barranca",
      },
      {
        id: 3,
        name: "Cajatambo",
        value: "cajatambo",
      },
      {
        id: 4,
        name: "Canta",
        value: "canta",
      },
      {
        id: 5,
        name: "Cañete",
        value: "cañete",
      },
      {
        id: 6,
        name: "Huaral",
        value: "huaral",
      },
      {
        id: 7,
        name: "Huarochiri",
        value: "huarochiri",
      },
      {
        id: 8,
        name: "Huaura",
        value: "huaura",
      },
      {
        id: 9,
        name: "Oyon",
        value: "oyon",
      },
      {
        id: 10,
        name: "Yauyos",
        value: "yauyos",
      },
    ],
  },
  {
    id: 16,
    name: "Loreto",
    value: "loreto",
    provincias: [
      {
        id: 1,
        name: "Maynas",
        value: "maynas",
      },
      {
        id: 2,
        name: "Alto Amazonas",
        value: "alto-amazonas",
      },
      {
        id: 3,
        name: "Loreto",
        value: "loreto",
      },
      {
        id: 4,
        name: "Mariscal Ramon Castilla",
        value: "mariscal-ramon-castilla",
      },
      {
        id: 5,
        name: "Requena",
        value: "requena",
      },
      {
        id: 6,
        name: "Ucayali",
        value: "ucayali",
      },
    ],
  },
  {
    id: 17,
    name: "Madre de Dios",
    value: "madre-de-dios",
    provincias: [
      {
        id: 1,
        name: "Tambopata",
        value: "tambopata",
      },
      {
        id: 2,
        name: "Manu",
        value: "manu",
      },
      {
        id: 3,
        name: "Tahuamanu",
        value: "tahuamanu",
      },
    ],
  },
  {
    id: 18,
    name: "Moquegua",
    value: "moquegua",
    provincias: [
      {
        id: 1,
        name: "Mariscal Nieto",
        value: "mariscal-nieto",
      },
      {
        id: 2,
        name: "General Sanchez Cerro",
        value: "general-sanchez-cerro",
      },
      {
        id: 3,
        name: "Ilo",
        value: "ilo",
      },
    ],
  },
  {
    id: 19,
    name: "Pasco",
    value: "pasco",
    provincias: [
      {
        id: 1,
        name: "Pasco",
        value: "pasco",
      },
      {
        id: 2,
        name: "Daniel Alcides CArrion",
        value: "daniel-alcides-carrion",
      },
      {
        id: 3,
        name: "Oxapampa",
        value: "oxapampa",
      },
    ],
  },
  {
    id: 20,
    name: "Piura",
    value: "piura",
    provincias: [
      {
        id: 1,
        name: "Piura",
        value: "piura",
      },
      {
        id: 2,
        name: "Ayabaca",
        value: "ayabaca",
      },
      {
        id: 3,
        name: "Huancabamba",
        value: "huancabamba",
      },
      {
        id: 4,
        name: "Morropon",
        value: "Paita",
      },
      {
        id: 5,
        name: "Paita",
        value: "paita",
      },
      {
        id: 6,
        name: "Sullana",
        value: "sullana",
      },
      {
        id: 7,
        name: "Talara",
        value: "talara",
      },
      {
        id: 8,
        name: "Sechura",
        value: "sechura",
      },
    ],
  },
  {
    id: 21,
    name: "Puno",
    value: "puno",
    provincias: [
      {
        id: 1,
        name: "Puno",
        value: "puno",
      },
      {
        id: 2,
        name: "Azangaro",
        value: "azangaro",
      },
      {
        id: 3,
        name: "Carabaya",
        value: "carabayo",
      },
      {
        id: 4,
        name: "Chucuito",
        value: "chucuito",
      },
      {
        id: 5,
        name: "El Collao",
        value: "el-collao",
      },
      {
        id: 6,
        name: "Huancane",
        value: "huancane",
      },
      {
        id: 7,
        name: "Lampa",
        value: "lampa",
      },
      {
        id: 8,
        name: "Melgar",
        value: "melgar",
      },
      {
        id: 9,
        name: "Moho",
        value: "moho",
      },
      {
        id: 10,
        name: "San Antonio de Putina",
        value: "san-antonio-de-putina",
      },
      {
        id: 11,
        name: "San Roman",
        value: "san-roman",
      },
      {
        id: 12,
        name: "Sandia",
        value: "sandia",
      },
      {
        id: 13,
        name: "Yunguyo",
        value: "yunguyo",
      },
    ],
  },
  {
    id: 22,
    name: "San Martín",
    value: "san-martin",
    provincias: [
      {
        id: 1,
        name: "Moyobamba",
        value: "moyobamba",
      },
      {
        id: 2,
        name: "Bellavista",
        value: "bellavista",
      },
      {
        id: 3,
        name: "El Dorado",
        value: "el-dorado",
      },
      {
        id: 4,
        name: "Huallaga",
        value: "huallaga",
      },
      {
        id: 5,
        name: "Lamas",
        value: "lamas",
      },
      {
        id: 6,
        name: "Mariscal Caceres",
        value: "mariscal-caceres",
      },
      {
        id: 7,
        name: "Picota",
        value: "picota",
      },
      {
        id: 8,
        name: "Rioja",
        value: "rioja",
      },
      {
        id: 9,
        name: "San Martin",
        value: "san-martin",
      },
      {
        id: 10,
        name: "Tocache",
        value: "tocache",
      },
    ],
  },
  {
    id: 23,
    name: "Tacna",
    value: "tacna",
    provincias: [
      {
        id: 1,
        name: "Tacna",
        value: "tacna",
      },
      {
        id: 2,
        name: "Candarave",
        value: "candarave",
      },
      {
        id: 3,
        name: "Jorge Basadre",
        value: "jorge-basadre",
      },
      {
        id: 4,
        name: "Tarata",
        value: "tarata",
      },
    ],
  },
  {
    id: 24,
    name: "Tumbes",
    value: "tumbes",
    provincias: [
      {
        id: 1,
        name: "Tumbes",
        value: "tumbes",
      },
      {
        id: 2,
        name: "Contralmirante Villar",
        value: "contralmirante-villar",
      },
      {
        id: 3,
        name: "Zarumilla",
        value: "zarumilla",
      },
    ],
  },
  {
    id: 25,
    name: "Ucayali",
    value: "ucayali",
    provincias: [
      {
        id: 1,
        name: "Coronel Portillo",
        value: "coronel-portillo",
      },
      {
        id: 2,
        name: "Atalaya",
        value: "atalaya",
      },
      {
        id: 3,
        name: "Padre Abad",
        value: "padre-abad",
      },
      {
        id: 4,
        name: "Purus",
        value: "purus",
      },
    ],
  },
]

export const LISTA_TIPO_BIEN_RECLAMOS: ITipoBien[] = [
  { label: "Producto", value: "producto" },
  { label: "Servicio", value: "servicio" },
]

export const LISTA_TIPO_SOLICITUD_RECLAMOS: IReclamoTipoSolicitud[] = [
  {
    label: "Reclamo",
    value: "reclamo",
    desc: "Disconformidad relacionada a la calidad de los productos y/o servicios adquiridos.",
  },
  {
    label: "Queja",
    value: "queja",
    desc: "Malestar o descontento respecto a la atención recibida por parte del personal.",
  },
]

export const NOTAS_LEGALES_RECLAMOS: string[] = [
  "La formulación del reclamo no impide acudir a otras vías de solución de controversias, ni es requisito para interponer una denuncia ante el INDECOPI.",
  "El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles improrrogables.",
  "En caso de que el consumidor no consigne como mínimo su nombre, DNI, domicilio o correo electrónico, fecha de reclamo o queja y el detalle de los mismos, estos se considerarán como no presentados.",
]

export const EMPRESA_RAZON_SOCIAL = "AUTOMOTORES INKA S.A.C."
export const EMPRESA_RUC = "20480652387"
