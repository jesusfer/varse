import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { StringValue } from 'ms'

export class JwtService {
  private readonly secretKey: Secret

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'secret'
  }

  sign = (payload: object, expiresIn: StringValue = '1h'): string => {
    const options: SignOptions = {
      expiresIn: expiresIn,
    }
    return jwt.sign(payload, this.secretKey, options)
  }

  verify = (token: string): JwtPayload | string => {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  decode = (token: string): JwtPayload | string | null => {
    return jwt.decode(token)
  }
}
