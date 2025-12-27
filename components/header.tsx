"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, User, LogOut, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { isLoggedIn as checkLoggedIn, logout } from "@/services/auth.service"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [avatar, setAvatar] = useState<string | null>(null)

 useEffect(() => {
  const syncAvatar = () => {
    const storedAvatar = localStorage.getItem("avatar")
    setAvatar(storedAvatar)
  }

  syncAvatar()

  window.addEventListener("avatar-updated", syncAvatar)

  return () => {
    window.removeEventListener("avatar-updated", syncAvatar)
  }
}, [])


  useEffect(() => {
    setIsLoggedIn(checkLoggedIn())
  }, [])

  const handleLogout = () => {
    logout()
    localStorage.removeItem("avatar")
    setAvatar(null)
    setIsLoggedIn(false)
    setIsProfileOpen(false)
    toast.success("👋 Đã đăng xuất")
    router.push("/signin")
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              🌿
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Glowpurea
              </h1>
              <p className="text-xs text-muted-foreground">Tự nhiên & Sạch sẽ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
              Trang chủ
            </Link>
            <Link href="#products" className="text-foreground hover:text-primary font-medium transition-colors">
              Sản phẩm
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary font-medium transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary font-medium transition-colors">
              Về chúng tôi
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary font-medium transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Search Bar & Profile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 pr-4 py-2 rounded-full bg-muted border-0 focus:ring-2 focus:ring-primary w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                3
              </span>
            </Link>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {avatar ? (
                  <img
                    src={`https://localhost:63731${avatar}`}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </button>
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-border py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      {/* Hồ sơ */}
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                      >
                        <User className="w-4 h-4 text-primary" />
                        Hồ sơ
                      </Link>

                      <hr className="my-2" />

                      {/* Đăng xuất */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-foreground hover:bg-destructive/10 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Đăng nhập */}
                      <Link
                        href="/signin"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors font-medium"
                      >
                        Đăng nhập
                      </Link>

                      {/* Đăng ký */}
                      <Link
                        href="/signup"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors font-medium"
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors">
                Trang chủ
              </Link>
              <Link
                href="#products"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                Sản phẩm
              </Link>
              <Link href="/blog" className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors">
                Blog
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                Về chúng tôi
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                Liên hệ
              </Link>
              <Link
                href="/cart"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Giỏ hàng
              </Link>
            </nav>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                Đăng nhập
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">Đăng ký</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
