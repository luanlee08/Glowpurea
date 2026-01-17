"use client"
import {
  ShieldCheck,
  SearchCheck,
  Headset,
  Lock,
  BadgeCheck,
  RefreshCcw,
  PackageCheck,
  Truck,
  Ban,
  Clock,
} from "lucide-react"

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

/* ================= CONFIG ================= */

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

    const fetchProduct = async () => {
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

    fetchProduct()
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
      <div className="max-w-7xl mx-auto px-4 pt-6 text-sm text-muted-foreground">
        <ol className="flex gap-2 flex-wrap">
          <li>
            <a href="/" className="hover:text-primary">Trang chủ</a>
          </li>
          <li>/</li>
          <li>
            <a href="/#products" className="hover:text-primary">Sản phẩm</a>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium line-clamp-1">
            {product.productName}
          </li>
        </ol>
      </div>

      {/* ===== MAIN ===== */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-start">

          {/* ================= GALLERY ================= */}
          {/* ===== GALLERY ===== */}
          <div className="space-y-4 max-w-[500px] mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.productName}
                className="aspect-square w-full object-contain max-h-[500px]"
              />
            </div>

            <div className="flex gap-3 justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-[72px] h-[72px] md:w-20 md:h-20 rounded-lg overflow-hidden border transition
          ${selectedImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "hover:border-primary/40"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>


          {/* ================= INFO ================= */}
          <div className="space-y-10">

            {/* ===== TITLE ===== */}
            <div>
              <h1 className="text-3xl font-bold leading-snug">
                {product.productName}
              </h1>

              {/* <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {product.description || "Mô tả sản phẩm đang được cập nhật."}
              </p> */}
            </div>

            {/* ===== PRICE & CTA ===== */}
            <div className="bg-white rounded-xl shadow-sm px-6 py-5 space-y-4 max-w-md border border-slate-100">

              <div className="flex items-center justify-between">
                <span className="text-[22px] font-semibold text-green-600">
                  {product.price.toLocaleString()}₫
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[11px] font-medium">
                  Còn hàng
                </span>
              </div>

              <Button
                className="w-full h-9 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Thêm vào giỏ hàng
              </Button>

              <p className="text-[11px] text-center text-muted-foreground">
                Miễn phí đổi trả trong 7 ngày
              </p>
            </div>

            {/* ===== TRUST ===== */}
            <div className="bg-white rounded-2xl shadow-sm px-6 py-4 max-w-md">
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">

                <TrustItem
                  icon={<Leaf className="w-4 h-4" />}
                  text="100% thành phần thiên nhiên"
                />

                <TrustItem
                  icon={<Shield className="w-4 h-4" />}
                  text="An toàn – lành tính"
                />

                <TrustItem
                  icon={<Award className="w-4 h-4" />}
                  text="Sản xuất tại Việt Nam"
                />

                <TrustItem
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  text="Không thử nghiệm động vật"
                />

              </div>
            </div>


          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="max-w-6xl mx-auto mt-24 bg-white rounded-3xl shadow-lg p-10">

          {/* ===== TABS ===== */}
          <div className="flex gap-8 border-b mb-8 text-sm font-medium">
            {[
              { key: "description", label: "Mô tả sản phẩm" },
              { key: "policy", label: "Chính sách" },
              { key: "return", label: "Đổi trả" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-4 transition
                  ${activeTab === tab.key
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===== CONTENT ===== */}
          {activeTab === "description" && (
            <div
              className="prose max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html:
                  product.description ||
                  "<p>Sản phẩm được sản xuất từ nguyên liệu thiên nhiên, an toàn và phù hợp cho người dùng.</p>",
              }}
            />
          )}

          {activeTab === "policy" && (
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Cam kết sản phẩm chính hãng 100%</b>, đầy đủ thông tin nguồn gốc và xuất xứ.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <SearchCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Kiểm tra sản phẩm trước khi thanh toán</b>, đảm bảo đúng mẫu mã và chất lượng.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Headset className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Hỗ trợ tư vấn khách hàng 24/7</b> qua chat, hotline hoặc fanpage.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Bảo mật tuyệt đối thông tin cá nhân</b>, không chia sẻ cho bên thứ ba.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Giá bán minh bạch</b>, không phát sinh chi phí trong quá trình mua hàng.
                </span>
              </li>
            </ul>
          )}


          {activeTab === "return" && (
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <RefreshCcw className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  <b>Hỗ trợ đổi hoặc trả sản phẩm trong vòng 7 ngày</b> kể từ ngày nhận hàng.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <PackageCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  Sản phẩm đổi trả phải <b>còn nguyên tem, nhãn mác và chưa qua sử dụng</b>.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  Áp dụng đổi trả khi sản phẩm <b>bị lỗi kỹ thuật hoặc hư hỏng do vận chuyển</b>.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Ban className="w-5 h-5 text-red-500 mt-0.5" />
                <span>
                  <b>Không áp dụng đổi trả</b> với sản phẩm đã qua sử dụng hoặc lỗi do người dùng.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                <span>
                  Thời gian xử lý đổi trả từ <b>3 – 5 ngày làm việc</b> sau khi tiếp nhận yêu cầu.
                </span>
              </li>
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
    <div className="flex items-center gap-3">
      <span className="text-green-600">{icon}</span>
      <span className="text-sm text-foreground/80">{text}</span>
    </div>
  )
}
