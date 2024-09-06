import { PrismaClient } from '@prisma/client';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import DatabaseService from 'src/database/database.service';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

export default class UnidadeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance();
  }

  async createUnidade(createUnidadeDto: CreateUnidadeDto) {
    try {
      return await this.prisma.unidade.create({
        data: {
          nome: createUnidadeDto.nome,
          cnpj: createUnidadeDto.cnpj,
          codigo: createUnidadeDto.codigo,
        },
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

  async findUnidadeById(id: number) {
    return await this.prisma.unidade.findUnique({
      where: { id },
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

  async updateUnidade(id: number, updateUnidadeDto: UpdateUnidadeDto) {
    await this.prisma.unidade.update({
      where: {
        id,
      },
      data: {
        nome: updateUnidadeDto.nome,
        cnpj: updateUnidadeDto.cnpj,
        codigo: updateUnidadeDto.codigo,
      },
    });
  }

  async deleteUnidadeById(id: number) {
    await this.prisma.unidade.delete({
      where: { id },
    });
  }
}
