import { LoginView } from "@/app/(routes)/(auth)/login/components/Login-View"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Iniciar sesión | CMS Automotores Inka",
    template: "",
  },
}

export default function LoginPage() {
  return <LoginView />
}
