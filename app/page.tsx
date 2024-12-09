'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RoleSelection() {
  const [storeName, setStoreName] = useState('')
  const router = useRouter()

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (storeName.trim()) {
      router.push(`/customer/stores/${encodeURIComponent(storeName.trim())}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">Welcome to Anystore Platform</CardTitle>
          <CardDescription className="text-center">Choose your role or visit a store</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Enter Store Name</Label>
              <Input
                id="store-name"
                placeholder="e.g. Fashion Boutique"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Visit Store</Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Link href="/customer/browse-stores">
            <Button className="w-full" variant="outline">Browse All Stores</Button>
          </Link>
          <Link href="/store-owner">
            <Button className="w-full" variant="outline">I`m a Store Owner</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

