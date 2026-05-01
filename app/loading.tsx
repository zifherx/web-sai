import { Car } from "lucide-react"
import { CircleProgress } from "../components/shared/Circle-Progress"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="relative mb-8 h-24 w-24">
        <CircleProgress value={66} className="h-24 w-24" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="animate-bounce" />
        </div>
      </div>

      <h1 className="mb-2 text-2xl font-semibold text-gray-800">Cargando</h1>

      <p className="text-gray-600">Preparando su experiencia automotriz</p>

      <div className="mt-8 flex space-x-2">
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400"></span>
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400 delay-150"></span>
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400 delay-300"></span>
      </div>
    </div>
  )
}
