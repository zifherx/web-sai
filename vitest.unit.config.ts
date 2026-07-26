import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

/**
 * Proyecto: Unit Test — WEB SAI
 *
 * Cubre: entities, value-objects, errors, use-cases, mappers.
 * Sin BD — repositorios mockeados con vi.fn().
 *
 * Convención: **\/*.unit.test.ts
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "unit",
    environment: "node",
    include: ["**/*.unit.test.ts"],
    exclude: ["**/*.integration.test.ts", "node_modules/**"],
    globals: true,
    testTimeout: 10_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage/unit",
      include: [
        "modules/**/domain/**",
        "modules/**/application/**",
        "shared/**",
      ],
      exclude: [
        "modules/**/infrastructure/**",
        "modules/**/presentation/**",
        "app/**",
        "**/*.d.ts",
        "**/*.config.*",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
})
