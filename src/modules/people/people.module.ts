import { Module } from "@nestjs/common";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";
import PeopleRepository from "./people.repository";

@Module({
    controllers: [PeopleController],
    providers: [PeopleService, PeopleRepository],
    exports: [PeopleRepository],
})
export class PeopleModule {}
