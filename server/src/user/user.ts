import { Prisma, PrismaClient, User } from '@prisma/client'
import { UserInfo } from './types'

export class UserService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createUser = async (input: Prisma.UserCreateInput): Promise<UserInfo> => {
    const user = await this.prisma.user.create({
      data: input,
    })
    return { id: user.id, email: user.email }
  }

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }
}
