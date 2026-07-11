import { Col, Container, Row } from 'react-bootstrap'
import type { ApiProduct } from '../../models/product'
import ProductCard from './product-card'

interface ProductsGridProps {
  products: ApiProduct[]
}

function ProductsGrid({ products }: ProductsGridProps) {
  if (!products.length) {
    return <p>No products available yet.</p>
  }

  return (
    <section className="product-grid">
      <div className="flex justify-around gap-4 p-8 flex-wrap">
        {products.map((product) => (
            <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </section>
  )
}

export default ProductsGrid