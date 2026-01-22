import axios from "axios"

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

export interface OrderPreview {
  orderId: number
  createdAt: string
  totalAmount: number
  status: string
  totalItems: number
  previewItem?: {
    productId: number
    productName: string
    imageUrl?: string
    unitPrice: number
    quantity: number
  }
}

export async function getMyOrders(): Promise<OrderPreview[]> {
  const res = await axios.get(`${API_BASE}/api/orders/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
  return res.data
}

export interface OrderDetailDto {
  orderId: number
  createdAt: string
  status: string
  totalAmount: number
  items: {
    productId: number
    productName: string
    unitPrice: number
    quantity: number
    total: number
  }[]
}

export async function getOrderDetail(orderId: number): Promise<OrderDetailDto> {
  const res = await axios.get(
    `${API_BASE}/api/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  )

  return res.data
}
