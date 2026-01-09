"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeatureSection from "@/components/feature-section"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getUserProducts } from "@/services/product.service"
import { useSearchParams } from "next/navigation"

/* ================= TYPES ================= */

interface ProductCardDto {
  id: number
  name: string
  description: string
  price: string
  image: string
  ingredients: string
}

/* ================= PAGE ================= */

export default function HomePage() {
  const [products, setProducts] = useState<ProductCardDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 9
  const [searchInput, setSearchInput] = useState("")
  const [keyword, setKeyword] = useState("")
  const searchParams = useSearchParams()
  const keywordFromUrl = searchParams.get("keyword") || ""

  /* ================= LOAD PRODUCTS ================= */

  const loadProducts = async (pageNumber = 1, kw = keyword) => {
    try {
      setLoading(true)
      setError(null)

      const res = await getUserProducts(pageNumber, pageSize, kw)

      setProducts(res.data)
      setTotal(res.total)
      setPage(res.page)
    } catch {
      setError("Không thể tải sản phẩm")
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    setKeyword(keywordFromUrl)
    loadProducts(1, keywordFromUrl)
  }, [keywordFromUrl])

  const totalPages = Math.ceil(total / pageSize)

  const getPageNumbers = () => {
    const maxVisible = 5
    const pages: number[] = []

    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }


  /* ================= RENDER ================= */

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            ✨ 100% Tự Nhiên & Hữu Cơ
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Son Dưỡng{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Thiên Nhiên
            </span>
          </h1>

          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Sản phẩm dưỡng môi thủ công từ nguyên liệu tự nhiên, an toàn và lành tính
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Mua Ngay
            </Button>
            <Button size="lg" variant="outline">
              Tìm Hiểu Thêm
            </Button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <FeatureSection />

      {/* ================= PRODUCTS ================= */}
      <section id="products" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Bộ Sưu Tập
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="
                mx-auto
                mt-4
                max-w-3xl
                text-center
                text-xl
                leading-relaxed
                text-foreground/70
              ">
              Khám phá các dòng son dưỡng môi từ thiên nhiên
            </p>



          </div>

          {/* ===== LOADING ===== */}
          {loading && (
            <p className="text-center text-foreground/60">
              Đang tải sản phẩm...
            </p>
          )}

          {/* ===== ERROR ===== */}
          {error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {/* ===== PRODUCT GRID ===== */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  ingredients={product.ingredients}
                  image={product.image}
                />
              ))}
            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => loadProducts(page - 1, keyword)}
                className="rounded-full px-5"
              >
                ← Trang trước
              </Button>

              <span className="text-sm text-foreground/70">
                Trang {page} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => loadProducts(page + 1, keyword)}
                className="rounded-full px-5"
              >
                Trang sau →
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
