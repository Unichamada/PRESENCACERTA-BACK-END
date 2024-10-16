import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import EventoService from "./evento.service";
import CreateEventoDto from "./dto/create-evento.dto";
import UpdateEventoDto from "./dto/update-evento.dto";
import { IsPublic } from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("subject")
export default class EventoController {
    constructor(private readonly subjectService: EventoService) {}

    @Post()
    create(@Body() createEventoDto: CreateEventoDto) {
        return this.subjectService.create(createEventoDto);
    }

    @Get()
    findAll() {
        return this.subjectService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.subjectService.findOne(Number(id));
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateEventoDto: UpdateEventoDto) {
        return this.subjectService.update(Number(id), updateEventoDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.subjectService.remove(Number(id));
    }
}
