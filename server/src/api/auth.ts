import { Router, Request, Response } from 'express'
import { UserService } from '../user/user'
import { AuthService } from '../auth/auth'
import { AuthLogin } from '../auth/types'

export class AuthRoutes {
  private userService: UserService
  private authService: AuthService

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService
    this.authService = authService
  }

  addRoutes(router: Router) {
    router.post('/login', this.login)
  }

  private login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body
      const user = await this.userService.getUserByEmail(email)

      if (!user) {
        res.status(401).json({ message: 'Invalid username and password' })
        return
      }

      const authLogin: AuthLogin = { email, password }
      const token = await this.authService.generateJwt(authLogin)
      res.json({ token })
    } catch (error) {
      console.error('Error logging in', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
