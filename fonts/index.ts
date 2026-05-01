import { DM_Sans, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

export const hyundaiSansHeadLight = localFont({
  src: "./headOffice.font/HyundaiSansHeadOffice-Light.woff2",
  variable: "--font-hyundai-sans-head-light",
  weight: "300",
  style: "normal",
})

export const hyundaiSansHeadRegular = localFont({
  src: "./headOffice.font/HyundaiSansHeadOffice-Regular.woff2",
  variable: "--font-hyundai-sans-head-regular",
  weight: "500",
  style: "normal",
})

export const hyundaiSansHeadMedium = localFont({
  src: "./headOffice.font/HyundaiSansHeadOffice-Medium.woff2",
  variable: "--font-hyundai-sans-head-medium",
  weight: "700",
  style: "normal",
})

export const hyundaiSansHeadBold = localFont({
  src: "./headOffice.font/HyundaiSansHeadOffice-Bold.woff2",
  variable: "--font-hyundai-sans-head-bold",
  weight: "900",
  style: "normal",
})

export const hyundaiSansTextRegular = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-Regular.woff2",
  variable: "--font-hyundai-sans-text-regular",
  weight: "500",
  style: "normal",
})

export const hyundaiSansTextMedium = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-Medium.woff2",
  variable: "--font-hyundai-sans-text-medium",
  weight: "700",
  style: "normal",
})

export const hyundaiSansTextbold = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-Bold.woff2",
  variable: "--font-hyundai-sans-text-bold",
  weight: "900",
  style: "normal",
})

export const hyundaiSansTextRegularItalic = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-Italic.woff2",
  variable: "--font-hyundai-sans-text-regular-italic",
  weight: "500",
  style: "italic",
})

export const hyundaiSansTextMediumItalic = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-MediumItalic.woff2",
  variable: "--font-hyundai-sans-text-medium-italic",
  weight: "700",
  style: "italic",
})

export const hyundaiSansTextBoldItalic = localFont({
  src: "./textOffice.font/HyundaiSansTextOffice-BoldItalic.woff2",
  variable: "--font-hyundai-sans-text-bold-italic",
  weight: "900",
  style: "italic",
})

export const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
