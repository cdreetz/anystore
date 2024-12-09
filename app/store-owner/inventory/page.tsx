'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data for demonstration
const initialProducts = [
  { id: 1, name: 'Product 1', price: 19.99, inventory: 100 },
  { id: 2, name: 'Product 2', price: 29.99, inventory: 50 },
  { id: 3, name: 'Product 3', price: 39.99, inventory: 75 },
]

export default function InventoryManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', inventory: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      inventory: parseInt(newProduct.inventory),
    }
    setProducts([...products, product])
    setNewProduct({ name: '', price: '', inventory: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <div className="flex gap-2">
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
          <Button onClick={handleAddProduct} className="mt-auto">Add Product</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Inventory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.inventory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

