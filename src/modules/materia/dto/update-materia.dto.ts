import { PartialType } from '@nestjs/mapped-types';
import CreateMateriaDto from './create-materia.dto';

export default class UpdateMateriaDto extends PartialType(CreateMateriaDto) {}
