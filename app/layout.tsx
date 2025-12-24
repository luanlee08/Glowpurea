import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Natural Lip Balm - Son Dưỡng Tự Làm Từ Nguyên Liệu Thiên Nhiên",
  description:
    "Son dưỡng tự làm từ nguyên liệu thiên nhiên 100% organic, không hóa chất. Chăm sóc môi của bạn một cách tự nhiên và an toàn.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${geist.className} antialiased`}>
        {children}

        <Toaster
          position="top-right"
          containerStyle={{
              top: 80,         
              right: 20,
            }}
          gutter={12}
          toastOptions={{
            duration: 3500,
            className: "glowpurea-toast",
            style: {
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.95)",
              color: "#1f2937",
              fontSize: "14px",
              fontWeight: 500,
              padding: "14px 16px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(34,197,94,0.15)",
              backdropFilter: "blur(8px)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e", // xanh lá Glowpurea 🌿
                secondary: "#ecfdf5",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fef2f2",
              },
              style: {
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(239,68,68,0.2)",
              },
            },
          }}
/>


        <Analytics />
      </body>
    </html>
  )
}
