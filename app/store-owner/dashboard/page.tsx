'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function StoreDashboard() {
  const [userEmail, setUserEmail] = useState<string>('No email')
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    router.push('/store-owner/auth')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back, {userEmail}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-blue-600">📦</span>
              Inventory Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">Manage your product inventory, prices, and stock levels</p>
            <Link href="/store-owner/inventory" className="w-full">
              <Button className="w-full" variant="outline">
                Manage Inventory
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-600">🛍️</span>
              Order Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">Track, process, and manage all your customer orders</p>
            <Link href="/store-owner/orders" className="w-full">
              <Button className="w-full" variant="outline">
                View Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-purple-600">⚙️</span>
              Store Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">Customize your store appearance and settings</p>
            <Link href="/store-owner/settings" className="w-full">
              <Button className="w-full" variant="outline">
                Manage Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

