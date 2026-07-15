import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCreateProduct } from '../../hooks/products'
import { Field, useForm } from '@tanstack/react-form'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  price: z.string().trim().min(1, 'Price is required').refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, 'Price must be a valid number'),
  color: z.string().trim(),
  size: z.string().trim(),
})

export const Route = createFileRoute('/admin/create-product')({
  component: RouteComponent,
})

function RouteComponent() {
  const createProduct = useCreateProduct()
  const [images, setImages] = useState<FileList | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      color: '',
      size: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = productSchema.safeParse(value)

        if (!result.success) {
          return result.error.issues[0]?.message
        }
      },
    },
    onSubmit: ({ value }) => {
      const formData = new FormData()
      formData.append('name', value.name)
      formData.append('description', value.description)
      formData.append('price', String(Number(value.price)))
      formData.append('color', value.color)
      formData.append('size', value.size)

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append('images', image)
        })
      }

      createProduct.mutate(formData as any)
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files)
  }

  return (
    <section>
      <h1>Create Product</h1>
      <form
        className="flex flex-col gap-4 align-top"
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit()
        }}
      >
        <label>
          Product Name &nbsp;
          <Field name="name" form={form}>
            {(field) => (
              <input
                className="border-b p-1"
                required
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </Field>
        </label>

        <label className="flex justify-center align-top">
          Description &nbsp;
          <Field name="description" form={form}>
            {(field) => (
              <textarea
                className="border-b p-1"
                rows={3}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </Field>
        </label>

        <label>
          Price &nbsp;
          <Field name="price" form={form}>
            {(field) => (
              <input
                className="border-b p-1"
                type="number"
                min="0"
                step="0.01"
                required
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </Field>
        </label>

        <label>
          Color &nbsp;
          <Field name="color" form={form}>
            {(field) => (
              <input className="border-b p-1" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />
            )}
          </Field>
        </label>

        <label>
          Size &nbsp;
          <Field name="size" form={form}>
            {(field) => (
              <input className="border-b p-1" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />
            )}
          </Field>
        </label>

        <div>
          <label className="shadow-sm p-3 rounded-2xl">
            Image(s) &nbsp;
            <input className="border-l pl-1 border-gray-500" type="file" multiple onChange={handleImageChange} />
          </label>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit" disabled={createProduct.isPending}>
          {createProduct.isPending ? 'Creating...' : 'Create'}
        </button>
        {createProduct.isError && <p className="text-danger mt-2">Unable to create product.</p>}
        {createProduct.isSuccess && <p className="text-success mt-2">Product created.</p>}
      </form>
    </section>
  )
}
