import mongoose from "mongoose"
import { afterAll, afterEach, beforeAll } from "vitest"

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
  const collections = mongoose.connection.collections
  await Promise.all(Object.values(collections).map((col) => col.deleteMany({})))
})

afterAll(async () => {
  await mongoose.disconnect()
})
