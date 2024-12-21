import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(req: Request) {
  const userPayload = requireAuth(req as any); 
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  
  const { name, slug } = await req.json();
  if (!name || !slug) {
    return NextResponse.json({ error: 'Missing store name or slug' }, { status: 400 });
  }
  // Ensure slug is unique
  const existing = await prisma.store.findUnique({ where: { slug }});
  if (existing) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const store = await prisma.store.create({
    data: {
      name,
      slug,
      ownerId: (userPayload as {sub: string}).sub
    }
  });

  return NextResponse.json({ store }, { status: 201 });
}
