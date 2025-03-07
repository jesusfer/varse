import { NextFunction, Request, Response } from 'express'
import { ProjectService } from '../project/project'
import { AuthService } from './auth'

export class AuthMiddleware {
  constructor(
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

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

  verifyAccess = async (
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

      const projectId = req.params.projectId
      const hasAccess = await this.projectService.verifyProjectAccess(
        user.id,
        projectId
      )

      if (!hasAccess) {
        res.status(403).json({ message: 'Access denied to this project' })
        return
      }

      req.user = user
      next()
    } catch (error) {
      res.status(401).json({ message: 'Invalid token or project access' })
      return
    }
  }

  authenticateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const apiKey = req.headers['x-api-key']
    if (typeof apiKey !== 'string') {
      res.status(401).json({ message: 'No API key provided' })
      return
    }

    const apiKeyInfo = await this.projectService.getApiKeyByKey(apiKey)
    if (!apiKeyInfo) {
      res.status(401).json({ message: 'Invalid API key' })
      return
    }

    req.projectId = apiKeyInfo.projectId

    next()
  }
}
