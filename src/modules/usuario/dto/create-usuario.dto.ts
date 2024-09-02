import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import IUsuario from 'src/shared/interfaces/usuario.interface';

export default class CreateUsuarioDTO implements IUsuario {
  @IsNotEmpty({ message: 'campo email é obrigatório' })
  @IsString({ message: 'campo email deve ser uma string' })
  email: string;

  @IsNotEmpty({ message: 'campo senha é obrigatório' })
  @IsString({ message: 'campo senha deve ser uma string' })
  @MinLength(8, { message: 'senha deve ter minimo de 8 caracteres' })
  senha: string;
}
