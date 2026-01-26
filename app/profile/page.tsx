"use client"
import toast from "react-hot-toast"
import type React from "react"
import { getProfile, uploadAvatar, updateProfile } from "@/services/profile.service"
import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Edit2, Save, X, Heart, ShoppingBag, Settings } from "lucide-react"
import { useEffect, useRef } from "react"
import { getMyAddresses } from "@/services/address.service"
import { updateAddress } from "@/services/address.service"
import { deleteAddress } from "@/services/address.service"
import { addAddress } from "@/services/address.service"
import type { AddressDto } from "@/services/address.service"
import {
  getMyOrders,
  getOrderDetail,
  OrderPreview,
  OrderDetailDto
} from "@/services/order.service"


function mapOrderStatus(status: string) {
  switch (status) {
    case "Pending": return "Chờ xác nhận"
    case "Confirmed": return "Đã xác nhận"
    case "Shipped": return "Đang giao"
    case "Delivered": return "Đã giao"
    case "Cancelled": return "Đã hủy"
    default: return status
  }
}

function statusBadge(status: string) {
  switch (status) {
    case "Delivered":
      return "px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
    case "Shipped":
      return "px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700"
    case "Cancelled":
      return "px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
    default:
      return "px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
  }
}

export default function Profile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState<any>(null)
  const [editData, setEditData] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null)
  const [addresses, setAddresses] = useState<AddressDto[]>([])
  const [loadingAddress, setLoadingAddress] = useState(true)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [keyword, setKeyword] = useState("");
  const [openOrderId, setOpenOrderId] = useState<number | null>(null)
  const [orderDetail, setOrderDetail] = useState<OrderDetailDto | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const handleViewOrderDetail = async (orderId: number) => {
    setOpenOrderId(orderId)
    setLoadingDetail(true)

    try {
      const data = await getOrderDetail(orderId)
      setOrderDetail(data)
    } catch (err) {
      toast.error("Không tải được chi tiết đơn hàng")
    } finally {
      setLoadingDetail(false)
    }
  }

  const [orders, setOrders] = useState<OrderPreview[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  type AddressForm = {
    address: string
    city: string
    zipCode?: string
    isDefault: boolean
  }
  const handleSaveAddress = async () => {
    if (!defaultAddressId) return

    try {
      await updateAddress(defaultAddressId, {
        addressLine: addressForm.address,
        city: addressForm.city,
        ward: addressForm.zipCode,
        ...(addressForm.isDefault ? { isDefault: true } : {}),

      })
      const updatedAddresses = await getMyAddresses()
      setAddresses(updatedAddresses)


      setIsEditingAddress(false)
    } catch (err) {
      console.error("Update address failed", err)
    }
  }


  const [addressForm, setAddressForm] = useState<AddressForm>({
    address: "",
    city: "",
    zipCode: "",
    isDefault: false,
  })

  const handleDeleteAddress = async (addr: any) => {
    if (addresses.length === 1) {
      toast.error("⚠️ Bạn phải có ít nhất một địa chỉ")
      return
    }

    if (addr.isDefault) {
      toast.error("❌ Không thể xóa địa chỉ mặc định. Hãy đổi mặc định trước.")
      return
    }

    const ok = confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")
    if (!ok) return

    try {
      await deleteAddress(addr.addressID)

      const updated = await getMyAddresses()
      setAddresses(updated)
    } catch (err) {
      console.error("Delete address failed", err)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const res = await uploadAvatar(file)
      setProfileData((prev: any) => ({
        ...prev,
        image: res.imageUrl,
      }))

    } catch (err) {
      console.error("Upload avatar thất bại", err)
    } finally {
      setUploading(false)
    }
  }


  const handleSave = async () => {
    await updateProfile({
      accountName: editData.fullName,
      phoneNumber: editData.phone,
    })

    setProfileData(editData)
    setIsEditingProfile(false)
  }


  const handleCancel = () => {
    setIsEditingProfile(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev: any) => ({ ...prev, [name]: value }))

  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        const mapped = {
          fullName: data.accountName,
          email: data.email,
          phone: data.phoneNumber ?? "",
          image: data.image,
          address: "",
          city: "",
          zipCode: "",
        }
        setProfileData(mapped)
        setEditData(mapped)
      } catch (err) {
        console.error("Lỗi lấy profile", err)
      }
    }

    fetchProfile()
  }, [])
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const addresses = await getMyAddresses()
        setAddresses(addresses)

        if (addresses.length === 0) return

        const defaultAddress =
          addresses.find(a => a.isDefault) ?? addresses[0]

        setDefaultAddressId(defaultAddress.addressID)

        setProfileData((prev: any) => ({
          ...prev,
          address: defaultAddress.addressLine,
          city: defaultAddress.city,
          zipCode: defaultAddress.ward ?? "",
        }))
      } finally {
        setLoadingAddress(false)
      }
    }

    loadAddress()
  }, [])

  useEffect(() => {
    if (activeTab !== "orders") return

    const loadOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data) // ✅ GIỮ NGUYÊN
      } catch (err) {
        console.error("Lỗi lấy đơn hàng", err)
      } finally {
        setLoadingOrders(false)
      }
    }

    loadOrders()
  }, [activeTab])



  const wishlist = [
    {
      id: 1,
      name: "Son Dưỡng Mật Ong",
      price: "45.000đ",
      image: "/honey-lip-balm-natural.jpg",
    },
    {
      id: 2,
      name: "Son Dưỡng Hoa Hồng",
      price: "52.000đ",
      image: "/rose-lip-balm-natural.jpg",
    },
  ]
  if (!profileData || !editData) {
    return (
      
      <main className="min-h-screen bg-background">

        <p className="text-center mt-20">Đang tải thông tin...</p>
      </main>
    )
  }
  return (
  <>
    <main className="min-h-screen bg-background">
      <Header onSearch={setKeyword} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileData.image ? (
                <img
                  src={`https://localhost:63731${profileData.image}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                  <User className="w-12 h-12" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Edit2 className="text-white w-6 h-6" />
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{profileData.fullName}</h1>
              <p className="text-foreground/70">{profileData.email}</p>
            </div>
            {!isEditingProfile && (
              <Button
                onClick={() => {
                  setIsEditingProfile(true)
                  setEditData(profileData)
                }}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Chỉnh sửa
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
          >
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Đơn hàng
          </button>

        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditingProfile ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Họ và Tên</label>
                      <Input
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Số điện thoại</label>
                      <Input
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={async () => {
                          await handleSave()
                          setIsEditingProfile(false)
                        }}
                      >
                        <Save className="w-4 h-4" />
                        Lưu
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditingProfile(false)
                          setEditData(profileData)
                        }}
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Họ và Tên</p>
                        <p className="font-semibold text-foreground">{profileData.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Email</p>
                        <p className="font-semibold text-foreground">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Số điện thoại</p>
                        <p className="font-semibold text-foreground">{profileData.phone}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="border-0 shadow-lg">


              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT */}
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Địa chỉ
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Cập nhật địa chỉ giao hàng
                    </CardDescription>
                  </div>

                  {/* RIGHT */}
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium"
                    onClick={() => {
                      setIsAddingAddress(true)
                      setIsEditingAddress(false)
                      setAddressForm({
                        address: "",
                        city: "",
                        zipCode: "",
                        isDefault: false,
                      })
                    }}
                  >
                    + Thêm địa chỉ
                  </Button>
                </div>
              </CardHeader>


              <CardContent className="space-y-3">
                {loadingAddress && (
                  <p className="text-sm text-muted-foreground">Đang tải địa chỉ...</p>
                )}

                {!loadingAddress && addresses.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Bạn chưa có địa chỉ nào
                  </p>
                )}

                {isAddingAddress && (
                  <div className="p-4 rounded-lg border bg-muted space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Địa chỉ</label>
                      <Input
                        value={addressForm.address}
                        onChange={(e) =>
                          setAddressForm(prev => ({ ...prev, address: e.target.value }))
                        }
                      />

                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Thành phố</label>
                      <Input
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm(prev => ({ ...prev, city: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Phường / Khu vực</label>
                      <Input
                        value={addressForm.zipCode}
                        onChange={(e) =>
                          setAddressForm(prev => ({ ...prev, zipCode: e.target.value }))
                        }
                      />
                    </div>

                    {/* Checkbox default */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) =>
                          setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))
                        }
                      />

                      <label className="text-sm">Đặt làm địa chỉ mặc định</label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        onClick={async () => {
                          await addAddress({
                            addressLine: addressForm.address,
                            city: addressForm.city,
                            ward: addressForm.zipCode,
                            ...(addressForm.isDefault ? { isDefault: true } : {}),
                          })


                          const updated = await getMyAddresses()
                          setAddresses(updated)

                          setIsAddingAddress(false)
                          setEditData(profileData)
                        }}
                      >
                        Lưu
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddingAddress(false)
                          setEditData(profileData)
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                )}

                {addresses.map((addr) => (
                  <div
                    key={addr.addressID}
                    className={`flex items-start justify-between gap-3 p-4 rounded-lg border
      ${addr.isDefault ? "bg-green-50 border-green-200" : "bg-muted border-border"}
    `}
                  >

                    {/* ===== VIEW MODE ===== */}
                    {!isEditingAddress || defaultAddressId !== addr.addressID ? (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p
                                className="font-semibold text-foreground truncate max-w-[320px]"
                                title={addr.addressLine} // hover xem full
                              >
                                {addr.addressLine}
                              </p>

                              {addr.isDefault && (
                                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                  ✓ Mặc định
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-foreground/70 truncate max-w-[360px]">
                              {addr.city}
                              {addr.ward && `, ${addr.ward}`}
                            </p>

                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setDefaultAddressId(addr.addressID)
                              setIsEditingAddress(true)
                              setAddressForm({
                                address: addr.addressLine,
                                city: addr.city,
                                zipCode: addr.ward ?? "",
                                isDefault: addr.isDefault ?? false,
                              })

                            }}
                          >
                            Sửa
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteAddress(addr)}
                          >
                            Xóa
                          </Button>
                        </div>

                      </div>
                    ) : (
                      /* ===== EDIT MODE ===== */
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold">Địa chỉ</label>
                          <Input
                            value={addressForm.address}
                            onChange={(e) =>
                              setAddressForm(prev => ({ ...prev, address: e.target.value }))
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-semibold">Thành phố</label>
                          <Input
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm(prev => ({ ...prev, city: e.target.value }))
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-semibold">Phường / Khu vực</label>
                          <Input
                            value={addressForm.zipCode}
                            onChange={(e) =>
                              setAddressForm(prev => ({ ...prev, zipCode: e.target.value }))
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            checked={addressForm.isDefault}
                            onChange={(e) =>
                              setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))
                            }
                          />
                          <label className="text-sm font-medium">
                            Đặt làm địa chỉ mặc định
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2 justify-end">
                          <Button
                            onClick={async () => {
                              await handleSaveAddress()
                              setIsEditingAddress(false)
                            }}
                          >
                            Lưu
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingAddress(false)
                              setEditData(profileData)
                            }}
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </CardContent>
            </Card>

          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => {
              const item = order.previewItem
              const extraCount = order.totalItems - 1

              return (
                <Card key={order.orderId} className="border-0 shadow-lg">
                  <CardContent className="p-6 space-y-4">

                    {/* ===== HEADER ===== */}
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">
                          Đơn hàng ORD{order.orderId.toString().padStart(3, "0")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {order.totalAmount.toLocaleString()}đ
                        </p>
                        <span className={statusBadge(order.status)}>
                          {mapOrderStatus(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* ===== PRODUCT PREVIEW ===== */}
                    {item && (
                      <div className="flex gap-4 items-center border-t pt-4">
                        <img
                          src={`https://localhost:63731${item.imageUrl}`}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />

                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">
                            {item.productName}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            x{item.quantity}
                            {extraCount > 0 && ` · +${extraCount} sản phẩm khác`}
                          </p>
                        </div>

                        <p className="font-semibold">
                          {(item.unitPrice * item.quantity).toLocaleString()}đ
                        </p>
                      </div>
                    )}

                    {/* ===== FOOTER ===== */}
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => handleViewOrderDetail(order.orderId)}
                      >
                        Xem chi tiết
                      </Button>

                    </div>

                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}



        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Thêm vào giỏ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Cài đặt tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Thông báo email</p>
                    <p className="text-sm text-foreground/60">Nhận thông báo về đơn hàng và khuyến mãi</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Thông báo SMS</p>
                    <p className="text-sm text-foreground/60">Nhận tin nhắn về trạng thái đơn hàng</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent border border-border hover:bg-muted">
                  Đổi mật khẩu
                </Button>
                <Button variant="outline" className="w-full bg-transparent border border-border hover:bg-muted">
                  Xóa tài khoản
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
    {
    openOrderId && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

          {/* CLOSE */}
          <button
            onClick={() => {
              setOpenOrderId(null)
              setOrderDetail(null)
            }}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {loadingDetail || !orderDetail ? (
            <p className="text-center py-10">Đang tải...</p>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  Đơn hàng ORD{orderDetail.orderId.toString().padStart(3, "0")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(orderDetail.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>

              {/* STATUS */}
              <span className={statusBadge(orderDetail.status)}>
                {mapOrderStatus(orderDetail.status)}
              </span>

              {/* ITEMS */}
              <div className="mt-6 space-y-4">
                {orderDetail.items.map(item => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {item.unitPrice.toLocaleString()}đ
                      </p>
                    </div>

                    <p className="font-semibold">
                      {item.total.toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Tổng cộng</span>
                <span>{orderDetail.totalAmount.toLocaleString()}đ</span>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
</>
  )
}
