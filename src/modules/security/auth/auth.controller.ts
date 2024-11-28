import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "./dto/auth.dto";
import {
    IsPublic,
} from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    signIn(@Body() authUserDto: AuthUserDto) {
        return this.authService.signIn(authUserDto);
    }
}
