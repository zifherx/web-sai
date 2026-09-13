import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL!

if (!baseURL) {
  throw new Error(
    "Variable de entorno requerida: NEXT_PUBLIC_API_URL (debe ser una URL absoluta, ej. http://localhost:3000/api)"
  )
}

export const httpClient = axios.create({
  baseURL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401 && typeof window !== "undefined") {
      window.location.href = "/login"
    }

    if (status === 500) {
      console.error("[API Error 500]", error.response?.data)
    }

    return Promise.reject(error)
  }
)
