import jwt, { JwtPayload } from 'jsonwebtoken'

export class JwtService {
  private readonly secretKey: string

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'secret'
  }

  sign(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn })
  }

  verify(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  decode(token: string): JwtPayload | string | null {
    return jwt.decode(token)
  }
}
