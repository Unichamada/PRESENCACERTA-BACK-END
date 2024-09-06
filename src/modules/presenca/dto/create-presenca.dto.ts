import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { IPresenca } from "src/shared/interfaces/presenca.interface";

export default class CreatePresencaDto implements IPresenca {
    @IsNotEmpty({ message: "campo matricula é obrigatório" })
    @IsString({ message: "campo matricula deve ser uma string" })
    matricula: string;

    @IsNotEmpty({ message: "o tipo do evento é obrigatório" })
    eventoId: number;

    // @IsDate({ message: "o campo data presenca deve ser do tipo Date" })
    // @IsNotEmpty({ message: "a data presenca do evento é obrigatória" })
    dataPresenca: Date;

    // @IsDate({ message: "o campo hora presenca deve ser do tipo Date" })
    // @IsNotEmpty({ message: "a hora presenca do evento é obrigatória" })
    horaPresenca: Date;

    pessoaId?: number;
}
