import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import MateriaService from './materia.service';
import CreateMateriaDto from './dto/create-materia.dto';
import UpdateMateriaDto from './dto/update-materia.dto';
import { IsPublic } from 'src/shared/decorators/is_public.decorator';

@IsPublic()
@Controller('subject')
export default class MateriaController {
  constructor(private readonly subjectService: MateriaService) {}

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.subjectService.create(createMateriaDto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.subjectService.update(Number(id), updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(Number(id));
  }
}
