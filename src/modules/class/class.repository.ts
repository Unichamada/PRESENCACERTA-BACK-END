import { Prisma, PrismaClient } from '@prisma/client';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import DatabaseService from 'src/database/database.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { IClass } from 'src/shared/interfaces/class.interface';

export default class ClassRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance();
  }

  async create(createClassDto: CreateClassDto): Promise<IClass> {
    try {
      const createdClass = await this.prisma.turma.create({
        data: {
          nome: createClassDto.nome,
          unidadeId: createClassDto.unidadeId ?? null,
          eventos: {
            connect:
              createClassDto.eventos?.map((id) => ({ id: Number(id) })) ?? [],
          },
          pessoas: {
            connect:
              createClassDto.pessoas?.map((id) => ({ id: Number(id) })) ?? [],
          },
          materias: {
            connect:
              createClassDto.materias?.map((id) => ({ id: Number(id) })) ?? [],
          },
        },
      });

      return createdClass;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A class with this identifier already exists',
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<IClass[]> {
    return this.prisma.turma.findMany({
      select: {
        id: true,
        nome: true,
        unidadeId: true,
      },
    });
  }

  async findOneById(id: number): Promise<IClass> {
    const classData = await this.prisma.turma.findUnique({
      where: { id },
      include: {
        unidade: true,
        eventos: true,
        pessoas: true,
        materias: true,
      },
    });

    if (!classData) {
      throw new NotFoundException('Class does not exist');
    }

    return classData;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<IClass> {
    try {
      const updatedClass = await this.prisma.turma.update({
        where: { id },
        data: {
          nome: updateClassDto.nome,
          unidadeId: updateClassDto.unidadeId ?? null,
          eventos: {
            set:
              updateClassDto.eventos?.map((id) => ({ id: Number(id) })) ?? [],
          },
          pessoas: {
            set:
              updateClassDto.pessoas?.map((id) => ({ id: Number(id) })) ?? [],
          },
          materias: {
            set:
              updateClassDto.materias?.map((id) => ({ id: Number(id) })) ?? [],
          },
        },
      });

      return updatedClass;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Conflict error updating the class');
      }

      throw error;
    }
  }

  async remove(id: number): Promise<IClass> {
    try {
      const deletedClass = await this.prisma.turma.delete({
        where: { id },
      });

      return deletedClass;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Class not found');
      }

      throw error;
    }
  }
}
