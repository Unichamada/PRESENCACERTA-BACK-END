import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeDto } from './create-unidade.dto';

export class UpdateUnidadeDto extends PartialType(CreateUnidadeDto) {}
