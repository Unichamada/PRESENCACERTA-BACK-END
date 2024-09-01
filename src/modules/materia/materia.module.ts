import { Module } from '@nestjs/common';
import MateriaService from './materia.service';
import MateriaController from './materia.controller';
import MateriaRepository from './materia.repository';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService, MateriaRepository],
})
export default class MateriaModule {}
