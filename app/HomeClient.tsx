"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/footer"
import FeatureSection from "@/components/feature-section"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getUserProducts } from "@/services/product.service"

/* ================= TYPES ================= */

interface ProductCardDto {
  id: number
  name: string
  description: string
  price: string
  image: string
  ingredients: string
}

export default function HomeClient() {
  const [products, setProducts] = useState<ProductCardDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 9
  const [keyword, setKeyword] = useState("")

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
    loadProducts(1, keyword)
  }, [keyword])

  const totalPages = Math.ceil(total / pageSize)

  /* ================= RENDER ================= */

  return (
    <main className="min-h-screen bg-background">
      <Header onSearch={setKeyword} />

      <FeatureSection />

      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <p className="text-center">Đang tải sản phẩm...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => loadProducts(page - 1, keyword)}
              >
                ← Trang trước
              </Button>

              <span>
                Trang {page} / {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => loadProducts(page + 1, keyword)}
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
