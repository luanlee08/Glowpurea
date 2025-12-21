"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Edit2, Save, X, Heart, ShoppingBag, Settings } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    city: "TP.HCM",
    zipCode: "70000",
  })

  const [editData, setEditData] = useState(profileData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const orders = [
    {
      id: "ORD001",
      date: "2025-01-15",
      total: "150.000đ",
      status: "Đã giao",
      items: 3,
    },
    {
      id: "ORD002",
      date: "2025-01-10",
      total: "95.000đ",
      status: "Đang giao",
      items: 2,
    },
    {
      id: "ORD003",
      date: "2025-01-05",
      total: "200.000đ",
      status: "Đã giao",
      items: 4,
    },
  ]

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

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
              <User className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{profileData.fullName}</h1>
              <p className="text-foreground/70">{profileData.email}</p>
            </div>
            {!isEditing && (
              <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90 gap-2">
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
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Đơn hàng
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "wishlist"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Heart className="w-4 h-4" />
            Yêu thích
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Settings className="w-4 h-4" />
            Cài đặt
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
                {isEditing ? (
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
                      <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 gap-2">
                        <Save className="w-4 h-4" />
                        Lưu
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1 gap-2 bg-transparent">
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
              <CardHeader>
                <CardTitle>Địa chỉ</CardTitle>
                <CardDescription>Cập nhật địa chỉ giao hàng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Địa chỉ</label>
                      <Input
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Thành phố</label>
                      <Input
                        name="city"
                        value={editData.city}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Mã bưu điện</label>
                      <Input
                        name="zipCode"
                        value={editData.zipCode}
                        onChange={handleChange}
                        className="border border-border rounded-lg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-foreground/60">Địa chỉ</p>
                        <p className="font-semibold text-foreground">{profileData.address}</p>
                        <p className="text-sm text-foreground/70">
                          {profileData.city}, {profileData.zipCode}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Đơn hàng {order.id}</p>
                      <p className="text-sm text-foreground/60">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.total}</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Đã giao" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 mt-2">{order.items} sản phẩm</p>
                </CardContent>
              </Card>
            ))}
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
  )
}
