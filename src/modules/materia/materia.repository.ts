import { Prisma, PrismaClient } from '@prisma/client';
import DatabaseService from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';
import CreateMateriaDto from './dto/create-materia.dto';
import IMateria from 'src/shared/interfaces/materia.interface';
import UpdateMateriaDto from './dto/update-materia.dto';

export default class MateriaRepository {
  async create(subject: CreateMateriaDto) {
    const prisma: PrismaClient = DatabaseService.getInstance();
    const createdSubject = await prisma.materia.create({
      data: {
        nome: subject.nome,
      },
    });

    return createdSubject;
  }

  async findAll() {
    const prisma: PrismaClient = DatabaseService.getInstance();

    const subjects: IMateria[] = await prisma.materia.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    return subjects;
  }

  async findOneById(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    const subject: IMateria = await prisma.materia.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
      },
    });

    if (!subject) {
      throw new NotFoundException('materia nao existe');
    }

    return subject;
  }

  async update(id: number, user: UpdateMateriaDto) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const updatedSubject: IMateria = await prisma.materia.update({
        where: { id },
        data: {
          nome: user.nome,
        },
      });

      return updatedSubject;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('materia nao existe');
      }
    }
  }

  async remove(id: number) {
    const prisma: PrismaClient = DatabaseService.getInstance();

    try {
      const deletedSubject = await prisma.materia.delete({
        where: { id },
      });

      return deletedSubject;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('materia nao existe');
      }
    }
  }
}
