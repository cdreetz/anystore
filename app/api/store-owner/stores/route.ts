import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: Request) {
  const userPayload = requireAuth(req as any);
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const stores = await prisma.store.findMany({
    where: {
      ownerId: (userPayload as {sub: string}).sub
    },
    select: {
      id: true,
      name: true
    }
  });

  return NextResponse.json({ stores });
} 