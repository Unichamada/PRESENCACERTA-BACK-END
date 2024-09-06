import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import DatabaseService from 'src/database/database.service';
import { IUser } from 'src/shared/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

export default class UserRepository {
  async create(user: CreateUserDTO) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const createdUser = await prisma.usuario.create({
        data: {
          email: user.email,
          senha: user.password,
        },
      });

      return createdUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('email already exists');
      }

      throw error;
    }
  }

  async findAll() {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const users: Omit<IUser, 'password'>[] = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    return users;
  }

  async findOneById(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const user: Omit<IUser, 'password'> = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  async update(id: number, user: UpdateUserDto) {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const updatedUser = await prisma.usuario.update({
      where: { id },
      data: {
        email: user.email,
        senha: user.password,
      },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const deletedUser = await prisma.usuario.delete({
      where: { id },
    });

    return deletedUser;
  }
}
