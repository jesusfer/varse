import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { StringValue } from 'ms'
import { SettingsService } from '../utils/settings'

export class JwtService {
  private readonly secretKey: Secret

  constructor() {
    this.secretKey = SettingsService.get('JWT_SECRET')
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
