import { TCollection } from "./collection"

export type TItem = {
  _id: string
  title: string
  _collection: TCollection
  tags: string[]
  integer1?: number
  integer2?: number
  integer3?: number
  string1?: string
  string2?: string
  string3?: string
  text1?: string
  text2?: string
  text3?: string
  boolean1?: boolean
  boolean2?: boolean
  boolean3?: boolean
  date1?: Date
  date2?: Date
  date3?: Date
}