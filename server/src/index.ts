import express, { Express } from 'express'
import cors from 'cors'
import { UserService } from './user/user'
import { AuthService } from './auth/auth'
import { JwtService } from './auth/jwt'
import { UserRoutes } from './api/user'
import { AuthRoutes } from './api/auth'
import { ProjectRoutes } from './api/project'
import { ProjectService } from './project/project'
import { AuthMiddleware } from './auth/auth.middleware'

const app: Express = express()
const port = 4000

const jwtService = new JwtService()
const userService = new UserService()
const projectService = new ProjectService()
const authService = new AuthService(userService, jwtService)
const authMiddleware = new AuthMiddleware(authService)

const userRoutes = new UserRoutes(userService, authService)
const projectRoutes = new ProjectRoutes(projectService, authMiddleware)
const authRoutes = new AuthRoutes(userService, authService)

app.use(express.json())
app.use(cors())

userRoutes.addRoutes(app)
authRoutes.addRoutes(app)
projectRoutes.addRoutes(app)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
