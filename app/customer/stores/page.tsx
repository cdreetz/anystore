import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock data for demonstration
const stores = [
  { id: '1', name: 'Electronics Store', description: 'Latest gadgets and electronics' },
  { id: '2', name: 'Fashion Boutique', description: 'Trendy clothes and accessories' },
  { id: '3', name: 'Home Decor', description: 'Beautiful items for your home' },
]

export default function StoresList() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{store.description}</p>
              <Link href={`/stores/${store.id}`} passHref>
                <Button>Visit Store</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

