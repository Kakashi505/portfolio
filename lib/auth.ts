import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'super_admin'
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

export function requireAuth(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  return verifyToken(token)
}
