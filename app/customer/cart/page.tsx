'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data for demonstration
const initialCartItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removeItem(item.id)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <Button className="mt-2">Proceed to Checkout</Button>
      </div>
    </div>
  )
}

