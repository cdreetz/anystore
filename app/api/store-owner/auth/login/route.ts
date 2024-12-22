import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        stores: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ 
      sub: user.id,
      email: user.email,
      storeId: user.stores[0]?.id
    }, '7d');

    const response = NextResponse.json(
      { 
        success: true, 
        user: {
          email: user.email,
          storeName: user.stores[0]?.name
        }
      },
      { status: 200 }
    );

    cookieStore.set('token', token)
    cookieStore.set('userEmail', user.email)
    cookieStore.set('storeName', user.stores[0]?.name)

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}