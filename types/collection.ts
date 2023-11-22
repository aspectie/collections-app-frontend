import { TCategory } from "./category"
import { TUser } from "./user"

export type TCollection = {
  _id: string
  title: string
  description?: string
  image_url?: string
  user: TUser
  theme: TCategory
  integer1_name?: string
  integer1_enabled: boolean
  integer2_name?: string
  integer2_enabled: boolean
  integer3_name?: string
  integer3_enabled: boolean
  string1_name?: string
  string1_enabled: boolean
  string2_name?: string
  string2_enabled: boolean
  string3_name?: string
  string3_enabled: boolean
  text1_name?: string
  text1_enabled: boolean
  text2_name?: string
  text2_enabled: boolean
  text3_name?: string
  text3_enabled: boolean
  boolean1_name?: string
  boolean1_enabled: boolean
  boolean2_name?: string
  boolean2_enabled: boolean
  boolean3_name?: string
  boolean3_enabled: boolean
  date1_name?: string
  date1_enabled: boolean
  date2_name?: string
  date2_enabled: boolean
  date3_name?: string
  date3_enabled: boolean
}