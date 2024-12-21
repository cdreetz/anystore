import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(req: Request) {
  const userPayload = requireAuth(req as any); 
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  
  const { storeId, name, description, price } = await req.json();
  if (!storeId || !name || typeof price !== 'number') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Confirm that the user owns the store
  const store = await prisma.store.findUnique({ where: { id: storeId }});
  if (!store || store.ownerId !== userPayload.userId) {
    return NextResponse.json({ error: 'You do not own this store' }, { status: 403 });
  }

  const product = await prisma.product.create({
    data: {
      storeId,
      name,
      description,
      price
    }
  });

  return NextResponse.json({ product }, { status: 201 });
}
