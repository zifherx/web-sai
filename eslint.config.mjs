// @ts-check
import pluginQuery from "@tanstack/eslint-plugin-query"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

const TS_FILES = ["**/*.{ts,tsx,mts,cts}"]
const TEST_FILES = [
  "**/*.{unit,integration}.test.{ts,tsx}",
  "**/tests/**",
  "test/**",
  "vitest*.config.ts",
]

/**
 * Fronteras de la arquitectura hexagonal (las hace cumplir ESLint, no la
 * disciplina). Cada entrada: archivos afectados → imports prohibidos.
 */
const relativeImports = {
  group: ["./*", "../*"],
  message: "Usa el alias @/ (convención del proyecto: sin imports relativos).",
}
const frameworks = {
  group: [
    "mongoose",
    "mongodb",
    "next",
    "next/*",
    "react",
    "react-dom",
    "better-auth",
    "better-auth/*",
    "@tiptap/*",
    "@upstash/*",
  ],
  message: "El dominio no depende de frameworks ni de infraestructura.",
}
const persistenceFrameworks = {
  group: [
    "mongoose",
    "mongodb",
    "next",
    "next/*",
    "better-auth",
    "better-auth/*",
    "@tiptap/*",
  ],
  message: "La aplicación depende de puertos, no de frameworks.",
}
const outerLayersFromDomain = {
  group: [
    "@/modules/*/infrastructure/*",
    "@/modules/*/presentation/*",
    "@/modules/*/application/*",
    "@/modules/*/factories/*",
    "@/shared/infrastructure/*",
    "@/shared/presentation/*",
    "@/shared/application/*",
    "@/lib/*",
  ],
  message: "El dominio solo puede importar dominio.",
}
const outerLayersFromApplication = {
  group: [
    "@/modules/*/infrastructure/*",
    "@/modules/*/presentation/*",
    "@/modules/*/factories/*",
    "@/shared/infrastructure/*",
    "@/shared/presentation/*",
  ],
  message:
    "La aplicación no conoce infraestructura ni presentación (usa puertos).",
}
const modulesFromShared = {
  group: ["@/modules/*"],
  message: "shared/ no puede depender de módulos.",
}

const restrict = (name, files, patterns, ignores = []) => ({
  name: `arch/${name}`,
  files,
  ignores,
  rules: {
    "no-restricted-imports": [
      "error",
      { patterns: [relativeImports, ...patterns] },
    ],
  },
})

const architectureRules = [
  restrict(
    "module-domain",
    ["modules/*/domain/**"],
    [frameworks, outerLayersFromDomain]
  ),
  restrict(
    "module-application",
    ["modules/*/application/**"],
    [persistenceFrameworks, outerLayersFromApplication]
  ),
  restrict(
    "shared-domain",
    ["shared/domain/**"],
    [frameworks, outerLayersFromDomain, modulesFromShared]
  ),
  restrict(
    "shared-application",
    ["shared/application/**"],
    [persistenceFrameworks, outerLayersFromApplication, modulesFromShared]
  ),
  restrict(
    "shared-outer",
    ["shared/infrastructure/**", "shared/presentation/**"],
    [modulesFromShared],
    // Deuda conocida: la config de better-auth vive en modules/auth.
    ["shared/infrastructure/auth/resolve-sesion.ts"]
  ),
  restrict(
    "rest",
    [
      "app/**",
      "components/**",
      "hooks/**",
      "lib/**",
      "services/**",
      "providers/**",
      "types/**",
      "modules/*/infrastructure/**",
      "modules/*/presentation/**",
      "modules/*/factories/**",
      "modules/*/helpers/**",
    ],
    []
  ),
]

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "emails/.react-email/**",
  ]),

  // ── Base: Next 16 (React, hooks + React Compiler, a11y, import, Next) ──────
  ...nextVitals,
  ...nextTs,

  // ── TanStack Query ─────────────────────────────────────────────────────────
  ...pluginQuery.configs["flat/recommended"],

  {
    name: "project/linter-options",
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
  },

  // ── TypeScript con información de tipos (solo reglas de alto valor) ────────
  {
    name: "project/typescript-typed",
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Bugs reales que tsc NO detecta
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        { considerDefaultExhaustiveForUnions: true },
      ],
      // Consistencia
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },

  // ── React ──────────────────────────────────────────────────────────────────
  {
    name: "project/react",
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/exhaustive-deps": "warn",
      // react-hook-form / TanStack Table no son compatibles con React Compiler:
      // la regla avisa algo que no podemos cambiar.
      "react-hooks/incompatible-library": "off",
    },
  },

  // ── Calidad general ────────────────────────────────────────────────────────
  {
    name: "project/quality",
    rules: {
      eqeqeq: ["error", "smart"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "object-shorthand": "warn",
    },
  },

  ...architectureRules,

  // ── Tests: más permisivos ──────────────────────────────────────────────────
  {
    name: "project/tests",
    files: TEST_FILES,
    languageOptions: { globals: { ...globals.vitest } },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-restricted-imports": "off",
    },
  },

  // ── Scripts de Node (seeds, utilidades): pueden usar console ──────────────
  {
    name: "project/scripts",
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },

  // ── Archivos de configuración (JS sin tipos del proyecto) ──────────────────
  {
    name: "project/config-files",
    files: ["*.config.{js,mjs,cjs,ts}"],
    ...tseslint.configs.disableTypeChecked,
  },
])
