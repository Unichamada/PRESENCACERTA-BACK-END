import { Module } from "@nestjs/common";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";
import PeopleRepository from "./people.repository";
import { ClassModule } from "../class/class.module";

@Module({
    controllers: [PeopleController],
    providers: [PeopleService, PeopleRepository],
    exports: [PeopleRepository],
    imports: [ClassModule],
})
export class PeopleModule {}
