"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, User, LogOut, ShoppingCart } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { isLoggedIn as checkLoggedIn, logout } from "@/services/auth.service"

export default function Header({
  onSearch,
}: {
  onSearch?: (keyword: string) => void
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")

  const keywordFromUrl = searchParams.get("keyword") || ""

  /* ================= SEARCH ================= */
  useEffect(() => {
    setSearchText(keywordFromUrl)
  }, [keywordFromUrl])

  const handleSearch = () => {
    const keyword = searchText.trim()
    if (!keyword) return
    onSearch?.(keyword)
  }

  /* ================= AUTH SYNC ================= */
  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(checkLoggedIn())
      setAvatar(localStorage.getItem("avatar"))
    }

    syncAuth()

    window.addEventListener("auth-changed", syncAuth)
    window.addEventListener("avatar-updated", syncAuth)

    return () => {
      window.removeEventListener("auth-changed", syncAuth)
      window.removeEventListener("avatar-updated", syncAuth)
    }
  }, [])

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout()
    localStorage.removeItem("avatar")

    setIsLoggedIn(false)
    setAvatar(null)
    setIsProfileOpen(false)

    window.dispatchEvent(new Event("auth-changed"))

    toast.success("👋 Đã đăng xuất")
    router.push("/signin")
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
              🌿
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Glowpurea
              </h1>
              <p className="text-xs text-muted-foreground">Tự nhiên & Sạch sẽ</p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">Trang chủ</Link>
            <Link href="/#products">Sản phẩm</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">Về chúng tôi</Link>
            <Link href="#contact">Liên hệ</Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchText(value)

                  // 🔥 Khi xóa hết text → reset danh sách sản phẩm
                  if (!value.trim()) {
                    onSearch?.("")
                  }
                }}

                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    if (searchText.trim()) {
                      handleSearch()
                    }
                  }
                }}

                className="pl-10 rounded-full bg-muted border-0"
              />
              <Search
                onClick={handleSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
              />
            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-primary/10"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                3
              </span> */}
            </Link>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center"
              >
                {avatar ? (
                  <img
                    src={`https://localhost:63731${avatar}`}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-primary/10"
                      >
                        Hồ sơ
                      </Link>

                      <hr className="my-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-destructive/10 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-primary/10"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-primary/10"
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden space-y-3 pb-4">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  if (searchText.trim()) {
                    handleSearch()
                  }
                }
              }}

              className="rounded-full bg-muted border-0"
            />

            <nav className="flex flex-col gap-2">
              <Link href="/">Trang chủ</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/cart">Giỏ hàng</Link>
            </nav>

            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/signin")}
                  className="flex-1"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => router.push("/signup")}
                  className="flex-1"
                >
                  Đăng ký
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/profile")}
                >
                  Hồ sơ
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
