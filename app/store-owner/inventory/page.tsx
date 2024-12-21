'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { upload } from '@vercel/blob/client';

type Product = {
  id: string
  name: string
  price: number
  inventory: number
  status: 'active' | 'inactive'
  imageUrl?: string
}

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    inventory: '', 
    status: 'active' as 'active' | 'inactive',
    imageUrl: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/store-owner/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.inventory) {
        setError('Name, price, and inventory are required');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/store-owner/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          inventory: parseInt(newProduct.inventory)
        })
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const data = await response.json()
      setProducts([...products, data.product])
      setNewProduct({ name: '', price: '', inventory: '', status: 'active', imageUrl: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
  }

  const handleEditSave = async (product: Product) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/store-owner/inventory/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      })

      if (!response.ok) throw new Error('Failed to update product')

      const updatedProduct = await response.json()
      setProducts(products.map(p => p.id === product.id ? updatedProduct.product : p))
      setEditingProduct(null)
    } catch (err) {
      setError('Failed to update product')
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/store-owner/inventory/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete product')
      setProducts(products.filter(p => p.id !== productId))
    } catch (err) {
      setError('Failed to delete product')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      const response = await fetch('/api/store-owner/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      })

      const { uploadUrl, imageUrl } = await response.json()
      
      await upload(uploadUrl, file, {
        contentType: file.type,
        access: 'public',
      })

      setNewProduct({ ...newProduct, imageUrl })
    } catch (err) {
      setError('Failed to upload image')
    }
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product name"
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </div>
          <div>
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              id="inventory"
              name="inventory"
              type="number"
              value={newProduct.inventory}
              onChange={handleInputChange}
              placeholder="Inventory"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value as 'active' | 'inactive' })}
              className="w-full border rounded p-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
            {newProduct.imageUrl && (
              <img 
                src={newProduct.imageUrl} 
                alt="Product preview" 
                className="mt-2 h-20 w-20 object-cover rounded"
              />
            )}
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products yet. Add your first product above.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
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
                <TableCell>
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded" />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value)
                      })}
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <Input
                      type="number"
                      value={editingProduct.inventory}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        inventory: parseInt(e.target.value)
                      })}
                    />
                  ) : (
                    product.inventory
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <select
                      value={editingProduct.status}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        status: e.target.value as 'active' | 'inactive'
                      })}
                      className="border rounded p-1"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    product.status
                  )}
                </TableCell>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <div className="space-x-2">
                      <Button onClick={() => handleEditSave(editingProduct)}>Save</Button>
                      <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <div className="space-x-2">
                      <Button onClick={() => handleEditClick(product)}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}


