import axios from "@/lib/axios"
import { notification } from "antd"

type TAxiosError = {
  error: unknown
}

export async function axiosSafeGet<T>(url: string): Promise<T | TAxiosError> {
  let data = null
  
  try {
    const res = await axios.get(url)
    data = res.data
  } catch (error) {
    data = {error}
  }
  
  return data
}