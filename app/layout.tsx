import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { RTLProvider } from "@/components/rtl-provider"
import { MobileHeader } from "@/components/mobile-header"
import "./globals.css"

const geist = Geist({ subsets: ["latin", "arabic"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CIH Care - Filet de Sécurité Financière",
  description: "Solutions d'aide financière pour les situations de vulnérabilité",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${geist.className} antialiased bg-[#F5F7FA]`}>
        <RTLProvider>
          <div className="flex flex-col lg:flex-row min-h-screen">
            <MobileHeader />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </RTLProvider>
        <Analytics />
      </body>
    </html>
  )
}
