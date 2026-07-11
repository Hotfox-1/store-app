import { User } from './user'

export interface ApiProduct {
  id?: string
  productId?: number
  name: string
  description?: string | null
  price: number
  color?: string
  size?: string
  owner_id?: string
  ownerId?: number
  imageUrls?: string | null
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  color: string
  size: string
  owner: User
}