import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/modules/user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/modules/user/user.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_TOKEN,
            signOptions: {
                expiresIn: "30d",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {}
