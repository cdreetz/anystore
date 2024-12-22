'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

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

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Inventory Management</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Inventory: {product.inventory}</p>
          <p>Status: {product.status}</p>
        </div>
      ))}
    </div>
  )
}
