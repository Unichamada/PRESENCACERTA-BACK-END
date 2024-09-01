import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import MateriaModule from './modules/materia/materia.module';

@Module({
  imports: [MateriaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
