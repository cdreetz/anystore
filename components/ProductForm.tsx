'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ProductFormData = {
  name: string
  price: string
  inventory: string
  status: 'active' | 'inactive'
}

type ProductFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => Promise<void>
  initialData?: ProductFormData
  token: string
}

export function ProductForm({ open, onClose, onSubmit, initialData, token }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      price: '',
      inventory: '',
      status: 'active',
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Inventory</label>
            <Input
              type="number"
              value={formData.inventory}
              onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'inactive') => 
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 