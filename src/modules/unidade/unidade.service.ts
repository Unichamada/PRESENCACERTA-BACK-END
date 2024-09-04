import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import UnidadeRepository from './unidade.repository';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { IUnidade } from 'src/shared/interfaces/unidade.interface';

@Injectable()
export class UnidadeService {
  constructor(private readonly unidadeRepository: UnidadeRepository) {}

  async createUnidade(createUnidadeDto: CreateUnidadeDto) {
    const validationUnidadeCnpj =
      await this.unidadeRepository.findUnidadeByCnpj(createUnidadeDto.cnpj);

    const validationUnidadeNome =
      await this.unidadeRepository.findUnidadeByNome(createUnidadeDto.nome);

    if (validationUnidadeCnpj || validationUnidadeNome) {
      throw new HttpException(
        'esse nome ou CNPJ já existem!',
        HttpStatus.CONFLICT,
      );
    }

    return await this.unidadeRepository.createUnidade(createUnidadeDto);
  }

  async findOneUnidadeById(id: string) {
    const unidade = await this.unidadeRepository.findUnidadeById(id);

    if (!unidade) {
      throw new HttpException('esse id não existe!', HttpStatus.BAD_REQUEST);
    }

    return unidade;
  }

  async findAllUnidade(pageIndex: string) {
    return await this.unidadeRepository.findAllUnidade(pageIndex);
  }

  async updateUnidade(id: string, updateUnidadeDto: UpdateUnidadeDto) {
    const unidade = await this.unidadeRepository.findUnidadeById(id);

    if (!unidade) {
      throw new HttpException('esse id não existe!', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.unidadeRepository.updateUnidade(id, updateUnidadeDto);
      return { message: 'unidade atualiza com sucesso!' };
    } catch (error) {
      throw new Error(`erro ao atualizar unidade: ${error.message}`);
    }
  }

  async deleteUnidadeById(id: string) {
    const unidade = await this.unidadeRepository.findUnidadeById(id);

    if (!unidade) {
      throw new HttpException('esse id não existe!', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.unidadeRepository.deleteUnidadeById(id);
      return { message: 'unidade deletada com sucesso!' };
    } catch (error) {
      throw new Error(`erro ao deletar unidade: ${error.message}`);
    }
  }
}
