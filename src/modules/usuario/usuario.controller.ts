import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateUsuarioDTO from './dto/create-usuario.dto';
import UpdateUsuarioDto from './dto/update-usuario.dto';
import UsuarioService from './usuario.service';

@Controller('user')
export default class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Post()
  create(@Body() createUserDTO: CreateUsuarioDTO) {
    return this.userService.create(createUserDTO);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
