import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MateriaModule from './modules/materia/materia.module';

@Module({
  imports: [MateriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
