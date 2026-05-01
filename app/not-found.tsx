"use client"

import { Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function NotFoundPage() {
  const [speed, setSpeed] = useState(0)

  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    const interval = setInterval(() => {
      if (mounted.current) {
        setSpeed((prevSpeed) => (prevSpeed + 1) % 101)
      }
    }, 50)
    return () => {
      mounted.current = false
      clearInterval(interval)
    }
  }, [])

  const circumference = 251.2
  const offset = circumference - (speed / 100) * circumference

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-white">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-[#F8F8F8] shadow-xl">
        <div className="space-y-6 p-8">
          <h1 className="text-center font-headOffice-bold text-4xl text-red-custom-500 md:text-6xl">
            ¡Error 404!
          </h1>
          <p className="text-center font-headOffice-medium text-xl text-black md:text-2xl">
            ¡Parece que te has salido de la pista!
          </p>

          <div className="relative h-48 w-full overflow-hidden rounded-xl bg-white md:rounded-full">
            <div className="absolute inset-0 flex items-center justify-center text-black">
              <svg className="h-full w-full" viewBox="0 0 200 100">
                <path
                  d="M20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="#F8F8F8"
                  strokeWidth="20"
                />
                <path
                  d="M20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="#de2526"
                  strokeWidth="18"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-300 ease-in-out"
                />
                <text
                  x="100"
                  y="60"
                  textAnchor="middle"
                  fill="black"
                  fontSize="24"
                  fontWeight="bold"
                >
                  {speed}
                </text>
                <text
                  x="100"
                  y="80"
                  textAnchor="middle"
                  fill="black"
                  fontSize="14"
                >
                  ERROR/H
                </text>
              </svg>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-lg text-black">
              La página que buscas se ha quedado sin combustible o ha tomado un
              desvío equivocado.
            </p>
            <Link
              href="/"
              className="font-headLight mx-auto flex w-fit items-center gap-3 rounded-lg border-2 border-black bg-transparent px-4 py-2 font-bold text-black transition duration-300 hover:border-red-custom-500 hover:bg-red-custom-500 hover:text-white"
            >
              <Home strokeWidth={2} />
              Volver a la pista principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
