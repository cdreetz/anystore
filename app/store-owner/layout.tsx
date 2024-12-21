'use client'
import { StoreOwnerNavigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function StoreOwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (!email) {
      router.push('/store-owner/auth')
    } else {
      setUserEmail(email)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    router.push('/store-owner/auth')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <StoreOwnerNavigation />
          <div className="flex items-center gap-4">
            {userEmail && (
              <>
                <span className="text-sm text-gray-600 hidden md:inline">
                  {userEmail}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  size="sm"
                  className="hover:bg-gray-100"
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}

