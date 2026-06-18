import mongoose from "mongoose"
import { afterAll, afterEach, beforeAll } from "vitest"

/**
 * Setup por archivo para tests de integración.
 *
 * Se ejecuta en cada archivo *.integration.test.ts.
 * Conecta Mongoose al MongoMemoryServer levantado en globalSetup,
 * limpia todas las colecciones entre tests para aislamiento,
 * y desconecta al terminar el archivo.
 *
 * Patrón de aislamiento:
 *   beforeAll  → conectar Mongoose
 *   afterEach  → limpiar todas las colecciones (no la BD completa)
 *   afterAll   → desconectar Mongoose
 *
 * Por qué limpiar en afterEach y no recrear la BD:
 *   Recrear la BD perdería los índices definidos en el schema.
 *   Limpiar colecciones preserva los índices y es más rápido.
 */

beforeAll(async () => {
  const uri = process.env.MONGODB_TEST_URI
  if (!uri) {
    throw new Error(
      "MONGODB_TEST_URI no está definido. ¿Corrió mongo.global-setup.ts?"
    )
  }
  await mongoose.connect(uri)
})

afterEach(async () => {
  // Limpia todos los documentos de todas las colecciones
  // pero preserva los índices y la estructura del schema
  const collections = mongoose.connection.collections
  await Promise.all(Object.values(collections).map((col) => col.deleteMany({})))
})

afterAll(async () => {
  await mongoose.disconnect()
})
