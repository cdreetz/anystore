import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
    const { email, password, storeName } = await req.json();

    if (!email || !password || !storeName) {
        return NextResponse.json({ error: 'Missing required fields'}, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists'}, { status: 400 });
    }

    const hashed = await hashPassword(password);
    
    // Create user and store in a transaction
    const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
            }
        });

        const store = await prisma.store.create({
            data: {
                name: storeName,
                slug: storeName.toLowerCase().replace(/\s+/g, '-'),
                ownerId: user.id
            }
        });

        return { user, store };
    });

    return NextResponse.json({ user: result.user }, { status: 201 });
}