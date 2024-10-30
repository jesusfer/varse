import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth'

export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' })
        return
      }

      const token = authHeader.split(' ')[1]
      const user = await this.authService.validateJwt(token)

      req.user = user

      next()
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }
  }
}
