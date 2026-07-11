import { createFileRoute } from '@tanstack/react-router'

import ProductsGrid from '../../components/products/products-grid'
import { useProducts } from '../../hooks/products'

export const Route = createFileRoute('/products/all')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: products = [], isLoading, error } = useProducts()

  return (
    <>
      <h1 className="border-b mx-8">All Products</h1>
      {isLoading && <p>Loading products...</p>}
      {error && <p>Unable to load products right now.</p>}
      {!isLoading && !error && <ProductsGrid products={products} />}
    </>
  )
}
