import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import Notification from '../../components/notifications/notifications'
import { useDeleteProduct, useProduct, useProductImages } from '../../hooks/products'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = useParams({ from: '/products/$productId' })
  const navigate = useNavigate()
  const { data: product } = useProduct(productId)
  const { data: images = [] } = useProductImages(productId)
  const deleteProduct = useDeleteProduct()
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [invalidQuantity, setInvalidQuantity] = useState(false)
  const [purchaseProduct, setPurchaseProduct] = useState(false)

  const handleAddToCart = () => {
    if (quantity < 1) {
      setInvalidQuantity(true)
      setAddedToCart(false)
    } else {
      setAddedToCart(true)
      setInvalidQuantity(false)
    }
  }

  const handlePurchaseProduct = () => {
    if (quantity < 1) {
      setInvalidQuantity(true)
      setPurchaseProduct(false)
    } else {
      setPurchaseProduct(true)
      setInvalidQuantity(false)
    }
  }

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNextImage = () => {
    setActiveImageIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  return (
    <>
      <Notification type="Success" show={addedToCart} onClose={() => setAddedToCart(false)}>
        Product added to cart!
      </Notification>
      <Notification type="Success" show={purchaseProduct} onClose={() => setPurchaseProduct(false)}>
        Product purchased!
      </Notification>
      <Notification type="Warning" show={invalidQuantity} onClose={() => setInvalidQuantity(false)}>
        Invalid quantity!
      </Notification>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          {images.length > 0 ? (
            <>
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100">
                {images.map((image, index) => (
                  <img
                    key={`${image.imageId ?? index}`}
                    src={`data:image/*;base64,${image.imageData}`}
                    alt={image.imageName || product?.name || 'Product image'}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {images.map((image, index) => (
                      <button
                        key={`thumb-${image.imageId ?? index}`}
                        type="button"
                        aria-label={`Show image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full ${
                          index === activeImageIndex ? 'bg-slate-900' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={showNextImage}
                    className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              No images available
            </div>
          )}
        </div>

        <form className="space-y-4 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{product?.name || 'Product Name'}</h2>
          <p className="text-3xl font-black text-slate-900">
            {product?.price !== undefined ? `$${product.price.toFixed(2)}` : '$0.00'}
          </p>
          <p className="text-slate-600">{product?.description || 'Product description goes here.'}</p>

            <label className="block text-sm font-medium text-slate-700">
              Quantity &nbsp;
              <input
                id="quantity"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 w-auto"
                type="number"
                value={quantity}
                min="1"
                onChange={(event) => setQuantity(parseInt(event.target.value, 10) || 0)}
              />
            </label>
          <button
            type="button"
            onClick={handlePurchaseProduct}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => {
              if (productId) {
                deleteProduct.mutate(productId, {
                  onSuccess: () => navigate({ to: '/products/all' }),
                })
              }
            }}
            disabled={deleteProduct.isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteProduct.isPending ? 'Deleting...' : 'Delete Product'}
          </button>
        </form>
      </div>
    </>
  )
}
