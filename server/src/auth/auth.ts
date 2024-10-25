import { User } from '@prisma/client'
import { UserService } from '../user/user'
import { JwtService } from './jwt'
import { AuthLogin, AuthToken } from './types'

export class AuthService {
  private userService: UserService
  private jwtService: JwtService

  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService
    this.jwtService = jwtService
  }

  async generateJwt(request: AuthLogin): Promise<AuthToken> {
    const user = await this.userService.getUserByEmail(request.email)
    if (!user) throw new Error('User not found')

    if (request.password !== user.password) {
      throw new Error('Invalid password')
    }

    const payload = { id: user.id, email: user.email }
    return { token: this.jwtService.sign(payload) }
  }

  async validateJwt(token: string): Promise<User> {
    const payload = this.jwtService.verify(token)
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid token payload')
    }

    const user = await this.userService.getUserByEmail(payload.email)
    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
