import { Car } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white px-4">
      {/* Ícono central con anillo animado */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Anillo exterior giratorio */}
        <span
          className="absolute inset-0 animate-spin rounded-full border-4 border-sky-custom-100 border-t-sky-custom-500"
          aria-hidden="true"
        />
        {/* Anillo interior giratorio inverso */}
        <span
          className="absolute inset-3 animate-spin rounded-full border-4 border-blue-custom-100 border-b-blue-custom-500"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          aria-hidden="true"
        />
        {/* Ícono de auto centrado */}
        <Car
          size={36}
          strokeWidth={1.5}
          className="text-blue-custom-500"
          aria-hidden="true"
        />
      </div>

      {/* Texto */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-headOffice-bold text-xl text-gray-custom-900">
          Cargando
        </p>
        <p className="font-textOffice-regular text-sm text-gray-custom-700">
          Preparando tu experiencia automotriz
        </p>
      </div>

      {/* Barra de progreso indeterminada */}
      <div className="h-1 w-48 overflow-hidden rounded-full bg-sky-custom-100">
        <div
          className="loading-bar h-full w-1/3 rounded-full bg-sky-custom-500"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
