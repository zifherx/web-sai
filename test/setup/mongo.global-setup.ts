import { MongoMemoryServer } from "mongodb-memory-server"
/**
 * Global setup para tests de integración.
 *
 * Se ejecuta UNA SOLA VEZ antes de todos los archivos de integration test.
 * Levanta MongoMemoryServer, expone el URI via variable de entorno,
 * y lo cierra al finalizar todos los tests.
 *
 * Por qué globalSetup y no setupFiles:
 *   setupFiles corre por cada archivo de test — levantar MongoMemoryServer
 *   N veces es innecesariamente lento. globalSetup corre una vez para
 *   toda la suite de integration tests.
 */

let mongoServer: MongoMemoryServer

export async function setup(): Promise<void> {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      // Puerto fijo para debugging local
      port: 27099,
      dbName: "web-sai-test",
    },
  })

  // Exponer el URI para que mongo.setup.ts lo consuma en cada archivo
  process.env.MONGODB_TEST_URI = mongoServer.getUri()
}

export async function teardown(): Promise<void> {
  await mongoServer?.stop()
}
