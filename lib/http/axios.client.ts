import axios from "axios"

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
})

httpClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("sai_token") : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      window.location.href = "/login"
    }

    if (status === 500) {
      console.error("[API Error 500]", error.response?.data)
    }

    return Promise.reject(error)
  }
)
