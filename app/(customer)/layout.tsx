import { CustomerNavigation } from '@/components/navigation'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerNavigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

