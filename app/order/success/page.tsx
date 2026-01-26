import { Suspense } from "react"
import OrderSuccessClient from "./OrderSuccessClient"

export const dynamic = "force-dynamic"

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <OrderSuccessClient />
    </Suspense>
  )
}
