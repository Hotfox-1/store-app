import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useCreateProduct } from '../../hooks/products'

export const Route = createFileRoute('/admin/create-product')({
  component: RouteComponent,
})

function RouteComponent() {
  const createProduct = useCreateProduct()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    color: '',
    size: '',
  })
  const [images, setImages] = useState<FileList | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('price', String(Number(form.price)))
    formData.append('color', form.color)
    formData.append('size', form.size)

    if (images) {
      Array.from(images).forEach((image) => {
        formData.append('images', image)
      })
    }

    createProduct.mutate(formData as unknown as never)
  }

  return (
    <section>
      <h1>Create Product</h1>
      <Form className="flex flex-col gap-4 align-top" onSubmit={handleSubmit}>
          <label>Product Name &nbsp;
          <input className="border-b p-1" name="name" required value={form.name} onChange={handleChange} />
          </label>
          <label className="flex justify-center align-top">Description &nbsp;
            <textarea className="border-b p-1" name="description" rows={3} value={form.description} onChange={handleChange} />
          </label>          
          <label>Price &nbsp;
          <input className="border-b p-1" name="price" type="number" min="0" step="0.01" required value={form.price} onChange={handleChange} />
          </label>
          <label>Color &nbsp;
          <input className="border-b p-1" name="color" value={form.color} onChange={handleChange} />
          </label>
          <label>Size &nbsp;
          <input className="border-b p-1" name="size" value={form.size} onChange={handleChange} />
          </label>
          <div>
          <label className="shadow-sm p-3 rounded-2xl">Image(s) &nbsp;
          <input className="border-l pl-1 border-gray-500" type="file" multiple onChange={handleImageChange} />
          </label>
          </div>

        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit" disabled={createProduct.isPending}>
          {createProduct.isPending ? 'Creating...' : 'Create'}
        </Button>
        {createProduct.isError && <p className="text-danger mt-2">Unable to create product.</p>}
        {createProduct.isSuccess && <p className="text-success mt-2">Product created.</p>}
      </Form>
    </section>
  )
}
