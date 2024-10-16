import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { IUnidade } from "src/shared/interfaces/unidade.interface";

export class CreateUnidadeDto implements IUnidade {
    id?: number;

    // @IsString()
    // @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/, {
    //   message: 'CNPJ deve estar no formato válido!',
    // })
    cnpj: string;

    @IsString()
    @IsNotEmpty({ message: "nome é um campo obrigatório!" })
    nome: string;

    codigo: string;
}
