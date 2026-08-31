import axios from "axios"

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
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
