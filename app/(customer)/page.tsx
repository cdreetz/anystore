import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CustomerHome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to Our Multi-Vendor E-commerce Platform
        </h1>
        <p className="mt-3 text-2xl">
          Discover amazing products from various stores
        </p>
        <div className="flex mt-6">
          <Link href="/customer/stores" passHref>
            <Button className="mr-4">Browse Stores</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

