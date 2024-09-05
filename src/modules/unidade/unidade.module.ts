import { Module } from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';
import UnidadeRepository from './unidade.repository';

@Module({
  providers: [UnidadeService, UnidadeRepository],
  controllers: [UnidadeController],
})
export class UnidadeModule {}
