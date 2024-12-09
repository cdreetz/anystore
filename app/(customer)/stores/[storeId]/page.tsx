import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for demonstration
const storeData = {
  id: '1',
  name: 'Sample Store',
  products: [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
  ],
}

export default async function StoreView({ 
  params 
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params;
  console.log(`Loading store with ID: ${storeId}`);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{storeData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storeData.products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

