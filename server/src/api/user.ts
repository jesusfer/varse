import { Router, Request, Response } from 'express'
import { UserService } from '../user/user'
import { AuthService } from '../auth/auth'
import { body, ValidationChain, validationResult } from 'express-validator'
import { AuthLogin } from '../auth/types'
import { AuthMiddleware } from '../auth/auth.middleware'

export class UserRoutes {
  private userService: UserService
  private authService: AuthService
  private authMiddleware: AuthMiddleware

  constructor(
    userService: UserService,
    authService: AuthService,
    authMiddleware: AuthMiddleware
  ) {
    this.userService = userService
    this.authService = authService
    this.authMiddleware = authMiddleware
  }

  addRoutes = (router: Router) => {
    router.post('/user', this.validateCreateUser(), this.createUser)
    router.get('/user', this.authMiddleware.authenticate, this.getUserInfo)
  }

  private createUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    try {
      const user = await this.userService.createUser(req.body)
      const authLogin: AuthLogin = {
        email: req.body.email,
        password: req.body.password,
      }
      const token = await this.authService.generateJwt(authLogin)
      res.json({ user, token })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getUserInfo = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await this.userService.getUserById(req.user.id)
    res.json(user)
  }

  private validateCreateUser(): ValidationChain[] {
    return [body('email').isEmail().normalizeEmail()]
  }
}
