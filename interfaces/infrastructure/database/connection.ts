import mongoose, { connect } from "mongoose"

const MONGODB_URI = process.env.DATABASE_URL as string

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      `Falta la variable de entorno de la BD.` +
        "\nPor favor configúrala en tu archivo .env o en las variables de entorno."
    )
  }

  if (cached.conn?.connection.readyState === 1) {
    return cached.conn
  }

  if (cached.conn?.connection.readyState === 0) {
    cached.conn = null
    cached.promise = null
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5_000,
      socketTimeoutMS: 45_000,
    }

    cached.promise = connect(MONGODB_URI, opts).then((mongo) => {
      console.log(`✅ MongoDB connected successfully`)
      return mongo
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    console.error(`❌ MongoDB connection error: ${err}`)
    throw err
  }

  return cached.conn
}

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("❌ Mongoose disconnected from MongoDB")
})
