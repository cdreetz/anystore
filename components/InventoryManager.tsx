'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductForm } from './ProductForm'

type Product = {
  id: string
  name: string
  price: number
  inventory: number
  status: 'active' | 'inactive'
  imageUrl?: string
}

export default function InventoryManager({ initialToken }: { initialToken: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/store-owner/inventory', {
        headers: {
          'Authorization': `Bearer ${initialToken}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      const productsList = data.products || data
      
      if (!Array.isArray(productsList)) {
        throw new Error(`Invalid data format received: ${JSON.stringify(data)}`)
      }
      
      setProducts(productsList)
      setError(null)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (formData: ProductFormData) => {
    try {
      const response = await fetch('/api/store-owner/inventory', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${initialToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to add product')
      await fetchProducts() // Refresh the list
    } catch (err) {
      setError('Failed to add product')
    }
  }

  const handleEditProduct = async (formData: ProductFormData) => {
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/store-owner/inventory/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${initialToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update product')
      await fetchProducts() // Refresh the list
    } catch (err) {
      setError('Failed to update product')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/store-owner/inventory/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${initialToken}`,
        },
      })

      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts() // Refresh the list
    } catch (err) {
      setError('Failed to delete product')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={() => {
          setEditingProduct(null)
          setIsFormOpen(true)
        }}>
          Add New Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.inventory}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product)
                      setIsFormOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingProduct(null)
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct ? {
          name: editingProduct.name,
          price: editingProduct.price.toString(),
          inventory: editingProduct.inventory.toString(),
          status: editingProduct.status,
          imageUrl: editingProduct.imageUrl,
        } : undefined}
        token={initialToken}
      />
    </div>
  )
}
