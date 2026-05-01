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

---

## 📌 Descripción General

**WEB-SAI** es el sitio web corporativo y plataforma de gestión de Automotores Inka. Integra un catálogo de vehículos multimarca, sistema de financiamiento en 4 pasos, red de sedes con mapa interactivo, y módulos comerciales (soluciones corporativas, beneficios Repsol), con un backend RESTful construido con arquitectura hexagonal sobre MongoDB.

### Características principales

- 🗂️ **Catálogo multimarca** con filtros dinámicos por marca, modelo y precio
- 🔍 **SEO optimizado** — metadata estática e dinámica por ruta
- 🧩 **Arquitectura hexagonal** en el backend (Domain → Application → Infrastructure)
- ⚡ **TanStack Query v5** para fetching, caché y sincronización de estado del servidor
- 🗺️ **Mapa interactivo** con Leaflet para la red de sedes
- 📱 **Diseño totalmente responsive** — Mobile-first con Tailwind v4
- 🧪 **Validación de formularios** con Zod + React Hook Form
- 🎠 **Carousels** con Embla + Autoplay para hero, marcas y talleres
- 🔐 **Inyección de dependencias** con DIContainer tipado

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología           | Versión        | Uso                                      |
| -------------------- | -------------- | ---------------------------------------- |
| **Next.js**          | 16.2.4         | Framework principal, App Router, SSR/SSG |
| **React**            | 19             | UI Library                               |
| **TypeScript**       | 5.x            | Tipado estático                          |
| **Tailwind CSS**     | v4             | Estilos utilitarios                      |
| **TanStack Query**   | v5             | Server state management                  |
| **Axios**            | 1.x            | Cliente HTTP                             |
| **Embla Carousel**   | 8.x            | Carousels con autoplay                   |
| **React Hook Form**  | —              | Formularios                              |
| **Zod**              | v4 + v3 compat | Validación de schemas                    |
| **Lucide React**     | —              | Iconografía                              |
| **Framer Motion**    | —              | Animaciones                              |
| **shadcn/ui**        | —              | Componentes UI base                      |
| **Leaflet**          | —              | Mapas interactivos                       |
| **next-themes**      | —              | Tema claro/oscuro                        |
| **NextJS TopLoader** | —              | Transiciones entre rutas                 |

### Backend (API Routes — Next.js)

| Tecnología        | Uso                              |
| ----------------- | -------------------------------- |
| **Mongoose**      | ODM para MongoDB                 |
| **MongoDB Atlas** | Base de datos principal          |
| **Zod**           | Validación de DTOs               |
| **DIContainer**   | Inyección de dependencias tipada |

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
        ├── container.ts       ← DIContainer tipado singleton
        └── [módulo].factory.ts ← Factory que inyecta dependencias
```

### Flujo de una petición API

```
HTTP Request
    ↓
app/api/[módulo]/route.ts     ← Entry point (delgado, sin lógica)
    ↓
[módulo]Factory()             ← Crea el servicio con sus dependencias
    ↓
[Módulo]Service               ← Lógica de negocio (Application)
    ↓
[Módulo]Repository (Mongoose) ← Acceso a datos (Infrastructure)
    ↓
MongoDB Atlas
```

### Frontend — TanStack Query + Servicios

```
components  →  hooks/queries/use-*.ts
                    ↓
               services/*.service.ts   ← Axios client
                    ↓
               app/api/[módulo]/       ← API Routes Next.js
```

---

## 📁 Estructura del Proyecto

```
web-sai/
├── app/
│   ├── api/                          ← API Routes (backend)
│   │   ├── marca/route.ts
│   │   ├── vehiculo/route.ts
│   │   ├── sede/route.ts
│   │   ├── carroceria/route.ts
│   │   └── portada/route.ts
│   └── (routes)/
│       └── (public)/
│           ├── (home)/page.tsx
│           ├── catalogo/
│           │   └── [marca]/[modelo]/
│           ├── nosotros/
│           │   ├── empresa/
│           │   └── ubicanos/
│           ├── financia-tu-auto/
│           ├── ubicanos/
│           ├── ventas/
│           │   └── soluciones-corporativas/
│           └── comercial/
│               └── beneficios-repsol/
│
├── components/
│   ├── modules/                      ← Componentes por módulo/página
│   │   ├── (home)/
│   │   ├── (catalogo)/
│   │   ├── (nosotros)/
│   │   ├── (financiamiento)/
│   │   ├── (ubicanos)/
│   │   ├── (corporativo)/
│   │   ├── (repsol)/
│   │   └── (footer)/
│   ├── shared/                       ← Componentes reutilizables
│   └── ui/                           ← Componentes base (shadcn)
│
├── hooks/
│   ├── queries/                      ← TanStack Query hooks
│   │   ├── use-marca.ts
│   │   ├── use-vehiculo.ts
│   │   ├── use-sede.ts
│   │   ├── use-portada.ts
│   │   └── use-carroceria.ts
│   └── query-keys.ts
│
├── interfaces/                       ← Arquitectura hexagonal
│   ├── domain/
│   ├── application/
│   └── infrastructure/
│
├── services/                         ← Clientes HTTP del frontend
├── constants/                        ← Datos estáticos por módulo
├── types/                            ← Tipos TypeScript globales
├── lib/                              ← Utilidades (utils, axios, functions)
└── providers/                        ← QueryProvider, ThemeProvider
```

---

## 🗺️ Páginas y Rutas

| Ruta                              | Tipo SEO     | Descripción                                                      |
| --------------------------------- | ------------ | ---------------------------------------------------------------- |
| `/`                               | Estático     | Home — Hero, Buscador, Marcas, Más Vendidos, Servicios, Talleres |
| `/catalogo`                       | Estático     | Catálogo filtrable por marca, modelo y precio con paginación     |
| `/catalogo/[marca]/[modelo]`      | **Dinámico** | Ficha de vehículo — colores, galería, specs, CTA                 |
| `/nosotros/empresa`               | Estático     | Quiénes somos, valores, códigos de conducta                      |
| `/nosotros/ubicanos`              | Estático     | Red de sedes con mapa Leaflet interactivo                        |
| `/financia-tu-auto`               | Estático     | Wizard 4 pasos — Marca → Modelo → Sede → Contacto                |
| `/ventas/soluciones-corporativas` | Estático     | Hero, intro, formulario corporativo, beneficios                  |
| `/comercial/beneficios-repsol`    | Estático     | Descuentos, cobertura, ventajas, video tutorial                  |

---

## ⚙️ Módulos Backend

### Módulos implementados

| Módulo         | Colección MongoDB | Endpoints                                       |
| -------------- | ----------------- | ----------------------------------------------- |
| **Portada**    | `covers`          | `GET /api/portada`                              |
| **Marca**      | `marcas`          | `GET /api/marca` · `GET /api/marca?slug=`       |
| **Vehículo**   | `modelos`         | `GET /api/vehiculo` · `GET /api/vehiculo?slug=` |
| **Sede**       | `sucursales`      | `GET /api/sede`                                 |
| **Carrocería** | `carrocerias`     | `GET /api/carroceria`                           |

### Patrón de bifurcación por `?slug`

Todos los endpoints con detalle detectan el query param `slug` y bifurcan a `getBySlug()` en lugar de `getAll()`, garantizando que el frontend reciba un objeto único en lugar de un array:

```ts
// GET /api/marca
if (slug) {
  const data = await marcaFactory().getBySlug(slug)  // → objeto único
  return ResponseFactory.success(data)
}
const data = await marcaFactory().getAll(filter)      // → array
return ResponseFactory.success(data)
```

---

## 🎨 Módulos Frontend

### Hooks de TanStack Query

```ts
// Marcas
useActiveMarcas()                          // todas las marcas activas
useMarcaBySlug(slug)                       // marca por slug

// Vehículos
useActiveVehiculos(filters?)               // con filtros opcionales
useVehiculoBySlug(slug)                    // vehículo por slug
useVehiculosByMarca(marcaId)               // modelos de una marca

// Sedes
useActiveSedes()                           // todas las sedes activas
useTalleres()                              // solo talleres autorizados

// Portadas
useActivePortadas()                        // slides del hero home
```

### Wizard de Financiamiento

Formulario en 4 pasos con estado compartido y validación por paso:

```
Step 1 — Marca    → selección por logo (grid)
Step 2 — Modelo   → lista con imagen, precio y badges
Step 3 — Sede     → filtro por ciudad + cards de concesionario
Step 4 — Contacto → form react-hook-form + Zod v3 + isSubmitting
```

### SEO Strategy

| Tipo de página          | Estrategia   | Método                                               |
| ----------------------- | ------------ | ---------------------------------------------------- |
| Páginas institucionales | **Estático** | `export const metadata: Metadata`                    |
| Páginas con `[slug]`    | **Dinámico** | `export async function generateMetadata({ params })` |

---

## 🚀 Instalación y Desarrollo

### Requisitos previos

- Node.js >= 18
- pnpm >= 8
- MongoDB Atlas (conexión activa)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/web-sai.git
cd web-sai

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Desarrollo

```bash
# Servidor de desarrollo con Turbopack
pnpm dev

# Build de producción
pnpm build

# Iniciar en producción
pnpm start

# Verificación de tipos
pnpm typecheck

# Linting
pnpm lint

# Formateo con Prettier
pnpm format
```

---

## 🔐 Variables de Entorno

```env
# Base de datos
MONGODB_URI=mongodb+srv://...

# URL base de la aplicación
NEXT_PUBLIC_BASE_URL=https://automotoresinka.pe

# (Opcional) Clerk Auth si se usa en el futuro
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

> ⚠️ **Nota sobre MongoDB en Windows:** Si usas Claro Perú como ISP, el DNS puede bloquear la resolución SRV de Atlas. Usa una cadena de conexión estándar (`mongodb://`) en lugar de `mongodb+srv://` para evitar el error `querySrv ECONNREFUSED`.

---

## 📐 Convenciones y Buenas Prácticas

### Nomenclatura de archivos

```
PascalCase       → Componentes React          (Navbar.tsx, Hero-Section.tsx)
camelCase        → Hooks, servicios, utils    (use-marca.ts, marca.service.ts)
kebab-case       → Constantes, tipos          (home.constants.ts, api.types.ts)
```

### Zod — Compatibilidad con react-hook-form

El proyecto usa **Zod v4** en el backend y **Zod v3** (via subpath) en los formularios del frontend para mantener compatibilidad con `@hookform/resolvers`:

```ts
// ✅ Backend — Zod v4 completo
import { z } from "zod"

// ✅ Frontend con react-hook-form — API v3 embebida en Zod v4
import { z } from "zod/v3"
```

### Estructura de componentes por página

```
app/(routes)/[pagina]/
├── page.tsx                    ← Server Component + metadata
└── components/
    └── [Pagina]-View.tsx       ← Client Component orquestador
        ├── [Pagina]-Hero.tsx
        ├── [Pagina]-Section.tsx
        └── ...
```

### Query Keys tipadas

```ts
// hooks/query-keys.ts
export const vehiculoKeys = {
  all:    () => ["vehiculo"] as const,
  active: (filters?) => ["vehiculo", "active", filters ?? {}] as const,
  slug:   (slug) => ["vehiculo", "slug", slug] as const,
}
```

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
