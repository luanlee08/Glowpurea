"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMyAddresses } from "@/services/address.service"
import { getCart } from "@/services/cart.service"
import type { AddressDto } from "@/services/address.service"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

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

export default function OrderPage() {
    const [loading, setLoading] = useState(true)

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const [form, setForm] = useState({
        shippingName: "",
        shippingPhone: "", // ❌ để trống
        shippingAddressLine: "",
        shippingCity: "",
        shippingWard: "",
    })
    const router = useRouter()
    const [showSuccess, setShowSuccess] = useState(false)
    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null)
    const [errors, setErrors] = useState({
        shippingName: "",
        shippingPhone: "",
    })

    /* ===== LOAD CART + DEFAULT ADDRESS ===== */
    useEffect(() => {
        const loadData = async () => {
            try {
                // 1️⃣ Load cart
                const cart = await getCart()
                setCartItems(cart)

                // 2️⃣ Load default address
                const addresses = await getMyAddresses()
                if (!addresses || addresses.length === 0) return

                const defaultAddr =
                    addresses.find(a => a.isDefault) ?? addresses[0]

                setForm(prev => ({
                    ...prev,
                    shippingAddressLine: defaultAddr.addressLine,
                    shippingCity: defaultAddr.city,
                    shippingWard: defaultAddr.ward ?? "",
                }))
            } catch (err) {
                console.error("Load order data failed", err)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    /* ===== PRICE ===== */
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)

    const subtotal = cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    )

    const shipping = subtotal > 500_000 ? 0 : 30_000
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + shipping + tax

    /* ===== LOADING ===== */
    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                Đang tải thông tin đặt hàng...
            </main>
        )
    }

    //Đặt hàng
    const handlePlaceOrder = async () => {
        // reset lỗi cũ
        setErrors({ shippingName: "", shippingPhone: "" })

        let hasError = false

        if (!form.shippingName.trim()) {
            setErrors(prev => ({
                ...prev,
                shippingName: "Vui lòng nhập họ và tên",
            }))
            hasError = true
        }

        if (!form.shippingPhone.trim()) {
            setErrors(prev => ({
                ...prev,
                shippingPhone: "Vui lòng nhập số điện thoại",
            }))
            hasError = true
        }

        if (hasError) return // ⛔ chặn submit

        try {
            const token = localStorage.getItem("token")

            const res = await fetch(`${API_BASE}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error("Create order failed")
            }

            const data = await res.json()

            setCreatedOrderId(data.orderId)
            setShowSuccess(true)

            setTimeout(() => {
                router.push("/")
            }, 1500)

        } catch (err) {
            console.error(err)
            alert("Đặt hàng thất bại")
        }
    }

    /* ================= RENDER ================= */

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Đặt Hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    {/* SHIPPING INFO */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Thông tin giao hàng
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    placeholder="Họ và tên"
                                    value={form.shippingName}
                                    onChange={e =>
                                        setForm({ ...form, shippingName: e.target.value })
                                    }
                                />
                                {errors.shippingName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.shippingName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    placeholder="Số điện thoại"
                                    value={form.shippingPhone}
                                    onChange={e =>
                                        setForm({ ...form, shippingPhone: e.target.value })
                                    }
                                />
                                {errors.shippingPhone && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.shippingPhone}
                                    </p>
                                )}
                            </div>

                            <Input
                                value={form.shippingAddressLine}
                                readOnly
                            />

                            <Input
                                value={form.shippingCity}
                                readOnly
                            />

                            <Input
                                value={form.shippingWard}
                                readOnly
                            />

                        </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Sản phẩm trong đơn
                        </h2>

                        {cartItems.map(item => (
                            <div
                                key={item.cartItemId}
                                className="flex justify-between py-4 border-b last:border-b-0"
                            >
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                                        <img
                                            src={
                                                item.imageUrl.startsWith("http")
                                                    ? item.imageUrl
                                                    : `${API_BASE}${item.imageUrl}`
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-semibold">{item.productName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatPrice(item.price)} × {item.quantity}
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold">
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="bg-white rounded-xl shadow p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6">
                        Tóm tắt đơn hàng
                    </h2>

                    <div className="flex justify-between mb-2">
                        <span>Tạm tính</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>Vận chuyển</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>

                    <div className="flex justify-between mb-6">
                        <span>Thuế</span>
                        <span>{formatPrice(tax)}</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Tổng cộng</span>
                        <span className="text-primary">
                            {formatPrice(total)}
                        </span>
                    </div>

                    <Button
                        className="w-full bg-primary"
                        onClick={handlePlaceOrder}
                    >
                        Đặt hàng
                    </Button>

                </div>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl p-8 w-[380px] text-center shadow-xl animate-in fade-in zoom-in">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                        <h2 className="text-2xl font-bold mb-2">
                            Đặt hàng thành công
                        </h2>

                        <p className="text-muted-foreground">
                            Đơn hàng của bạn đã được ghi nhận
                        </p>

                        <p className="text-sm text-muted-foreground mt-2">
                            Đang chuyển đến trang đơn hàng...
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}
