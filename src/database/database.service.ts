import { PrismaClient } from '@prisma/client';

export default class DatabaseService {
  private static prisma: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }

    return this.prisma;
  }
}
