import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = 4000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
