import { IsOptional, IsInt, IsString, IsArray } from "class-validator";

import { IClass } from "src/shared/interfaces/class.interface";

export class CreateClassDto implements IClass {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsInt()
    unidadeId?: number;

    /*
  @IsOptional()
  @ValidateNested()
  unidade?: IUnit;
  */
}
