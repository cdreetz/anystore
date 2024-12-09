'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StoreSettings() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'My Store',
    description: 'Welcome to my store!',
    email: 'store@example.com',
    phone: '123-456-7890',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoreSettings({ ...storeSettings, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log('Updated settings:', storeSettings)
    alert('Settings updated successfully!')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Store Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Store Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                name="name"
                value={storeSettings.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Store Description</Label>
              <Textarea
                id="description"
                name="description"
                value={storeSettings.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={storeSettings.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={storeSettings.phone}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

