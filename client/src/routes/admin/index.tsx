import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
  <h1>Admin Dashboard</h1>
    <Link className="btn btn-primary" to="/admin/create-product">Post New Product</Link>
    <Link className="btn btn-primary" to="/admin/delete-product">View All Products</Link>
  </>
}