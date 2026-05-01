import { cn } from "@/lib/utils"
import NextTopLoader from "nextjs-toploader"
import { ThemeProvider } from "../components/theme-provider"
import {
  dmSans,
  fontMono,
  hyundaiSansHeadBold,
  hyundaiSansHeadLight,
  hyundaiSansHeadMedium,
  hyundaiSansHeadRegular,
  hyundaiSansTextbold,
  hyundaiSansTextBoldItalic,
  hyundaiSansTextMedium,
  hyundaiSansTextMediumItalic,
  hyundaiSansTextRegular,
  hyundaiSansTextRegularItalic,
} from "../fonts"
import { QueryProvider } from "../providers/QueryProvider"
import "./globals.css"
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        suppressHydrationWarning
        className={cn(
          "antialiased",
          fontMono.variable,
          "font-sans",
          dmSans.variable,
          hyundaiSansHeadBold.variable,
          hyundaiSansHeadMedium.variable,
          hyundaiSansHeadRegular.variable,
          hyundaiSansHeadLight.variable,
          hyundaiSansTextbold.variable,
          hyundaiSansTextMedium.variable,
          hyundaiSansTextRegular.variable,
          hyundaiSansTextBoldItalic.variable,
          hyundaiSansTextMediumItalic.variable,
          hyundaiSansTextRegularItalic.variable
        )}
      >
        <NextTopLoader
          color="#3b6fd4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b6fd4, 0 0 5px #3b6fd4"
          zIndex={9999}
        />
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
