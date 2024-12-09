'use client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { QrCode, LinkIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

function ShareStore() {
  const [isOpen, setIsOpen] = useState(false)
  const storeUrl = 'https://example.com/stores/my-store' // Replace with actual store URL

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Share Store</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Store</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <QrCode size={150} />
            <div>
              <p className="text-sm text-muted-foreground">Scan this QR code to visit your store</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input value={storeUrl} readOnly className="flex-grow" />
            <Button size="icon" onClick={() => navigator.clipboard.writeText(storeUrl)}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function StoreDashboard() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <ShareStore />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your product inventory</p>
            <Link href="/store-owner/inventory">
              <Button className="mt-2 w-full sm:w-auto">Go to Inventory</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage customer orders</p>
            <Link href="/store-owner/orders">
              <Button className="mt-2 w-full sm:w-auto">Go to Orders</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure your store settings</p>
            <Link href="/store-owner/settings">
              <Button className="mt-2 w-full sm:w-auto">Go to Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

