import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './jwt'
import bcrypt from 'bcrypt'

export function requireAuth(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = verifyToken(token);
        return payload;
    } catch {
        return null;
    }
}

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}