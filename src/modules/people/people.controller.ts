import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { PeopleService } from "./people.service";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";
import { IsPublic } from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("people")
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Post()
    create(@Body() createPeopleDto: CreatePeopleDto) {
        return this.peopleService.create(createPeopleDto);
    }

    @Get()
    findAll() {
        return this.peopleService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.peopleService.findOne(Number(id));
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePeopleDto: UpdatePeopleDto) {
        return this.peopleService.update(Number(id), updatePeopleDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.peopleService.remove(Number(id));
    }
}
