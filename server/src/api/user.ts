import { Router, Request, Response } from 'express'
import { UserService } from '../user/user'
import { AuthService } from '../auth/auth'
import { body, ValidationChain, validationResult } from 'express-validator'
import { AuthLogin } from '../auth/types'

export class UserRoutes {
  private userService: UserService
  private authService: AuthService

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService
    this.authService = authService
  }

  addRoutes(router: Router) {
    router.post('/user', this.validateCreateUser(), this.createUser)
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

  private validateCreateUser(): ValidationChain[] {
    return [body('email').isEmail().normalizeEmail()]
  }
}
