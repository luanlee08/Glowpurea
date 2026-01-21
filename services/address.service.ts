import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"

export interface AddressDto {
  addressID: number
  addressLine: string
  city: string
  ward?: string
  isDefault?: boolean
}

export const getMyAddresses = async (): Promise<AddressDto[]> => {
  const res = await axios.get(API_ENDPOINTS.ADDRESS.LIST, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return res.data
}

export const addAddress = async (data: {
  addressLine: string
  city: string
  ward?: string
  isDefault?: boolean
}) => {
  await axios.post(API_ENDPOINTS.ADDRESS.CREATE, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}

export const updateAddress = async (
  id: number,
  data: {
    addressLine: string
    city: string
    ward?: string
    isDefault?: boolean
  }
) => {
  await axios.put(API_ENDPOINTS.ADDRESS.UPDATE(id), data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}

export const deleteAddress = async (id: number) => {
  await axios.delete(API_ENDPOINTS.ADDRESS.DELETE(id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}
