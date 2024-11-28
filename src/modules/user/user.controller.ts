import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IsPublic } from "src/shared/decorators/is_public.decorator";

@IsPublic()
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOneById(Number(id));
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(Number(id));
    }
}
