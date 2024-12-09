'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'

const customerRoutes = [
  { href: '/customer', label: 'Home' },
  { href: '/customer/stores', label: 'Browse Stores' },
  { href: '/customer/cart', label: 'Cart' },
]

const storeOwnerRoutes = [
  { href: '/store-owner', label: 'Dashboard' },
  { href: '/store-owner/inventory', label: 'Inventory' },
  { href: '/store-owner/orders', label: 'Orders' },
  { href: '/store-owner/settings', label: 'Settings' },
]

function NavLinks({ routes, pathname, onClick }: { routes: typeof customerRoutes, pathname: string, onClick?: () => void }) {
  return (
    <>
      {routes.map((route) => (
        <Button
          key={route.href}
          asChild
          variant={pathname === route.href ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={onClick}
        >
          <Link href={route.href}>{route.label}</Link>
        </Button>
      ))}
    </>
  )
}

export function CustomerNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  <NavLinks routes={customerRoutes} pathname={pathname} onClick={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex md:items-center">
              <NavLinks routes={customerRoutes} pathname={pathname} />
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/">
              <Button variant="outline">Switch Role</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function StoreOwnerNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  <NavLinks routes={storeOwnerRoutes} pathname={pathname} onClick={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex md:items-center">
              <NavLinks routes={storeOwnerRoutes} pathname={pathname} />
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/">
              <Button variant="outline">Switch Role</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

