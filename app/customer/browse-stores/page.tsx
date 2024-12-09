import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BrowseStores() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg sm:text-xl mb-8 px-4">Our &apos;Browse All Stores&apos; feature is under construction.</p>
      <Link href="/" passHref>
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
