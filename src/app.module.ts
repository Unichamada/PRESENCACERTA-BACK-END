import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClassModule } from "./modules/class/class.module";

import { PeopleModule } from "./modules/people/people.module";
import { UserModule } from "./modules/user/user.module";
import MateriaModule from "./modules/materia/materia.module";
import EventoModule from "./modules/evento/evento.module";

@Module({
    imports: [
        MateriaModule,
        UserModule,
        PeopleModule,
        ClassModule,
        EventoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
