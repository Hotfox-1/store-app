import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ApiProduct } from '../models/product'
import type { ProductImage } from '../models/image'
import type { ProductSection } from '../models/section'

export interface CreateProductInput {
  name: string
  description: string
  price: number
  color: string
  size: string
}

const API_BASE_URL = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_API_URL ?? 'http://localhost:8080'

// Tanstack doesn't stop you from using fetch. 
// Instead it makes it cleaner by not forcing you to use long .then chains for the same functionality.
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json() as Promise<T>
}

// hooks must be called at top level and in react functions.
export const useProducts = () =>
  // useQuery- fetch, cache, and sync server state in asynchronous operations
  useQuery<ApiProduct[]>({
    // identifies query
    queryKey: ['products'],
    queryFn: () => request<ApiProduct[]>('/products'),
  })

export const useProduct = (productId?: string) =>
  useQuery<ApiProduct>({
    queryKey: ['products', productId],
    queryFn: () => {
      if (!productId) {
        throw new Error('Product id is required')
      }

      return request<ApiProduct>(`/products/${productId}`)
    },
    enabled: Boolean(productId),
  })

export const useProductImages = (productId?: string) =>
  useQuery<ProductImage[]>({
    queryKey: ['products', productId, 'images'],
    queryFn: () => {
      if (!productId) {
        throw new Error('Product id is required')
      }

      return request<ProductImage[]>(`/products/${productId}/images`)
    },
    enabled: Boolean(productId),
  })

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  // create/update/delete operations
  return useMutation({
    mutationFn: (input: FormData) =>
      fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        body: input,
      }).then(async (response) => {
        if (!response.ok) {
          const message = await response.text()
          throw new Error(message || 'Request failed')
        }

        return response.json() as Promise<ApiProduct>
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
      }).then(async (response) => {
        if (!response.ok) {
          const message = await response.text()
          throw new Error(message || 'Request failed')
        }

        return response.json() as Promise<boolean>
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useProductSections = () => {
    useQuery<ProductSection[]>({
        queryKey: ['sections'],
        queryFn: () => request<ProductSection[]>('/sections'),
    });
}

export const useFeaturedProducts = () => {
    useQuery<ApiProduct[]>({
        queryKey: ['featured'],
        queryFn: () => request<ApiProduct[]>('/products/featured'),
    });
}