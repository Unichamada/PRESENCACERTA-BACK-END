import {
    IsString,
    IsOptional,
    IsInt,
    IsArray,
    IsNumberString,
} from "class-validator";

import { IPeople } from "src/shared/interfaces/people.interface";

export class CreatePeopleDto implements IPeople {
    @IsString()
    codigo: string;

    @IsString()
    nome: string;

    @IsString()
    @IsOptional()
    @IsNumberString()
    cpf?: string;

    @IsOptional()
    @IsInt()
    tipoId?: number;

    /*
  @IsOptional()
  @ValidateNested()
  tipo?: IPeopleType;
  */

    @IsOptional()
    @IsInt()
    unidadeId?: number;

    /*
  @IsOptional()
  @ValidateNested()
  unidade?: IUnit;
  */

    @IsOptional()
    @IsInt()
    usuarioId?: number;

    /*
  @IsOptional()
  @ValidateNested()
  usuario?: IUser;
  */
}
