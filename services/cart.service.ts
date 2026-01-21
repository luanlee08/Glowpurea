import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export async function addToCart(productId: number, quantity = 1) {
  const token = getToken()
  if (!token) throw new Error("Chưa đăng nhập")

  return axios.post(
    `${API_BASE}/api/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
}

export async function getCart() {
  const token = getToken()
  if (!token) throw new Error("Chưa đăng nhập")

  const res = await axios.get(API_ENDPOINTS.CART.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
