import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UnidadeService } from './unidade.service';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post()
  async createUnidade(@Body() createUnidade: CreateUnidadeDto) {
    return await this.unidadeService.createUnidade(createUnidade);
  }

  @Get(':id')
  async findOneUnidadeById(@Param('id') id: string) {
    return await this.unidadeService.findOneUnidadeById(Number(id));
  }

  @Get()
  async findAllUnidade(@Query('pageIndex') pageIndex: string) {
    return await this.unidadeService.findAllUnidade(pageIndex);
  }

  @Patch(':id')
  async updateUnidade(
    @Param('id') id: string,
    @Body() updateUnidade: UpdateUnidadeDto,
  ) {
    return await this.unidadeService.updateUnidade(Number(id), updateUnidade);
  }

  @Delete(':id')
  async deleteUnidadeById(@Param('id') id: string) {
    return await this.unidadeService.deleteUnidadeById(Number(id));
  }
}
