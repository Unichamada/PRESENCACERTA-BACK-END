import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import PresencaService from "./presenca.service";
import CreatePresencaDto from "./dto/create-presenca.dto";
import UpdatePresencaDto from "./dto/update-presenca.dto";
import { IsPublic } from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("presenca")
export default class PresencaController {
    constructor(private readonly presencaService: PresencaService) {}

    @Post()
    create(@Body() createPresencaDto: CreatePresencaDto) {
        return this.presencaService.create(createPresencaDto);
    }

    @Get()
    findAll() {
        return this.presencaService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.presencaService.findOne(Number(id));
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updatePresencaDto: UpdatePresencaDto,
    ) {
        return this.presencaService.update(Number(id), updatePresencaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.presencaService.remove(Number(id));
    }
}
