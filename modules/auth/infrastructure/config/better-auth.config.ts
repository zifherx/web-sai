import { connectDB } from "@/shared/infrastructure/connection"
import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js"
import { connection } from "mongoose"

async function getDB() {
  await connectDB()
  return connection.getClient().db()
}

export const auth = betterAuth({
  database: mongodbAdapter(await getDB()),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
  user: {
    additionalFields: {
      rol: { type: "string", defaultValue: "sede", input: false },
      sedeId: { type: "string", required: false, defaultValue: "" },
    },
  },
  trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .filter(Boolean),
  plugins: [nextCookies()],
})
