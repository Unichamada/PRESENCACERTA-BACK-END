import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { PeopleService } from "./people.service";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as XLSX from "xlsx";
import { IImportPeople } from "./interfaces/import.people.interface";

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

    @Post("import")
    @UseInterceptors(FileInterceptor("file"))
    import(@UploadedFile() file) {
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: IImportPeople[] = XLSX.utils.sheet_to_json(sheet);

        return this.peopleService.import(data);
    }
}
