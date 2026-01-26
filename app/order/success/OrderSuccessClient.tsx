"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessClient() {
  const params = useSearchParams()
  const orderId = params.get("orderId")
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[420px]">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-2">
          Đặt hàng thành công 🎉
        </h1>

        <p className="text-muted-foreground mb-6">
          Mã đơn hàng của bạn là{" "}
          <span className="font-semibold">#{orderId}</span>
        </p>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={() => router.push("/profile?tab=orders")}
          >
            Xem đơn hàng
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </main>
  )
}
