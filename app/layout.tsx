import { ReactNode } from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader";

import { hyundaiHeadbold, hyundaiHeadLight, hyundaiHeadMedium, hyundaiHeadRegular, hyundaiTextBold, hyundaiTextItalicBold, hyundaiTextItalicMedium, hyundaiTextItalicRegular, hyundaiTextMedium, hyundaiTextRegular } from "@/fonts";
import "./globals.css";

import { cn } from "@/lib/utils";
import { METADATA } from "@/lib/Metadata";



export const metadata: Metadata = METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${hyundaiTextRegular.variable} ${hyundaiTextMedium.variable} ${hyundaiTextBold.variable}`, 
          `${hyundaiTextItalicRegular.variable} ${hyundaiTextItalicMedium.variable} ${hyundaiTextItalicBold.variable}`, 
          `${hyundaiHeadLight.variable} ${hyundaiHeadRegular.variable} ${hyundaiHeadMedium.variable} ${hyundaiHeadbold.variable}`, "antialiased")}
      >
        <NextTopLoader
            color="#1B5094"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #1B5094,0 0 5px #1B5094"
          />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
