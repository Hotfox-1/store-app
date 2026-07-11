import { createFileRoute, Link } from '@tanstack/react-router'
import ProductsList from '../../components/products/products-list'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const sections = []
  let sectionEmpty = true
  return <>
  <h1>Products</h1>
  {sectionEmpty? <p>There are no featured products to display.</p> :   <ProductsList />}
  <Link to="/products/all" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg w-auto">
    View All Products
  </Link>
  </>
}
