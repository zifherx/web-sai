# 🚗 WEB-SAI — Sistema de Atención Integral | Automotores Inka

> Plataforma web multimarca de alto rendimiento para **Automotores Inka S.A.C.**, la red de concesionarios más grande del norte del Perú. Construida con Next.js 16, arquitectura hexagonal y un stack moderno orientado a escalabilidad, SEO y experiencia de usuario.

---

## 📋 Índice

- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Páginas y Rutas](#-páginas-y-rutas)
- [Módulos Backend](#-módulos-backend)
- [Módulos Frontend](#-módulos-frontend)
- [Instalación y Desarrollo](#-instalación-y-desarrollo)
- [Variables de Entorno](#-variables-de-entorno)
- [Convenciones y Buenas Prácticas](#-convenciones-y-buenas-prácticas)
- [Deploy](#-deploy)

---

## 📌 Descripción General

**WEB-SAI** es el sitio web corporativo y plataforma de gestión de Automotores Inka. Integra un catálogo de vehículos multimarca, sistema de financiamiento en 4 pasos, red de sedes con mapa interactivo, y módulos transaccionales completos: cotizaciones, citas de servicio, libro de reclamaciones y leads corporativos — con integración al CRM externo Novaly App y notificaciones por email vía Resend.

### Características principales

- 🗂️ **Catálogo multimarca** con filtros dinámicos por marca, modelo y precio
- 🔍 **SEO optimizado** — metadata estática y dinámica por ruta, OpenGraph, Twitter Card
- 🧩 **Arquitectura hexagonal** en el backend (Domain → Application → Infrastructure)
- ⚡ **TanStack Query v5** para fetching, caché y sincronización de estado del servidor
- 🗺️ **Mapa interactivo** con Leaflet para la red de sedes
- 📱 **Diseño totalmente responsive** — Mobile-first con Tailwind v4
- 🧪 **Validación de formularios** con Zod + React Hook Form
- 🎠 **Carousels** con Embla + Autoplay para hero, marcas y talleres
- 📄 **Generación de PDF** en el browser con jsPDF (libro de reclamaciones)
- 📧 **Notificaciones por email** con Resend (citas, reclamos, leads corporativos)
- 🤝 **Integración CRM** con Novaly App para segmentación de leads de cotización
- 📊 **Bitácora** de interacciones con servicios externos
- 🔐 **Autenticación** con Clerk para el panel de administración

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 16.2.4 | Framework principal, App Router, SSR/SSG |
| **React** | 19 | UI Library |
| **TypeScript** | 5.9 | Tipado estático (strict) |
| **Tailwind CSS** | v4 | Estilos utilitarios |
| **TanStack Query** | v5 | Server state management |
| **Axios** | 1.x | Cliente HTTP |
| **Embla Carousel** | 8.x | Carousels con autoplay |
| **React Hook Form** | 7.x | Formularios |
| **Zod** | v4 + v3 compat | Validación de schemas |
| **Lucide React** | 1.x | Iconografía |
| **react-icons** | 5.x | Iconos de redes sociales |
| **Framer Motion** | — | Animaciones |
| **shadcn/ui** | — | Componentes UI base |
| **Sonner** | 2.x | Toast notifications |
| **Leaflet** | — | Mapas interactivos |
| **jsPDF** | 4.x | Generación de PDF en el browser |
| **NextJS TopLoader** | — | Transiciones entre rutas |

### Backend (API Routes — Next.js)

| Tecnología | Uso |
|---|---|
| **Mongoose** | ODM para MongoDB |
| **MongoDB Atlas** | Base de datos principal |
| **Zod v4** | Validación de DTOs del backend |
| **Resend** | Envío de emails transaccionales |
| **Clerk** | Autenticación del panel admin |
| **Axios** | Integración con Novaly App (CRM externo) |

---

## 🏗️ Arquitectura

### Backend — Arquitectura Hexagonal

El backend sigue el patrón de **Ports & Adapters** organizado en tres capas:

```
interfaces/
├── domain/[módulo]/
│   ├── entity.ts              ← Entidad de dominio pura
│   ├── repository.port.ts     ← Puerto (interfaz del repositorio)
│   └── errors.ts              ← Errores de dominio
│
├── application/[módulo]/
│   ├── service.ts             ← Casos de uso
│   ├── dto.ts                 ← Data Transfer Objects + Zod schemas
│   └── mapper.ts              ← Transformación Entity → DTO
│
└── infrastructure/
    ├── database/[módulo]/
    │   ├── schema.ts          ← Schema Mongoose
    │   └── repository.ts      ← Implementación del repositorio
    └── di/
        └── [módulo].factory.ts ← Factory que inyecta dependencias
```

### Flujo de una petición API

```
HTTP Request
    ↓
app/api/[módulo]/route.ts     ← Entry point (delgado, sin lógica de negocio)
    ↓
[módulo]Factory()             ← Crea el servicio con sus dependencias
    ↓
[Módulo]Service               ← Lógica de negocio (Application)
    ↓
[Módulo]Repository (Mongoose) ← Acceso a datos (Infrastructure)
    ↓
MongoDB Atlas
```

### Frontend — View → Hook → Service

```
Page (Server Component)
    ↓
[Módulo]View (Client Component orquestador)
    ↓
hooks/queries/use-*.ts        ← TanStack Query (lecturas)
hooks/mutations/use-*.ts      ← TanStack Mutation (escrituras)
    ↓
services/*.service.ts         ← Axios client → API Routes
```

---

## 📁 Estructura del Proyecto

```
web-sai/
├── app/
│   ├── api/                              ← API Routes (backend)
│   │   ├── marca/
│   │   ├── vehiculo/
│   │   ├── sede/
│   │   ├── carroceria/
│   │   ├── portada/
│   │   ├── cotizacion/                   ← ✨ Nuevo
│   │   ├── cita/                         ← ✨ Nuevo
│   │   ├── reclamo/                      ← ✨ Nuevo
│   │   ├── lead-corporativo/             ← ✨ Nuevo
│   │   ├── system-email/                 ← ✨ Nuevo
│   │   ├── novaly/new-lead/              ← ✨ Nuevo
│   │   └── send-email/                   ← ✨ Nuevo
│   │       ├── cita/
│   │       ├── corporativo/
│   │       └── reclamo/
│   └── (routes)/
│       └── (public)/
│           ├── (home)/
│           ├── (catalogo)/catalogo/[marca]/[modelo]/
│           ├── (nosotros)/nosotros/
│           ├── (comercial)/
│           │   ├── financiamiento/         ← ✨ Wizard 4 pasos
│           │   │   └── gracias/            ← ✨ Nuevo
│           │   ├── soluciones-corporativas/
│           │   │   └── gracias/            ← ✨ Nuevo
│           │   └── beneficios-repsol/
│           ├── (posventa)/
│           │   ├── separa-tu-cita/         ← ✨ Refactorizado
│           │   │   └── gracias/            ← ✨ Nuevo
│           │   └── talleres/
│           └── (reclamos)/
│               └── libro-de-reclamaciones/ ← ✨ Nuevo
│                   └── gracias/            ← ✨ Nuevo
│
├── components/
│   ├── modules/
│   │   ├── (home)/
│   │   ├── (catalogo)/
│   │   ├── (financiamiento)/             ← ✨ Wizard completo
│   │   ├── (reclamo)/                    ← ✨ Nuevo
│   │   ├── (separa-cita)/               ← ✨ Nuevo
│   │   └── (footer)/
│   ├── shared/
│   │   └── Back-Button.tsx               ← ✨ Nuevo (Client Component)
│   └── ui/
│
├── hooks/
│   ├── queries/
│   └── mutations/                        ← ✨ Nuevo
│       ├── use-cotizacion.mutations.ts
│       ├── use-cita.mutations.ts
│       ├── use-reclamo.mutations.ts
│       └── use-lead-corporativo.mutations.ts
│
├── interfaces/                           ← Arquitectura hexagonal
│   ├── domain/
│   │   ├── bitacora/                     ← ✨ Nuevo
│   │   ├── cita/                         ← ✨ Nuevo
│   │   ├── cliente/
│   │   ├── cotizacion/                   ← ✨ Nuevo
│   │   ├── lead-corporativo/             ← ✨ Nuevo
│   │   ├── marca/
│   │   ├── reclamo/                      ← ✨ Nuevo
│   │   ├── sede/
│   │   ├── system-email/                 ← ✨ Nuevo
│   │   └── vehiculo/
│   ├── application/
│   │   ├── bitacora/                     ← ✨ Nuevo
│   │   ├── cita/                         ← ✨ Nuevo
│   │   ├── cotizacion/                   ← ✨ Nuevo
│   │   ├── email/                        ← ✨ Nuevo
│   │   ├── lead-corporativo/             ← ✨ Nuevo
│   │   ├── novaly/                       ← ✨ Nuevo
│   │   ├── reclamo/                      ← ✨ Nuevo
│   │   ├── sede/
│   │   └── system-email/                 ← ✨ Nuevo
│   └── infrastructure/
│       ├── database/
│       └── di/
│
├── services/                             ← Clientes HTTP del frontend
│   ├── cotizacion.service.ts             ← ✨ Nuevo
│   ├── cita.service.ts                   ← ✨ Nuevo
│   ├── reclamo.service.ts                ← ✨ Nuevo
│   └── lead-corporativo.service.ts       ← ✨ Nuevo
│
├── lib/
│   ├── makePdf.ts                        ← ✨ Nuevo (jsPDF — browser only)
│   └── toast.helpers.ts                  ← ✨ Nuevo
│
├── constants/
│   ├── financiamiento.constant.ts        ← ✨ Actualizado
│   ├── footer.constants.ts               ← ✨ Actualizado (sin icon functions)
│   └── ...
└── providers/
```

---

## 🗺️ Páginas y Rutas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Estático | Home — Hero, Buscador, Marcas, Más Vendidos, Servicios, Talleres |
| `/catalogo` | Estático | Catálogo filtrable por marca, modelo y precio |
| `/catalogo/[marca]/[modelo]` | Dinámico | Ficha de vehículo — colores, galería, specs, CTA |
| `/nosotros/empresa` | Estático | Quiénes somos, valores, códigos de conducta |
| `/nosotros/ubicanos` | Estático | Red de sedes con mapa Leaflet interactivo |
| `/comercial/financiamiento` | Estático | ✨ Wizard 4 pasos — Marca → Modelo → Sede → Contacto |
| `/comercial/financiamiento/gracias` | Estático | ✨ Confirmación de cotización con número de referencia |
| `/comercial/soluciones-corporativas` | Estático | Formulario corporativo, beneficios, CTA |
| `/comercial/soluciones-corporativas/gracias` | Estático | ✨ Confirmación de lead corporativo |
| `/comercial/beneficios-repsol` | Estático | Descuentos, cobertura, ventajas |
| `/posventa/separa-tu-cita` | Estático | ✨ Formulario de cita de servicio |
| `/posventa/separa-tu-cita/gracias` | Estático | ✨ Confirmación de cita agendada |
| `/posventa/talleres` | Estático | Talleres autorizados con mapa |
| `/libro-de-reclamaciones` | Estático | ✨ Formulario legal — 3 secciones + PDF |
| `/libro-de-reclamaciones/gracias` | Estático | ✨ Confirmación con número de reclamo |
| `/legal/terminos-condiciones` | Estático | Términos y condiciones |
| `/legal/accesibilidad` | Estático | Política de accesibilidad |
| `/legal/copyright` | Estático | Aviso de derechos |
| `/legal/promociones` | Estático | Bases de promociones |

---

## ⚙️ Módulos Backend

### Módulos de Catálogo (existentes)

| Módulo | Colección | Endpoints |
|---|---|---|
| **Portada** | `covers` | `GET /api/portada` |
| **Marca** | `marcas` | `GET /api/marca` · `GET /api/marca?slug=` |
| **Vehículo** | `modelos` | `GET /api/vehiculo` · `GET /api/vehiculo?slug=` · `GET /api/vehiculo?marcaId=` |
| **Sede** | `sucursals` | `GET /api/sede` · CRUD con Clerk auth |
| **Carrocería** | `carrocerias` | `GET /api/carroceria` |

### Módulos Transaccionales ✨ Nuevos

| Módulo | Colección | Endpoints | Descripción |
|---|---|---|---|
| **Cotización** | `cotizaciones` | `GET /api/cotizacion` · `POST /api/cotizacion` | Wizard 4 pasos + upsert cliente |
| **Cita** | `citas` | `GET /api/cita` · `POST /api/cita` | Cita de servicio + upsert cliente + WhatsApp |
| **Reclamo** | `reclamos` | `GET /api/reclamo` · `POST /api/reclamo` | Libro de reclamaciones con número autogenerado |
| **Lead Corporativo** | `leadcorporativos` | `GET /api/lead-corporativo` · `POST /api/lead-corporativo` | Leads del formulario corporativo |

### Módulos de Soporte ✨ Nuevos

| Módulo | Colección | Descripción |
|---|---|---|
| **BitácoraService** | `bitacoras` | Log de todas las interacciones con Novaly (éxito, error, validación) |
| **SystemEmail** | `systememails` | Emails de notificación por área — admin con Clerk auth |
| **EmailService** | — | Resend: `sendCita`, `sendReclamo` (con PDF), `sendLeadCorporativo` |
| **NovalyController** | — | CRM externo: segmentación de leads de cotización |

#### NovalyApp — Integración CRM

```
POST /api/novaly/new-lead

Request (NovalyRequest — camelCase):
  nombreCompleto, correoElectronico, numeroCelular,
  marcaVehiculo, modeloVehiculo, ciudadCotizacion,
  idMarca, idTienda, utmTrafico

Mapper → NovalyPayload (snake_case):
  nombres, apellidos (split automático de nombreCompleto),
  marca, modelo, id_marca, id_tienda, form_name: "NUEVOS", city, utm

Respuesta 200: { success: true, message: "Lead recibido correctamente" }
Respuesta 400: { success: false, error: "...", camposFaltantes: [...] }
```

#### System Email — Áreas configurables

```
Áreas: "Comercial" | "Corporativo" | "Reclamos" | "Citas" | "General"

GET  /api/system-email              → lista todos (público)
POST /api/system-email              → crea nuevo (requiere Clerk auth)
```

#### Patrón Fire & Forget

Los emails y la bitácora se disparan en background sin bloquear la respuesta al usuario:

```ts
// El reclamo se guarda → responde 201 inmediatamente
// El email con PDF se procesa en background
systemEmailFactory().getByArea("Reclamos").then((areaEmail) => {
  emailService.sendReclamo({ ... }).catch(console.error)
}).catch(console.error)
```

---

## 🎨 Módulos Frontend

### Hooks de TanStack Query

```ts
// Catálogo (existentes)
useActiveMarcas()
useMarcaBySlug(slug)
useActiveVehiculos(filters?)
useVehiculoBySlug(slug)
useVehiculosByMarca(marcaId)
useActiveSedes()
useTalleres()
useActivePortadas()

// Mutations ✨ Nuevas
useCrearCotizacion(options?)         // POST /api/cotizacion + Novaly
useCrearCita(options?)               // POST /api/cita
useCrearReclamo(options?)            // POST /api/reclamo + PDF + email
useCrearLeadCorporativo(options?)    // POST /api/lead-corporativo
```

### Wizard de Financiamiento ✨

Formulario en 4 pasos con estado compartido, validación por paso e integración doble con MongoDB y Novaly:

```
Step 1 — Marca    → grid de logos con idNovaly propagado a Step1Data
Step 2 — Modelo   → lista con imagen, precio y badges (isNuevo, isGLP, isEntrega48H)
Step 3 — Sede     → filtro por ciudad + cards + idTiendaNovaly propagado a Step3Data
Step 4 — Contacto → React Hook Form + Zod v3 + isLoading state
```

**Flujo de submit:**
```
handleStep4()
  → POST /api/cotizacion         → MongoDB (cotización + upsert cliente)
  → POST /api/novaly/new-lead    → Novaly CRM (fire & forget)
  → router.push('/comercial/financiamiento/gracias?id=...')
```

### Libro de Reclamaciones ✨

Formulario legal en 3 secciones:

```
Sección 1 — Consumidor    → datos personales + departamento/provincia/distrito
Sección 2 — Bien          → tipo, VIN, placa, sede, monto reclamado
Sección 3 — Detalle       → tipo solicitud, detalle, pedido, conformidad
```

**Flujo de submit — 3 pasos en el hook:**
```
useCrearReclamo.mutationFn()
  1. POST /api/reclamo                → MongoDB (número autogenerado CODEX-YYYYMMDD-0042)
  2. makePDFCorreoReclamo()          → genera PDF en el browser (jsPDF)
     ArrayBuffer → base64 en chunks de 8KB (evita stack overflow)
  3. POST /api/send-email/reclamo    → Resend con PDF adjunto (fire & forget)
  → router.push('/libro-de-reclamaciones/gracias?nro=...')
```

### Toast Helpers centralizados ✨

```ts
// lib/toast.helpers.ts
toastSuccess.cotizacion()
toastSuccess.cita()
toastSuccess.reclamo(numeroReclamo)   // incluye el número en la descripción
toastSuccess.corporativo()

toastError.cotizacion(err.message)
toastError.cita(err.message)
toastError.reclamo(err.message)
toastError.corporativo(err.message)
toastError.generic(err.message)
```

---

## 🚀 Instalación y Desarrollo

### Requisitos previos

- Node.js >= 20
- pnpm >= 9
- MongoDB Atlas (conexión activa)

### Instalación

```bash
git clone https://github.com/tu-usuario/web-sai.git
cd web-sai
pnpm install
cp .env.example .env.local
```

### Scripts

```bash
pnpm dev        # desarrollo con Turbopack (http://localhost:3000)
pnpm build      # build de producción
pnpm start      # servidor de producción
pnpm lint       # ESLint
```

---

## 🔐 Variables de Entorno

```env
# Base de datos
MONGODB_URI=mongodb+srv://...

# Clerk (autenticación admin)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Email (Resend)
RESEND_API_KEY=

# CRM Novaly
ENDPOINT_NOVALY=
NEW_ENDPOINT_NOVALY=

# Analytics
FACEBOOK_PIXEL_ID=
GOOGLE_TAG_ID=
GOOGLE_SITE_VERIFICATION=

# SEO
NEXT_PUBLIC_BASE_URL=https://automotoresinka.pe
```

> ⚠️ **Nota sobre MongoDB en Windows con Claro Perú:** El DNS puede bloquear la resolución SRV de Atlas. Usa cadena de conexión estándar (`mongodb://`) en lugar de `mongodb+srv://` para evitar `querySrv ECONNREFUSED`.

---

## 📐 Convenciones y Buenas Prácticas

### Nomenclatura de archivos

```
PascalCase    → Componentes React       (Navbar.tsx, Hero-Section.tsx)
camelCase     → Hooks, servicios        (use-marca.ts, cotizacion.service.ts)
kebab-case    → Constantes, tipos       (home.constants.ts, api.types.ts)
```

### Zod — dos versiones coexisten

| Contexto | Import | API de errores |
|---|---|---|
| Backend (DTOs de API) | `import { z } from "zod"` | `parsed.error.issues[0]?.message` |
| Frontend (react-hook-form) | `import z from "zod/v3"` | `parsed.error.errors[0]?.message` |

### Server vs Client Components

- Las **páginas** son Server Components por defecto
- Los **formularios** y componentes con interactividad llevan `"use client"`
- Las **páginas de gracias** son Server Components puros — sin `"use client"`
- Las **funciones** (iconos Lucide, react-icons) **nunca se pasan como props** entre boundary Server→Client — se resuelven internamente con maps (ver `SocialButton`)
- El `BackButton` de `not-found.tsx` es el único Client Component en esa página, aislado para contener el `onClick`

### Generación de PDF — browser only

jsPDF requiere APIs de browser y **no funciona en Node.js**:

```
❌ Server (route handler)  → jsPDF → "Trying to read a file from local file system"
✅ Browser (Client Component) → jsPDF → ArrayBuffer → base64 → POST al backend
```

Conversión segura de ArrayBuffer a base64 (evita stack overflow con PDFs grandes):

```ts
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8  = new Uint8Array(buffer)
  const CHUNK  = 8192   // 8KB — nunca supera el límite de args de la call stack
  let   binary = ""
  for (let i = 0; i < uint8.length; i += CHUNK) {
    binary += String.fromCharCode(...uint8.subarray(i, i + CHUNK))
  }
  return btoa(binary)
}
```

### Colecciones MongoDB

| Colección | Modelo | Descripción |
|---|---|---|
| `covers` | `Cover` | Banners del hero |
| `marcas` | `Marca` | Marcas de vehículos |
| `modelos` | `Vehiculo` | Catálogo de vehículos |
| `sucursals` | `Sucursal` | Sedes / concesionarios |
| `carrocerias` | `Carroceria` | Tipos de carrocería |
| `clientes` | `Cliente` | Clientes con upsert por `numeroDocumento` |
| `cotizaciones` | `Cotizacion` | Solicitudes del wizard de financiamiento |
| `citas` | `Cita` | Citas de servicio posventa |
| `reclamos` | `Reclamo` | Libro de reclamaciones (Ley 29571) |
| `leadcorporativos` | `LeadCorporativo` | Leads corporativos |
| `bitacoras` | `Bitacora` | Log de interacciones con Novaly |
| `systememails` | `SystemEmail` | Emails de notificación por área |

### Query Keys tipadas

```ts
// hooks/query-keys.ts
export const vehiculoKeys = {
  all:    () => ["vehiculo"] as const,
  active: (filters?) => ["vehiculo", "active", filters ?? {}] as const,
  slug:   (slug) => ["vehiculo", "slug", slug] as const,
}

// ✨ Nuevas
export const cotizacionKeys = {
  all:     () => ["cotizacion"] as const,
  list:    () => ["cotizacion", "list"] as const,
  byFecha: (from, to) => ["cotizacion", "list", { from, to }] as const,
}

export const reclamoKeys = {
  all:    () => ["reclamo"] as const,
  detail: (id) => ["reclamo", "detail", id] as const,
}
```

---

## 🚢 Deploy

El proyecto se despliega automáticamente en **Vercel** en cada push a `main`.

- Branch `main` → producción (`automotoresinka.pe`)
- Cada PR genera un **Preview Deployment** automático

### Flujo de PR recomendado

```bash
# 1. Actualiza tu rama sobre main
git fetch origin
git rebase origin/main

# 2. Si hay conflicto en pnpm-lock.yaml:
git checkout --theirs pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git rebase --continue

# 3. Verifica el build localmente
pnpm run build

# 4. Push y PR
git push origin tu-rama --force-with-lease
# → Crear PR en GitHub
# → Verificar Vercel Preview (sin errores de prerender)
# → Squash and merge

# 5. Limpieza post-merge
git checkout main && git pull origin main
git branch -d tu-rama
```

> Usar siempre **Squash and merge** — historial limpio en `main` y fácil de revertir.

---

## 👨‍💻 Autor

**Fernando Rojas Quezada**
Senior Full Stack Developer — [Ziphonex Tech](https://ziphonex.com)

Proyecto desarrollado para **Automotores Inka S.A.C.**
La red de concesionarios multimarca más grande del norte del Perú.

---

<p align="center">
  Construido con ❤️ usando Next.js 16 · TypeScript · Tailwind v4 · MongoDB
</p>