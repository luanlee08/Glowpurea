"use client"

import { useParams, notFound } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Leaf,
  Shield,
  Award,
  CheckCircle2,
} from "lucide-react"
import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

/* ================= TYPES ================= */

interface ProductDetail {
  productId: number
  productName: string
  description?: string
  price: number
  mainImageUrl?: string
  subImageUrls: string[]
}

/* ================= PAGE ================= */

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<
    "description" | "policy" | "return"
  >("description")

  useEffect(() => {
    if (!id) return

    const loadProduct = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINTS.USER_PRODUCT_DETAIL(id)
        )
        setProduct(res.data)
      } catch (err: any) {
        if (err.response?.status === 404) notFound()
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Đang tải sản phẩm...
      </div>
    )
  }

  if (!product) notFound()

  const images = [product.mainImageUrl, ...product.subImageUrls]
    .filter(Boolean)
    .map((img) =>
      img!.startsWith("http") ? img! : `${API_BASE}${img}`
    )

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Header onSearch={() => { }} />

      {/* ===== BREADCRUMB ===== */}
      <div className="max-w-7xl mx-auto px-4 pt-5 text-sm text-muted-foreground">
        <ol className="flex gap-2">
          <li><a href="/" className="hover:text-primary">Trang chủ</a></li>
          <li>/</li>
          <li><a href="/#products" className="hover:text-primary">Sản phẩm</a></li>
          <li>/</li>
          <li className="text-foreground font-medium line-clamp-1">
            {product.productName}
          </li>
        </ol>
      </div>

      {/* ===== MAIN ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[0.9fr_1.1fr] gap-10">

          {/* ===== GALLERY ===== */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.productName}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition
                    ${selectedImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-primary/40"
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== INFO ===== */}
          <div className="space-y-6">

            {/* ===== TITLE ===== */}
            <div>
              <h1 className="text-3xl font-semibold">
                {product.productName}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {product.description || "Mô tả sản phẩm đang được cập nhật."}
              </p>
            </div>

            {/* ===== PRICE + CTA (GỌN) ===== */}
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md">

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()}₫
                </span>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Còn hàng
                </span>
              </div>

              <Button
                className="w-full h-11 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Thêm vào giỏ hàng
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Miễn phí đổi trả trong 7 ngày
              </p>
            </div>

            {/* ===== TRUST ===== */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
              <TrustItem icon={<Leaf />} text="100% thành phần thiên nhiên" />
              <TrustItem icon={<Shield />} text="An toàn – lành tính" />
              <TrustItem icon={<Award />} text="Sản xuất tại Việt Nam" />
              <TrustItem icon={<CheckCircle2 />} text="Không thử nghiệm động vật" />
            </div>
          </div>
        </div>

        {/* ===== DETAILS WITH TABS ===== */}
        <div className="max-w-5xl mx-auto mt-20 bg-white p-8 rounded-2xl shadow-md">

          {/* ===== TAB HEADER ===== */}
          <div className="flex gap-6 border-b mb-6 text-sm font-medium">
            {[
              { key: "description", label: "Mô tả sản phẩm" },
              { key: "policy", label: "Chính sách" },
              { key: "return", label: "Đổi trả" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-3 transition
                  ${activeTab === tab.key
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===== TAB CONTENT ===== */}
          {activeTab === "description" && (
            <p className="text-muted-foreground leading-relaxed">
              {product.description ||
                "Sản phẩm được sản xuất từ nguyên liệu thiên nhiên, an toàn và phù hợp sử dụng hằng ngày."}
            </p>
          )}

          {activeTab === "policy" && (
            <ul className="space-y-2 text-muted-foreground">
              <li>✔ Cam kết hàng chính hãng</li>
              <li>✔ Kiểm tra trước khi thanh toán</li>
              <li>✔ Hỗ trợ tư vấn 24/7</li>
            </ul>
          )}

          {activeTab === "return" && (
            <ul className="space-y-2 text-muted-foreground">
              <li>✔ Đổi trả miễn phí trong 7 ngày</li>
              <li>✔ Sản phẩm còn nguyên tem</li>
              <li>✔ Không áp dụng với hàng đã sử dụng</li>
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ================= SUB COMPONENT ================= */

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
      <span className="text-green-600">{icon}</span>
      <span className="text-sm text-foreground/80">{text}</span>
    </div>
  )
}
