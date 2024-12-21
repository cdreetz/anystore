import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userPayload = requireAuth(req as any);
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const { name, price, inventory, status } = await req.json();

  const store = await prisma.store.findFirst({
    where: {
      ownerId: (userPayload as {sub: string}).sub
    }
  });

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      inventory: parseInt(inventory),
      status: status || 'active',
      storeId: store.id
    }
  });

  return NextResponse.json({ product }, { status: 201 });
}

export async function PUT(req: Request) {
  const userPayload = requireAuth(req as any);
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const productId = url.pathname.split('/').pop();

  const { name, price, inventory, status } = await req.json();

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      store: {
        ownerId: (userPayload as {sub: string}).sub
      }
    }
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      price: parseFloat(price),
      inventory: parseInt(inventory),
      status
    }
  });

  return NextResponse.json({ product: updatedProduct });
}

export async function DELETE(req: Request) {
  const userPayload = requireAuth(req as any);
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const productId = url.pathname.split('/').pop();

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      store: {
        ownerId: (userPayload as {sub: string}).sub
      }
    }
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id: productId }
  });

  return NextResponse.json({ success: true });
} 