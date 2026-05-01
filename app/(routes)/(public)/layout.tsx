import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { FOOTER_CONSTANTS } from "@/constants/footer.constants"
import { ReactNode } from "react"

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer {...FOOTER_CONSTANTS} />
    </main>
  )
}
