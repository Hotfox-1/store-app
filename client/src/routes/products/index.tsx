import { createFileRoute, Link } from '@tanstack/react-router'
import ProductsList from '../../components/products/products-list'
import { useProductSections } from '../../hooks/products';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: sections = [], isLoading, error } = useProductSections();
  let noSections = !!sections && sections.length === 0;
  return <>
  <h1>Products</h1>
  {sections.map((section) => (
    <ProductsList key={section.id} sectionName={section.name} />
  ))}
  {noSections? <p>There are no featured products to display.</p> :   null}
  <Link to="/products/all" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg w-auto">
    View All Products
  </Link>
  </>
}
