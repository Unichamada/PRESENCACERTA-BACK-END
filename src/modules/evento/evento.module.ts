import { Module } from "@nestjs/common";
import EventoService from "./evento.service";
import EventoController from "./evento.controller";
import EventoRepository from "./evento.repository";
import PresencaModule from "../presenca/presenca.module";

@Module({
    controllers: [EventoController],
    providers: [EventoService, EventoRepository],
    imports: [PresencaModule],
})
export default class EventoModule {}
