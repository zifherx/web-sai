import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-4">
        {children}
      </div>
      <div className="hidden h-full flex-col items-center justify-center lg:flex lg:bg-slate-100">
        <Image
          src="/assets/logos/logo-color.png"
          alt="Logo Automotores Inka"
          width={500}
          height={150}
        />
        <h1 className="text-2xl font-bold">By Ziphonex Tech</h1>
        <Link href="/" className="font-textItalicMedium mt-5 hover:underline">
          Volver a la web
        </Link>
      </div>
    </div>
  )
}
