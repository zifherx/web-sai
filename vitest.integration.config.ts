import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

/**
 * Proyecto: INTEGRATION TESTS — WEB SAI
 *
 * Cubre: repositorios Mongoose contra MongoMemoryServer.
 *
 * Convención: **\/*.integration.test.ts
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "integration",
    environment: "node",
    include: ["**/*.integration.test.ts"],
    exclude: ["**/*.unit.test.ts", "node_modules/**"],
    globals: true,
    globalSetup: ["tests/setup/mongo.global-setup.ts"],
    setupFiles: ["tests/setup/mongo.setup.ts"],
    pool: "forks",
    maxWorkers: 1,
    testTimeout: 30_000,
    hookTimeout: 30_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage/integration",
      include: ["modules/**/infrastructure/**"],
      exclude: [
        "modules/**/domain/**",
        "modules/**/application/**",
        "modules/**/presentation/**",
        "**/*.d.ts",
        "**/*.config.*",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
      },
    },
  },
})
