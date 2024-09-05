import { Injectable } from "@nestjs/common";
import EventoRepository from "./evento.repository";
import CreateEventoDto from "./dto/create-evento.dto";
import UpdateEventoDto from "./dto/update-evento.dto";

@Injectable()
export default class EventoService {
    constructor(private readonly eventoRepository: EventoRepository) {}

    async create(createEventoDto: CreateEventoDto) {
        return this.eventoRepository.create(createEventoDto);
    }

    findAll() {
        return this.eventoRepository.findAll();
    }

    findOne(id: number) {
        return this.eventoRepository.findOneById(id);
    }

    update(id: number, updateEventoDto: UpdateEventoDto) {
        return this.eventoRepository.update(id, updateEventoDto);
    }

    remove(id: number) {
        return this.eventoRepository.remove(id);
    }
}
