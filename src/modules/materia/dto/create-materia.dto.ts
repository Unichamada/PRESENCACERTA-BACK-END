import { IsNotEmpty, IsString } from 'class-validator';
import IMateria from 'src/shared/interfaces/materia.interface';

export default class CreateMateriaDto implements IMateria {
  @IsNotEmpty({ message: 'campo nome é obrigatório' })
  @IsString({ message: 'campo nome deve ser uma string' })
  nome: string;
}
