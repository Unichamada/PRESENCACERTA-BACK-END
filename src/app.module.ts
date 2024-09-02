import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UsuarioModule from './modules/usuario/usuario.module';
import MateriaModule from './modules/materia/materia.module';

@Module({
  imports: [UsuarioModule, MateriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
