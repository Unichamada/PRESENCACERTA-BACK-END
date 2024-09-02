import { Prisma, PrismaClient } from '@prisma/client';
import DatabaseService from 'src/database/database.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import CreateUsuarioDTO from './dto/create-usuario.dto';
import IUsuario from 'src/shared/interfaces/usuario.interface';
import UpdateUsuarioDto from './dto/update-usuario.dto';

export default class UsuarioRepository {
  async create(user: CreateUsuarioDTO) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const createdUser = await prisma.usuario.create({
        data: {
          email: user.email,
          senha: user.senha,
        },
      });

      return createdUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('email já existe');
      }

      throw error;
    }
  }

  async findAll() {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const users: Omit<IUsuario, 'senha'>[] = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    return users;
  }

  async findOneById(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const user: Omit<IUsuario, 'senha'> = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('usuário não existe');
    }

    return user;
  }

  async update(id: number, user: UpdateUsuarioDto) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const updatedUser = await prisma.usuario.update({
        where: { id },
        data: {
          email: user.email,
          senha: user.senha,
        },
      });

      return updatedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('usuário não existe');
      }
    }
  }

  async remove(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const deletedUser = await prisma.usuario.delete({
        where: { id },
      });

      return deletedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('usuário não existe');
      }
    }
  }
}
