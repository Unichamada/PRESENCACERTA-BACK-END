import { Module } from "@nestjs/common";
import PresencaService from "./presenca.service";
import PresencaController from "./presenca.controller";
import PresencaRepository from "./presenca.repository";
import { PeopleModule } from "../people/people.module";

@Module({
    controllers: [PresencaController],
    providers: [PresencaService, PresencaRepository],
    imports: [PeopleModule],
})
export default class PresencaModule {}
