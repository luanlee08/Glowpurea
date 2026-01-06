"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Heart,
  ShoppingCart,
  Leaf,
  Shield,
  Award,
  CheckCircle2,
} from "lucide-react"
import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"

interface ProductDetail {
  productId: number
  productName: string
  description?: string
  price: number
  mainImageUrl?: string
  subImageUrls: string[]
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await axios.get(
        API_ENDPOINTS.USER_PRODUCT_DETAIL(Number(params.id))
      )
      setProduct(res.data)
    } catch {
      notFound()
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null
  if (!product) notFound()

  const images = [
    product.mainImageUrl,
    ...product.subImageUrls,
  ].filter(Boolean) as string[]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
            <a href="/" className="hover:text-primary">Trang chủ</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary">Sản phẩm</a>
            <span>/</span>
            <span className="text-foreground">{product.productName}</span>
          </div>

          {/* MAIN INFO */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">

            {/* IMAGE */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                <div className="relative aspect-square">
                  <img
                    src={images[selectedImageIndex] || "/placeholder.svg"}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImageIndex === index
                        ? "border-secondary"
                        : "border-border"
                      }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-foreground">
                {product.productName}
              </h1>

              <p className="text-lg text-foreground/70">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4 py-4 border-y">
                <span className="text-4xl font-bold text-secondary">
                  {product.price.toLocaleString()}₫
                </span>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ1
                </Button>
                <Button size="lg" variant="outline">
                  <Heart />
                </Button>
              </div>

              <div className="space-y-3 pt-6">
                <div className="flex items-center gap-3">
                  <Leaf className="text-primary" />
                  <span>Thành phần: Thiên nhiên</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-primary" />
                  <span>Sản xuất tại Việt Nam</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-primary" />
                  <span>Chứng nhận an toàn</span>
                </div>
              </div>
            </div>
          </div>

          {/* BENEFITS */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Cam kết sản phẩm
            </h2>
            <ul className="space-y-3">
              {[
                "100% nguyên liệu tự nhiên",
                "Không paraben",
                "Không thử nghiệm trên động vật",
                "Sản xuất tại Việt Nam",
              ].map((b, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
