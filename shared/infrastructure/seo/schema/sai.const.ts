export const AUTOMOTORES_INKA_ORG = {
  name: "Automotores Inka",
  image: "https://www.automotoresinka.pe/assets/logos/logo-color.png", // idealmente el logo, no el og-image genérico
  telephone: "+51-943-882-585", // reemplazar por el número real de atención
  priceRange: "$$",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress:
      "Av. Panamericana Norte N° 1320 - Víctor Larco, Trujillo, La Libertad",
    addressLocality: "Trujillo",
    addressCountry: "PE",
  },
}
