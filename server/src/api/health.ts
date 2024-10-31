import { Request, Response, Router } from 'express'

export class HealthRoutes {
  addRoutes = (router: Router) => {
    router.get('/', this.healthCheck)
  }

  healthCheck = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'OK' })
  }
}
