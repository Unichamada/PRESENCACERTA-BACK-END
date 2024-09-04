import { PrismaClient } from '@prisma/client';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import DatabaseService from 'src/database/database.service';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { IUnidade } from 'src/shared/interfaces/unidade.interface';

export default class UnidadeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance();
  }

  async createUnidade(createUnidadeDto: CreateUnidadeDto) {
    try {
      return await this.prisma.unidade.create({
        data: { ...createUnidadeDto },
      });
    } catch (error) {
      throw new Error(`erro na criação de unidade: ${error.message}`);
    }
  }

  async findUnidadeByCnpj(cnpj: string) {
    return await this.prisma.unidade.findFirst({
      where: { cnpj },
    });
  }

  async findUnidadeByNome(nome: string) {
    return await this.prisma.unidade.findFirst({
      where: { nome },
    });
  }

  async findUnidadeById(id: string) {
    const convertId = Number(id);

    return await this.prisma.unidade.findUnique({
      where: { id: convertId },
    });
  }

  async findAllUnidade(pageIndex: string) {
    let skipValue = 0;
    if (pageIndex) {
      const convertPageIndex = Number(pageIndex);
      skipValue = convertPageIndex * 10;
    }

    try {
      return await this.prisma.unidade.findMany({
        select: {
          id: true,
          cnpj: true,
          nome: true,
          pessoas: true,
          turmas: true,
        },
        orderBy: {
          id: 'desc',
        },
        take: 10,
        skip: skipValue,
      });
    } catch (error) {
      throw new Error(`erro ao buscar unidades: ${error.message}`);
    }
  }

  async updateUnidade(id: string, updateUnidadeDto: UpdateUnidadeDto) {
    const convertId = Number(id);

    await this.prisma.unidade.update({
      where: {
        id: convertId,
      },
      data: {
        ...updateUnidadeDto,
      },
    });
  }

  async deleteUnidadeById(id: string) {
    const convertId = Number(id);

    await this.prisma.unidade.delete({
      where: { id: convertId },
    });
  }
}
