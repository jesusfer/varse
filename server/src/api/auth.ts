import { Router, Request, Response } from 'express'
import { UserService } from '../user/user'
import { AuthService } from '../auth/auth'
import { AuthLogin } from '../auth/types'
import { getTokenFromRequest } from './utils'

export class AuthRoutes {
  private userService: UserService
  private authService: AuthService

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService
    this.authService = authService
  }

  addRoutes = (router: Router) => {
    router.post('/login', this.login)
    router.post('/validate', this.validate)
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

  private validate = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = getTokenFromRequest(req)
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      await this.authService.validateJwt(token)
      res.json({ message: 'Token is valid' })
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
