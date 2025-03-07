export type ProjectInfo = {
  id: string
  name: string
}

export class ServiceError extends Error {
  status: number
  constructor(message?: string, status = 500) {
    super(message)
    this.name = 'ServiceError'
    this.status = status
    Object.setPrototypeOf(this, ServiceError.prototype)
  }
}
