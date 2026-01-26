"use client"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

/* ================= CONFIG ================= */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

/* ================= TYPES ================= */

interface CartItem {
  cartItemId: number
  productId: number
  productName: string
  price: number
  quantity: number
  imageUrl: string
}

/* ================= PAGE ================= */

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const router = useRouter()
  const [keyword, setKeyword] = useState("");
  /* ===== LOAD CART ===== */
  useEffect(() => {
    const fetchCart = async () => {
      const token = getToken()
      if (!token) {
        toast.error("Vui lòng đăng nhập để xem giỏ hàng")
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(`${API_BASE}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCartItems(res.data)
      } catch {
        toast.error("Không thể tải giỏ hàng")
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  /* ===== HELPERS ===== */
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = subtotal > 500_000 ? 0 : 30_000
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + tax

  /* ===== ACTIONS ===== */
  const updateQuantity = async (
    cartItemId: number,
    newQty: number
  ) => {
    if (newQty <= 0) {
      await removeItem(cartItemId)
      return
    }

    const token = getToken()
    if (!token) return

    try {
      await axios.patch(
        `${API_BASE}/api/cart/items/${cartItemId}`,
        { quantity: newQty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQty }
            : item
        )
      )
    } catch {
      toast.error("Không thể cập nhật số lượng")
    }
  }

  const removeItem = async (cartItemId: number) => {
    const token = getToken()
    if (!token) return

    try {
      await axios.delete(
        `${API_BASE}/api/cart/items/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setCartItems((prev) =>
        prev.filter((i) => i.cartItemId !== cartItemId)
      )

      toast.success("Đã xóa sản phẩm")
    } catch {
      toast.error("Không thể xóa sản phẩm")
    }
  }

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        Đang tải giỏ hàng...
      </main>
    )
  }

  /* ================= RENDER ================= */

  return (
    
    <main className="min-h-screen bg-background">
         <Header onSearch={setKeyword} />
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* ===== HEADER ===== */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-1">
              Giỏ Hàng
            </h1>
            <p className="text-muted-foreground">
              Bạn có{" "}
              <span className="font-semibold">
                {totalItems}
              </span>{" "}
              sản phẩm trong giỏ
            </p>
          </div>
        </div>

        {/* ===== EMPTY ===== */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <ShoppingCart className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Giỏ hàng trống
            </h2>

            <p className="text-muted-foreground mb-6">
              Hãy thêm sản phẩm để tiếp tục mua sắm
            </p>

            <Link href="/">
              <Button className="bg-primary">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ===== ITEMS ===== */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl shadow overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-5 p-6 border-b last:border-b-0 hover:bg-muted/30 transition"
                  >
                    {/* IMAGE */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={
                          item.imageUrl?.startsWith("http")
                            ? item.imageUrl
                            : `${API_BASE}${item.imageUrl}`
                        }
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-lg font-semibold hover:text-primary transition"
                        >
                          {item.productName}
                        </Link>

                        <p className="text-sm text-muted-foreground mt-1">
                          Đơn giá
                        </p>

                        <p className="text-primary font-bold">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.cartItemId)
                        }
                        className="text-red-500 text-sm flex items-center gap-1 hover:underline w-fit"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa sản phẩm
                      </button>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-end justify-between">
                      {/* QUANTITY */}
                      <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.cartItemId,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:text-primary transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-6 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.cartItemId,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:text-primary transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* TOTAL */}
                      <p className="font-bold text-lg mt-3">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/">
                <Button variant="outline">
                  ← Tiếp tục mua sắm
                </Button>
              </Link>
            </div>

            {/* ===== SUMMARY ===== */}
            <div>
              <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block">
                    Mã khuyến mãi
                  </label>

                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value)
                      }
                      placeholder="Nhập mã"
                    />

                    <Button variant="outline">
                      Áp dụng
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Vận chuyển</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Thuế (10%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">
                    Tổng cộng
                  </span>
                  <span className="text-3xl font-extrabold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button
                  className="w-full h-12 text-lg bg-primary hover:opacity-90 transition"
                  onClick={() => router.push("/order")}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
