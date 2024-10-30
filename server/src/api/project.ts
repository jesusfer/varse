import { Request, Response, Router } from 'express'
import { ProjectService } from '../project/project'
import { AuthMiddleware } from '../auth/auth.middleware'
import { UserInfo } from '../user/types'

declare global {
  namespace Express {
    interface Request {
      user: UserInfo
    }
  }
}

export class ProjectRoutes {
  private projectService: ProjectService
  private authMiddleware: AuthMiddleware

  constructor(projectService: ProjectService, authMiddleware: AuthMiddleware) {
    this.projectService = projectService
    this.authMiddleware = authMiddleware
  }

  addRoutes(router: Router) {
    router.post(
      '/project',
      this.authMiddleware.authenticate,
      this.createProject
    )
    router.get('/project', this.authMiddleware.authenticate, this.getProjects)
  }

  private createProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const project = await this.projectService.createProject(
        req.body,
        req.user.id
      )
      res.json(project)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  private getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const projects = await this.projectService.getProjects(req.user.id)
      res.json(projects)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
