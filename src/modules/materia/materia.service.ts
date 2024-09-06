import { Injectable } from '@nestjs/common';
import MateriaRepository from './materia.repository';
import CreateMateriaDto from './dto/create-materia.dto';
import UpdateMateriaDto from './dto/update-materia.dto';

@Injectable()
export default class MateriaService {
  constructor(private readonly materiaRepository: MateriaRepository) {}

  async create(createMateriaDto: CreateMateriaDto) {
    return this.materiaRepository.create(createMateriaDto);
  }

  findAll() {
    return this.materiaRepository.findAll();
  }

  findOne(id: number) {
    return this.materiaRepository.findOneById(id);
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return this.materiaRepository.update(id, updateMateriaDto);
  }

  remove(id: number) {
    return this.materiaRepository.remove(id);
  }
}
