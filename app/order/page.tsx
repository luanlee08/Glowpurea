"use client"
import { User, Phone, MapPin, Building2, Home } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMyAddresses } from "@/services/address.service"
import { getCart } from "@/services/cart.service"
import type { AddressDto } from "@/services/address.service"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
const API_BASE =
    process.env.NEXT_PUBLIC_API_URL!;

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
    const [paymentMethod, setPaymentMethod] = useState<"COD">("COD")
    const [shippingMethod, setShippingMethod] = useState<"GHTK">("GHTK")

    const [keyword, setKeyword] = useState("");
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
        <>
            {/* HEADER full width */}
            <Header onSearch={setKeyword} />

            {/* CONTENT giới hạn width */}
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

                                {/* HỌ TÊN */}
                                <div>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Họ và tên"
                                            value={form.shippingName}
                                            onChange={e =>
                                                setForm({ ...form, shippingName: e.target.value })
                                            }
                                            className="pl-10"
                                        />
                                    </div>

                                    {errors.shippingName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.shippingName}
                                        </p>
                                    )}
                                </div>

                                {/* SỐ ĐIỆN THOẠI */}
                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Số điện thoại"
                                            value={form.shippingPhone}
                                            onChange={e =>
                                                setForm({ ...form, shippingPhone: e.target.value })
                                            }
                                            className="pl-10"
                                        />
                                    </div>

                                    {errors.shippingPhone && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.shippingPhone}
                                        </p>
                                    )}
                                </div>

                                {/* ĐỊA CHỈ */}
                                <div className="relative md:col-span-2">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={form.shippingAddressLine}
                                        readOnly
                                        className="pl-10 bg-muted"
                                    />
                                </div>

                                {/* THÀNH PHỐ */}
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={form.shippingCity}
                                        readOnly
                                        className="pl-10 bg-muted"
                                    />
                                </div>

                                {/* PHƯỜNG / XÃ */}
                                <div className="relative">
                                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={form.shippingWard}
                                        readOnly
                                        className="pl-10 bg-muted"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* PAYMENT + SHIPPING */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* PAYMENT METHOD */}
                            <div className="bg-white rounded-xl shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Phương thức thanh toán
                                </h2>

                                <div
                                    onClick={() => setPaymentMethod("COD")}
                                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition
        ${paymentMethod === "COD"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary/50"}
      `}
                                >
                                    <div className="flex gap-3">
                                        <span className="text-2xl">💰</span>
                                        <div>
                                            <p className="font-semibold">
                                                Thanh toán khi nhận hàng (COD)
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Thanh toán bằng tiền mặt khi nhận hàng
                                            </p>
                                        </div>
                                    </div>

                                    <input
                                        type="radio"
                                        checked={paymentMethod === "COD"}
                                        readOnly
                                        className="w-4 h-4 accent-primary"
                                    />
                                </div>
                            </div>

                            {/* SHIPPING METHOD */}
                            <div className="bg-white rounded-xl shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Phương thức giao hàng
                                </h2>

                                <div
                                    onClick={() => setShippingMethod("GHTK")}
                                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition
        ${shippingMethod === "GHTK"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary/50"}
      `}
                                >
                                    <div className="flex gap-3">
                                        <span className="text-2xl">🚚</span>
                                        <div>
                                            <p className="font-semibold">
                                                Giao hàng tiết kiệm
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Dự kiến 2–4 ngày • Phí {formatPrice(shipping)}
                                            </p>
                                        </div>
                                    </div>

                                    <input
                                        type="radio"
                                        checked={shippingMethod === "GHTK"}
                                        readOnly
                                        className="w-4 h-4 accent-primary"
                                    />
                                </div>
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
                                            <p className="font-semibold">
                                                {item.productName}
                                            </p>
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

                        {/* Tổng số sản phẩm */}
                        <div className="flex justify-between mb-2">
                            <span>Tổng số sản phẩm</span>
                            <span className="font-semibold">
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        </div>

                        {/* Tạm tính */}
                        <div className="flex justify-between mb-6">
                            <span>Tạm tính</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        {/* Tổng cộng */}
                        <div className="flex justify-between text-lg font-bold mb-6">
                            <span>Tổng cộng</span>
                            <span className="text-primary">
                                {formatPrice(subtotal)}
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

                {/* SUCCESS MODAL */}
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
                                Đang chuyển đến trang chủ...
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </>
    )

}
