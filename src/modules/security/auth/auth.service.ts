import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth.dto";
import UserRepository from "src/modules/user/user.repository";
import { HashUtil } from "src/shared/utils/hash.util";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(authUserDto: AuthUserDto): Promise<any> {
        const user = await this.userRepository.findOneByEmail(
            authUserDto.email,
        );

        const messageException = 'Não foi possível realizar login!'

        if(!user) {
            throw new UnauthorizedException(messageException)
        }

        if (user) {
            const validationPassword: boolean = await HashUtil.comparePassword(
                authUserDto.password,
                user.senha,
            );

            if (!validationPassword) {
                throw new UnauthorizedException(
                    messageException,
                );
            }
        }

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
