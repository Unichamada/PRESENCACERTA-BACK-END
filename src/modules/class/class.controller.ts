import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ClassService } from "./class.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { IClass } from "src/shared/interfaces/class.interface";
import { IsPublic } from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("classes")
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Post()
    create(@Body() createClassDto: CreateClassDto): Promise<IClass> {
        return this.classService.create(createClassDto);
    }

    @Get()
    findAll(): Promise<IClass[]> {
        return this.classService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<IClass> {
        return this.classService.findOne(Number(id));
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateClassDto: UpdateClassDto,
    ): Promise<IClass> {
        return this.classService.update(Number(id), updateClassDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<IClass> {
        return this.classService.remove(Number(id));
    }
}
