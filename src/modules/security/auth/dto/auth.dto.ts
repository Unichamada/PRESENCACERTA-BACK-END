import { IsEmail } from "class-validator";
import { IUser } from "src/shared/interfaces/user.interface";

export class AuthUserDto implements IUser {
    @IsEmail()
    email: string;

    password: string;
}
