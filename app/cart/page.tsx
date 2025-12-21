"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, CarIcon as CartIcon } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Son Dưỡng Mật Ong",
      price: 45000,
      quantity: 2,
      image: "/honey-lip-balm-natural.jpg",
    },
    {
      id: 2,
      name: "Son Dưỡng Dâu Tây",
      price: 50000,
      quantity: 1,
      image: "/strawberry-lip-balm-natural.jpg",
    },
    {
      id: 5,
      name: "Son Dưỡng Hoa Hồng",
      price: 52000,
      quantity: 1,
      image: "/rose-lip-balm-natural.jpg",
    },
  ])

  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 30000
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Giỏ Hàng</h1>
          <p className="text-foreground/60">Bạn có {cartItems.length} sản phẩm trong giỏ</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <CartIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Giỏ hàng của bạn trống</h2>
            <p className="text-foreground/60 mb-6">Hãy thêm một số sản phẩm để tiếp tục mua sắm</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">Tiếp tục mua sắm</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-6 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-2xl overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link
                        href="/"
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 mt-1 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link href="/" className="inline-block mt-6">
                <Button
                  variant="outline"
                  className="bg-transparent border border-primary text-primary hover:bg-primary/10"
                >
                  ← Tiếp tục mua sắm
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-6">Tóm Tắt Đơn Hàng</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground mb-2 block">Mã khuyến mãi</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Nhập mã"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-lg border border-border"
                    />
                    <Button variant="outline" className="bg-transparent border border-border">
                      Áp dụng
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Tạm tính</span>
                    <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Vận chuyển</span>
                    <span className="font-semibold text-foreground">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Thuế</span>
                    <span className="font-semibold text-foreground">{formatPrice(tax)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-bold text-foreground">Tổng cộng</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                  {shipping === 0 && <p className="text-sm text-primary/70">Miễn phí vận chuyển</p>}
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                  Thanh Toán
                </Button>

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-foreground/60 text-center">✓ Thanh toán an toàn với SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
