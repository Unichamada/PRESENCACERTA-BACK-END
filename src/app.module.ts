import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClassModule } from "./modules/class/class.module";
import { UnidadeModule } from "./modules/unidade/unidade.module";
import { PeopleModule } from "./modules/people/people.module";
import { UserModule } from "./modules/user/user.module";
import MateriaModule from "./modules/materia/materia.module";
import EventoModule from "./modules/evento/evento.module";
import PresencaModule from "./modules/presenca/presenca.module";
import { AuthModule } from "./modules/security/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/security/guards/auth.guard";

@Module({
    imports: [
        MateriaModule,
        UserModule,
        PeopleModule,
        ClassModule,
        EventoModule,
        PresencaModule,
        UnidadeModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
