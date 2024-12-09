import { StoreOwnerNavigation } from '@/components/navigation'

export default function StoreOwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreOwnerNavigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

