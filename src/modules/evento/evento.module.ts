import { Module } from "@nestjs/common";
import EventoService from "./evento.service";
import EventoController from "./evento.controller";
import EventoRepository from "./evento.repository";

@Module({
    controllers: [EventoController],
    providers: [EventoService, EventoRepository],
})
export default class EventoModule {}
