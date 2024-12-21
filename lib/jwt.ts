import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

if (!SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

export function signToken(payload: object, expiresIn: string): string {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return null
  }
}