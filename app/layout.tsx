import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Natural Lip Balm - Son Dưỡng Tự Làm Từ Nguyên Liệu Thiên Nhiên",
  description:
    "Son dưỡng tự làm từ nguyên liệu thiên nhiên 100% organic, không hóa chất. Chăm sóc môi của bạn một cách tự nhiên và an toàn.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
