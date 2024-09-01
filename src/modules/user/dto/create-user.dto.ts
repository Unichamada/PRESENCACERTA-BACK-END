import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IUser } from 'src/shared/interfaces/user.interface';

export class CreateUserDTO implements IUser {
  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email must be a string' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
