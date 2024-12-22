import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import InventoryManager from '@/components/InventoryManager'

export default async function InventoryPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  return <InventoryManager initialToken={token} />
}


