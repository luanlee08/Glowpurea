import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"

export interface ProductCardDto {
  id: number
  name: string
  description: string
  price: string
  image: string
  ingredients: string
}

export interface PagedResponse<T> {
  total: number
  page: number
  pageSize: number
  data: T[]
}

export const getUserProducts = async (
  page = 1,
  pageSize = 8
): Promise<PagedResponse<ProductCardDto>> => {
  const res = await axios.get(API_ENDPOINTS.USER_PRODUCTS, {
    params: { page, pageSize },
  })
  return res.data
}
