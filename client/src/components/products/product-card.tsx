import { Link } from '@tanstack/react-router'
import { Card, CardImg } from 'react-bootstrap'
import type { ApiProduct } from '../../models/product'
import { useProductImages } from '../../hooks/products'

interface ProductCardProps {
  product?: ApiProduct
}

function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return null
  }
  const { data: images = [] } = useProductImages(product.id ?? product.productId?.toString())
  const image = images[0] || { imageData: '', imageName: '' }

  const productId = product.id ?? product.productId

  return (
    <div className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:underline" style={{ width: '15rem'}}>
      <Link className="" to="/products/$productId" params={{ productId: String(productId) }}>
        <img      
        className="rounded-t-2xl object-cover w-full"                     
        src={`data:image/*;base64,${image.imageData}`}
        alt={image.imageName || product?.name || 'Product image'} />
        <div className="card-body">
          <p className="card-title">{product.name}</p>
          <p className="card-text">${Number(product.price).toFixed(2)}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard